var path = require('path')
var webpack = require('webpack')

var OfficialIdentities = []
try {
  OfficialIdentities = require('./data/OfficialIdentities')
} catch (e) {
  /* Ignore */
}

var config = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    hashDigestLength: 8
  },
  externals: {
    Web3: 'web3'
  },
  module: {
    noParse: [/^react$/],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  mode: 'development',
  plugins: [
    new webpack.EnvironmentPlugin({ HOST: 'localhost' }),
    new webpack.DefinePlugin({
      OfficialIdentities: JSON.stringify(OfficialIdentities)
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.resolve(__dirname, 'node_modules'),
          name: 'vendor',
          enforce: true
        }
      }
    }
  }
}

module.exports = config
