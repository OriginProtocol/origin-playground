import express from 'express'
import serveStatic from 'serve-static'
import { spawn } from 'child_process'
import Ganache from 'ganache-core'
import opener from 'opener'
import fs from 'fs'
import Web3 from 'web3'

import simpleIssuer from './issuer-services/_simple'

const HOST = process.env.HOST || 'localhost'
const app = express()

app.get('/', (req, res) => {
  var html = fs.readFileSync(__dirname + '/public/dev.html').toString()
  res.send(html.replace(/\{HOST\}/g, `http://${HOST}:8082/`))
})
app.use(serveStatic('public'))

try {
  var { simpleApp } = require('./issuer-services/config.json')
  simpleIssuer(app, { web3: new Web3(), simpleApp })
} catch(e) {
  /* Ignore */
}

const startGanache = () =>
  new Promise((resolve, reject) => {
    try {
      fs.mkdirSync('./data/db')
    } catch (e) {
      /* Ignore */
    }
    var server = Ganache.server({
      total_accounts: 5,
      default_balance_ether: 100,
      db_path: 'data/db',
      network_id: 999,
      seed: 123
      // blocktime: 3
    })
    server.listen(8545, err => {
      if (err) {
        return reject(err)
      }
      console.log('Ganache listening. Starting webpack...')
      resolve()
    })
  })

async function start() {
  await startGanache()
  const webpackDevServer = spawn('./node_modules/.bin/webpack-dev-server', [
    '--info=false',
    '--port=8082',
    '--host=0.0.0.0'
  ])
  webpackDevServer.stdout.pipe(process.stdout)
  webpackDevServer.stderr.pipe(process.stderr)
  process.on('exit', () => webpackDevServer.kill())

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`\nListening on port ${PORT}\n`)
    setTimeout(() => {
      opener(`http://${HOST}:${PORT}`)
    }, 2000)
  })
}

start()
