const HTML = content => `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <title>ERC 725 - Auth</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta charset="UTF-8">
    <meta http-equiv="Content-Language" content="en">
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <style>
      body {
        display: flex;
        align-items: center;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
      }
      .msg {
        margin: 3rem auto;
        max-width: 450px;
        text-align: center;
        word-break: break-word;
      }
    </style>
  </head>
  <body><div class="msg">${content}</div></body>
</html>`

module.exports = HTML
