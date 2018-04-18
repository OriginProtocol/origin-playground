// https://apps.twitter.com/

var OAuth = require('oauth').OAuth
var HTML = require('./html')

const ClaimType = 4 // Has Twitter

module.exports = function facebook(app, { web3, twitterApp, baseUrl }) {
  var twitterOAuth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    twitterApp.client_id,
    twitterApp.secret,
    '1.0',
    `${baseUrl}/twitter-auth-response`,
    'HMAC-SHA1'
  )

  app.get('/twitter-auth', (req, res) => {
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

    twitterOAuth.getOAuthRequestToken(function(
      error,
      oAuthToken,
      oAuthTokenSecret
    ) {
      req.session.oAuthTokenSecret = oAuthTokenSecret
      res.redirect(
        `https://twitter.com/oauth/authenticate?oauth_token=${oAuthToken}`
      )
    })
  })

  app.get(
    '/twitter-auth-response',
    (req, res, next) => {
      twitterOAuth.getOAuthAccessToken(
        req.query.oauth_token,
        req.session.oAuthTokenSecret,
        req.query.oauth_verifier,
        function(error, oAuthAccessToken, oAuthAccessTokenSecret) {
          if (error) {
            console.log(error)
            res.send('Error')
            return
          }

          req.oAuthAccessToken = oAuthAccessToken
          req.oAuthAccessTokenSecret = oAuthAccessTokenSecret

          next()
        }
      )
    },
    (req, res, next) => {
      twitterOAuth.get(
        'https://api.twitter.com/1.1/account/verify_credentials.json',
        req.oAuthAccessToken,
        req.oAuthAccessTokenSecret,
        function(error, twitterResponseData) {
          if (error) {
            res.send('Error')
            return
          }
          try {
            req.twitterUser = JSON.parse(twitterResponseData)
            next()
          } catch (parseError) {
            res.send("Error parsing response")
          }
        }
      )
    },
    async (req, res) => {
      // var data = JSON.stringify({ user_id: req.twitterUser.id })

      var rawData = 'Verified OK'
      var hexData = web3.utils.asciiToHex(rawData)
      var hashed = web3.utils.soliditySha3(req.session.targetIdentity, ClaimType, hexData)
      req.signedData = await web3.eth.accounts.sign(hashed, twitterApp.claimSignerKey)

      res.send(
        HTML(`
        <div class="mb-2">Successfully signed claim:</div>
        <div class="mb-2"><b>Issuer:</b> ${req.session.issuer}</div>
        <div class="mb-2"><b>Target:</b> ${req.session.targetIdentity}</div>
        <div class="mb-2"><b>Data:</b> ${rawData}</div>
        <div class="mb-2"><b>Signature:</b> ${req.signedData.signature}</div>
        <div class="mb-2"><b>Hash:</b> ${req.signedData.messageHash}</div>
        <div><button class="btn btn-primary" onclick="window.done()">OK</button></div>
        <script>
          window.done = function() {
            window.opener.postMessage('signed-data:${
              req.signedData.signature
            }:${rawData}:${ClaimType}', '*')
          }
        </script>`)
      )
    }
  )
}
