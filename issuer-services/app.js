var express = require('express')
var session = require('express-session')
var Web3 = require('web3')

var simple = require('./_simple')
var facebook = require('./_facebook')
var twitter = require('./_twitter')
var github = require('./_github')
var google = require('./_google')
var linkedin = require('./_linkedin')

try {
  var Config = require('./config.json')
} catch (e) {
  console.log('Please copy config.json.eg to config.json and update it.')
  process.exit()
}

Config.web3 = new Web3(Config.provider)

const app = express()
app.use(
  session({
    secret: 'top secret string',
    resave: false,
    saveUninitialized: true
  })
)

app.get('/', (req, res) => {
  res.send('Issuer Services')
})

simple(app, Config)
facebook(app, Config)
twitter(app, Config)
github(app, Config)
google(app, Config)
linkedin(app, Config)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`\nListening on port ${PORT}\n`)
})
