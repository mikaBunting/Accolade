var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry:'./src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    //plugins: [
      //  new webpack.HotModuleReplacementPlugin()
    //],

    devtool: 'eval',

    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
          // 'react-hot-loader',
          'ts-loader'
        ],
        include: path.join(__dirname, 'src')
            }
        ],

        preLoaders: [
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
};