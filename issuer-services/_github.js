// https://github.com/settings/developers

var OAuth = require('oauth').OAuth2
var HTML = require('./html')
var superagent = require('superagent')

const ClaimType = 5 // Has GitHub

module.exports = function facebook(app, { web3, githubApp, baseUrl }) {
  const redirect_uri = `${baseUrl}/github-auth-response`

  var githubOAuth = new OAuth(
    githubApp.client_id,
    githubApp.secret,
    'https://github.com',
    '/login/oauth/authorize',
    '/login/oauth/access_token',
    null
  )

  app.get('/github-auth', (req, res) => {
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

    var authURL = githubOAuth.getAuthorizeUrl({
      redirect_uri,
      scope: ['user'],
      state: req.session.state
    })

    res.redirect(authURL)
  })

  app.get(
    '/github-auth-response',
    (req, res, next) => {
      githubOAuth.getOAuthAccessToken(
        req.query.code,
        { redirect_uri },
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
        .get('https://api.github.com/user')
        .set('Authorization', `token ${req.access_token}`)
        .accept('json')
        .then(response => {
          req.githubUser = response.body
          next()
        })
    },
    async (req, res) => {
      // var data = JSON.stringify({ user_id: req.githubUser.id })
      var rawData = 'Verified OK'
      var hexData = web3.utils.asciiToHex(rawData)
      var hashed = web3.utils.soliditySha3(req.session.targetIdentity, ClaimType, hexData)
      req.signedData = await web3.eth.accounts.sign(hashed, githubApp.claimSignerKey)

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
