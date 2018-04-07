// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow

var superagent = require('superagent')
var HTML = require('./html')

module.exports = function facebook(app, { web3, facebookApp, privateKey }) {
  app.get('/fb-auth', (req, res) => {
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

    var query = [
      `client_id=${facebookApp.id}`,
      `redirect_uri=${facebookApp.redirectURI}`,
      `state=${req.session.state}`
    ]
    res.redirect(
      `https://www.facebook.com/v2.12/dialog/oauth?${query.join('&')}`
    )
  })

  app.get(
    '/fb-auth-response',
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
          client_id: facebookApp.id,
          client_secret: facebookApp.secret,
          redirect_uri: facebookApp.redirectURI,
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
          access_token: `${facebookApp.id}|${facebookApp.secret}`
        })
        .then(response => {
          req.tokenDebug = JSON.parse(response.text).data

          if (req.tokenDebug.app_id !== facebookApp.id) {
            return res.send("Token's App does not match")
          }
          if (!req.tokenDebug.is_valid) {
            return res.send('Token is invalid')
          }
          next()
        })
        .catch((e) => {
          console.log(e)
          res.send('Error validating token')
        })
    },
    async (req, res) => {
      var data = JSON.stringify({ user_id: req.tokenDebug.user_id })

      req.signedData = await web3.eth.accounts.sign(data, privateKey)

      res.send(HTML(`
        <div class="mb-2">Successfully signed claim:</div>
        <div class="mb-2"><b>Issuer:</b> ${req.session.issuer}</div>
        <div class="mb-2"><b>Target:</b> ${req.session.targetIdentity}</div>
        <div class="mb-2"><b>Data:</b> ${data}</div>
        <div class="mb-2"><b>Signature:</b> ${req.signedData.signature}</div>
        <div class="mb-2"><b>Hash:</b> ${req.signedData.messageHash}</div>
        <div><button class="btn btn-primary" onclick="window.done()">OK</button></div>
        <script>
          window.done = function() {
            window.opener.postMessage('signed-data:${
              req.signedData.signature
            }:${req.signedData.messageHash}', '*')
          }
        </script>`
      ))
    }
  )
}
