// https://console.developers.google.com/apis/credentials

var OAuth = require('oauth').OAuth2
var HTML = require('./html')
var superagent = require('superagent')

const ClaimType = 6 // Has Google

module.exports = function facebook(app, { web3, googleApp, baseUrl }) {
  const redirect_uri = `${baseUrl}/google-auth-response`

  var googleOAuth = new OAuth(
    googleApp.client_id,
    googleApp.secret,
    'https://accounts.google.com',
    '/o/oauth2/auth',
    '/o/oauth2/token'
  )

  app.get('/google-auth', (req, res) => {
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

    var authURL = googleOAuth.getAuthorizeUrl({
      redirect_uri,
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
      state: req.session.state,
      response_type: 'code'
    })

    res.redirect(authURL)
  })

  app.get(
    '/google-auth-response',
    (req, res, next) => {
      googleOAuth.getOAuthAccessToken(
        req.query.code,
        {
          redirect_uri,
          grant_type: 'authorization_code'
        },
        function(e, access_token, refresh_token, results) {
          if (e) {
            next(e)
          } else if (results.error) {
            next(results.error)
          } else {
            req.access_token = access_token
            next()
          }
        }
      )
    },
    (req, res, next) => {
      superagent
        .get('https://www.googleapis.com/oauth2/v1/userinfo')
        .query({
          alt: 'json',
          access_token: req.access_token
        })
        .then(response => {
          req.googleUser = response.body
          next()
        })
    },
    async (req, res) => {
      // var data = JSON.stringify({ user_id: req.googleUser.id })

      var rawData = 'Verified OK'
      var hexData = web3.utils.asciiToHex(rawData)
      var hashed = web3.utils.soliditySha3(req.session.targetIdentity, ClaimType, hexData)
      req.signedData = await web3.eth.accounts.sign(hashed, googleApp.claimSignerKey)

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
