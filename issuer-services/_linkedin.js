// https://developer.linkedin.com/docs/oauth2

var OAuth = require('oauth').OAuth2
var HTML = require('./html')
var superagent = require('superagent')

const ClaimType = 9 // Has LinkedIn

module.exports = function facebook(app, { web3, linkedInApp, baseUrl }) {
  const redirect_uri = `${baseUrl}/linkedin-auth-response`

  var linkedInOAuth = new OAuth(
    linkedInApp.client_id,
    linkedInApp.secret,
    'https://www.linkedin.com',
    '/oauth/v2/authorization',
    '/oauth/v2/accessToken',
    null
  )

  app.get('/linkedin-auth', (req, res) => {
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

    var authURL = linkedInOAuth.getAuthorizeUrl({
      redirect_uri,
      scope: ['r_basicprofile', 'r_emailaddress'],
      state: req.session.state,
      response_type: 'code'
    })

    res.redirect(authURL)
  })

  app.get(
    '/linkedin-auth-response',
    (req, res, next) => {
      linkedInOAuth.getOAuthAccessToken(
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
        .get('https://api.linkedin.com/v1/people/~')
        .set('Authorization', `Bearer ${req.access_token}`)
        .query({ format: 'json' })
        .then(response => {
          req.linkedInUser = response.body
          next()
        })
    },
    async (req, res) => {
      // var data = JSON.stringify({ user_id: req.githubUser.id })
      var rawData = 'Verified OK'
      var hexData = web3.utils.asciiToHex(rawData)
      var hashed = web3.utils.soliditySha3(req.session.targetIdentity, ClaimType, hexData)
      req.signedData = await web3.eth.accounts.sign(
        hashed,
        linkedInApp.claimSignerKey
      )

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
