/* eslint no-console: 0 */
// start webpack
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

// create express
const app = express();

// setup hot reload
config.plugins = [
  // define plugin for node env
  new webpack.DefinePlugin({
    'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
  }),
  // hot reload plugin
  new webpack.HotModuleReplacementPlugin(),
  // setup no erros plugin
  new webpack.NoErrorsPlugin(),
];
// override entry for hotload
config.entry = [
  'webpack-hot-middleware/client',
  config.entry,
];
// returns a Compiler instance
const compiler = webpack(config);
// stats output config
const statsConf = {
  colors: true,
  hash: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  modules: false,
};
app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: statsConf,
}));
app.use(webpackHotMiddleware(compiler));

// serve statics
app.use(express.static(__dirname));
// serve index
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
// start server
app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port 3000');
});
