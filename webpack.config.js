var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    // 'webpack-dev-server/client?http://localhost:8008',
    // 'webpack/hot/only-dev-server',
    './src/index'
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions:{
        output: {
          comments: false, // remove comments
        },
        compress: {
          unused: true,
          dead_code: true, // big one--strip code that will never execute
          warnings: false, // good for prod apps so users can't peek behind curtain
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          drop_console: true, // strips console statements
          sequences: true,
          booleans: true,
        }
      },
    })],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
