const { fstat } = require('fs')
const path = require('path')
const webpack = require('webpack')
const fs = require('fs');
const {
  dependencies,
  devDependencies,
  productName,
} = require('../package.json')

const externals = Object.keys(dependencies).concat(Object.keys(devDependencies))
const isDevMode = process.env.NODE_ENV === 'development'
var webworkers = path.join(__dirname, '../src/renderer/webworkers');
entry = fs.readdirSync(webworkers).filter(x => x.indexOf("workers.js") === -1 && path.extname(x) == ".js")
  .reduce((prev, cur) => {
    var basename = path.basename(cur);
    var nameWithoutExt = basename.split(".js")[0];
    return Object.assign({}, prev, {[nameWithoutExt]: path.join(webworkers, cur)})
  }, {});
console.log(entry);
const config = {
  name: 'workers',
  mode: process.env.NODE_ENV,
  devtool: isDevMode ? 'eval-source-map' : false,
  entry,
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  externals: externals,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
  node: {
    global: true,
    __dirname: false,
    __filename: false,
  },
  plugins: [
    // new WriteFilePlugin(),
    new webpack.DefinePlugin({
      'process.env.PRODUCT_NAME': JSON.stringify(productName),
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/'),
      src: path.join(__dirname, '../src/'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
  target: 'node',
}

/**
 * Adjust rendererConfig for production settings
 */
if (isDevMode) {
  // any dev only config
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    })
  )
}

module.exports = config
