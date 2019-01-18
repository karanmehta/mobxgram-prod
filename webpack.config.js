const webpack = require('webpack')
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin")
const NODE_ENV = process.env.NODE_ENV || 'production';

console.log('ENV : ' + NODE_ENV)

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
};
