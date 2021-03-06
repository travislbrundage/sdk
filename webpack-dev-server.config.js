const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@boundlessgeo/sdk': path.resolve(__dirname, 'src/'),
    },
  },
  // Entry points to the project
  entry: {
    // each example is it's own entry point.
    basic: [
      'webpack/hot/only-dev-server',
      './examples/basic/app.jsx',
    ],
    wms: [
      'webpack/hot/only-dev-server',
      './examples/wms/app.jsx',
    ],
    'feature-table': [
      'webpack/hot/only-dev-server',
      './examples/feature-table/app.jsx',
    ],
    popups: [
      'webpack/hot/only-dev-server',
      './examples/popups/app.jsx',
    ],
    clustering: [
      'webpack/hot/only-dev-server',
      './examples/clustering/app.jsx',
    ],
    sprites: [
      'webpack/hot/only-dev-server',
      './examples/sprites/app.jsx',
    ],
    'paint-change': [
      'webpack/hot/only-dev-server',
      './examples/paint-change/app.jsx',
    ],
    drawing: [
      'webpack/hot/only-dev-server',
      './examples/drawing/app.jsx',
    ],
    legends: [
      'webpack/hot/only-dev-server',
      './examples/legends/app.jsx',
    ],
    'export-image': [
      'webpack/hot/only-dev-server',
      './examples/export-image/app.jsx',
    ],
    'basic-wgs84': [
      'webpack/hot/only-dev-server',
      './examples/basic-wgs84/app.jsx',
    ],
    'layer-list': [
      'webpack/hot/only-dev-server',
      './examples/layer-list/app.jsx',
    ],
    rotating: [
      'webpack/hot/only-dev-server',
      './examples/rotating/app.jsx',
    ],
  },
  // Server Configuration options
  devServer: {
    contentBase: './', // Relative directory for base of server
    hot: true, // Live-reload
    inline: true,
    port: 3000, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval',
  node: {fs: "empty"},
  output: {
    path: __dirname, // Path of output file
    // [name] refers to the entry point's name.
    filename: 'examples/[name]/[name].bundle.js',
  },
  plugins: [
    new ExtractTextPlugin('dist/sdk.css'),
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      }, {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }),

      }
    ],
  },
};

module.exports = config;
