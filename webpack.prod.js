var webpack = require('webpack')
var devConfig = require('./webpack.config.js')
var path = require('path')

var prodConfig = {
  ...devConfig,
  mode: 'production',
  devtool: false
}

prodConfig.plugins.push(new webpack.IgnorePlugin(/redux-logger/))
prodConfig.resolve.alias = {
  react: 'react/umd/react.production.min.js',
  'react-dom': 'react-dom/umd/react-dom.production.min.js',
  'react-styl': 'react-styl/prod.js',
  web3: path.resolve(__dirname, 'public/web3.min'),
  redux: 'redux/dist/redux.min.js',
  'react-redux': 'react-redux/dist/react-redux.min.js',
  'react-router-dom': 'react-router-dom/umd/react-router-dom.min.js'
}
prodConfig.module.noParse = [
  /^(react|react-dom|react-styl|redux|react-redux|react-router-dom)$/,
  /web3/
]

module.exports = prodConfig
