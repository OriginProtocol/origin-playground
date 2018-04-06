// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow

import express from 'express'
import session from 'express-session'
import superagent from 'superagent'

import Web3 from 'web3'
import ClaimHolderABI from './src/contracts/ClaimHolder'

const Config = {
  provider: 'ws://localhost:8545',
  facebookApp: {
    id: '',
    secret: '',
    redirectURI: 'http://localhost:3001/'
  },
  certifier: {
    ownerPrivateKey: '',
    claimSignPrivateKey: ''
  }
}

const web3 = new Web3(Config.provider)

const app = express()
app.use(
  session({
    secret: web3.utils.randomHex(8),
    resave: false,
    saveUninitialized: true
  })
)

app.get('/t', (req, res) => {
  if (!req.query.target) {
    res.send('No target identity contract provided')
    return
  }
  if (!req.query.issuer) {
    res.send('No issuer identity contract provided')
    return
  }

  req.session.targetIdentity = req.query.target
  req.session.issuer = req.query.issuer
  req.session.state = web3.utils.randomHex(8)
  req.session.dataOnly = req.query.dataOnly ? true : false

  var query = [
    `client_id=${Config.facebookApp.id}`,
    `redirect_uri=${Config.facebookApp.redirectURI}`,
    `state=${req.session.state}`
  ]
  res.redirect(`https://www.facebook.com/v2.12/dialog/oauth?${query.join('&')}`)
})

app.get('/r', async (req, res) => {
    var data = JSON.stringify({ twitter_handle: 'nick_p' })

    req.signedData = await web3.eth.accounts.sign(
      data,
      "0xba8f9af994c3277b57d6e091fbd49f0884cbf8dc94bf8eae0414dcfccd655900"
    )

    res.send(
      `Sending back signed data...
      Signature: ${req.signedData.signature}
      Hash: ${req.signedData.messageHash}
      <script>window.opener.postMessage('signed-data:${req.signedData.signature}:${req.signedData.messageHash}', '*')</script>`
    )
})

app.get(
  '/',
  (req, res, next) => {
    if (!req.query.code) {
      return res.send('No Code specified')
    }
    if (req.query.state !== req.session.state) {
      return res.send('State param does not match')
    }
    if (!req.session.targetIdentity) {
      return res.send('No target identity found')
    }
    if (!req.session.issuer) {
      return res.send('No issuer found')
    }

    superagent
      .get(`https://graph.facebook.com/v2.12/oauth/access_token`)
      .query({
        client_id: Config.facebookApp.id,
        client_secret: Config.facebookApp.secret,
        redirect_uri: Config.facebookApp.redirectURI,
        code: req.query.code
      })
      .then(response => {
        req.userToken = response.body
        next()
      })
      .catch(() => {
        res.send('Error fetching token')
      })
  },
  (req, res, next) => {
    superagent
      .get(`https://graph.facebook.com/debug_token`)
      .query({
        input_token: req.userToken.access_token,
        access_token: `${Config.facebookApp.id}|${Config.facebookApp.secret}`
      })
      .then(response => {
        req.tokenDebug = JSON.parse(response.text).data

        if (req.tokenDebug.app_id !== Config.facebookApp.id) {
          return res.send("Token's App does not match")
        }
        if (!req.tokenDebug.is_valid) {
          return res.send('Token is invalid')
        }
        next()
      })
      .catch(() => {
        res.send('Error validating token')
      })
  },
  async (req, res, next) => {
    var data = JSON.stringify({ user_id: req.tokenDebug.user_id })

    req.signedData = await web3.eth.accounts.sign(
      data,
      Config.certifier.claimSignPrivateKey
    )

    if (req.session.dataOnly) {
      res.send(
        `Sending back signed data...
        Signature: ${req.signedData.signature}
        Hash: ${req.signedData.messageHash}
        <script>window.opener.postMessage('signed-data:${req.signedData.signature}:${req.signedData.messageHash}', '*')</script>`
      )
      return
    }
    next()
  },
  async (req, res) => {
    var UserIdentity = new web3.eth.Contract(
      ClaimHolderABI.abi,
      req.session.targetIdentity
    )
    var CertifierIdentity = new web3.eth.Contract(
      ClaimHolderABI.abi,
      req.session.issuer
    )
    const CertifierOwner = web3.eth.accounts.privateKeyToAccount(
      Config.certifier.ownerPrivateKey
    )
    const ClaimSignPublicKey = web3.eth.accounts.privateKeyToAccount(
      Config.certifier.claimSignPrivateKey
    )

    var signerKeyHash = web3.utils.keccak256(ClaimSignPublicKey.address)
    var hasKey = await CertifierIdentity.methods.getKey(signerKeyHash).call()

    if (hasKey.purpose !== '3') {
      res.send(
        `No such claim signer key on issuer: ${signerKeyHash.substr(0, 8)}...`
      )
      return
    }

    var netId = await web3.eth.net.getId()

    var abi = await UserIdentity.methods
      .addClaim(
        '3',
        '1',
        req.session.issuer,
        req.signedData.signature,
        req.signedData.messageHash,
        'id.originprotocol.com/abc123'
      )
      .encodeABI()

    var executeAbi = await UserIdentity.methods
      .execute(req.session.targetIdentity, 0, abi)
      .encodeABI()

    var signedTx = await CertifierOwner.signTransaction({
      data: executeAbi,
      gas: 4612388,
      to: req.session.targetIdentity,
      chainId: netId > 10 ? 1 : netId
    })

    var result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

    if (result.status === '0x01') {
      res.send(
        "Claim addedd successfully! <script>window.opener.postMessage('success', '*')</script>"
      )
    } else {
      res.json(result)
    }
  }
)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`\nListening on port ${PORT}\n`)
})
