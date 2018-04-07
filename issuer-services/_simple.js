var HTML = require('./html')

module.exports = function dummyService(app, { web3, privateKey }) {

  app.get('/simple-auth', async (req, res) => {
    var issuer = req.query.issuer,
      target = req.query.target

    if (!target) {
      res.send(HTML('No target identity contract provided'))
      return
    }
    if (!issuer) {
      res.send(HTML('No issuer identity contract provided'))
      return
    }
    if (!privateKey) {
      res.send(HTML('No private key specified.'))
      return
    }

    var data = 'Identity Verified OK!'
    var signedData = await web3.eth.accounts.sign(data, privateKey)

    res.send(
      HTML(
        `<div class="mb-2">This example authentication service returns some signed data which can be added to a claim</div>
        <div class="mb-2"><b>Issuer:</b> ${issuer}</div>
        <div class="mb-2"><b>Target:</b> ${issuer}</div>
        <div class="mb-2"><b>Data:</b> ${data}</div>
        <div class="mb-2"><b>Signature:</b> ${signedData.signature}</div>
        <div class="mb-2"><b>Hash:</b> ${signedData.messageHash}</div>
        <div><button class="btn btn-primary" onclick="window.done()">OK</button></div>
        <script>
          window.done = function() {
            window.opener.postMessage('signed-data:${
              signedData.signature
            }:${signedData.messageHash}', '*')
          }
        </script>`
      )
    )
  })
}
