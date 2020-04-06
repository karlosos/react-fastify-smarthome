const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@constants': path.resolve(__dirname, 'frontend/src/common/constants'),
      '@assets': path.resolve(__dirname, 'frontend/src/common/assets'),
      '@data': path.resolve(__dirname, 'frontend/src/data'),
      '@redux': path.resolve(__dirname, 'frontend/src/redux'),
      '@views': path.resolve(__dirname, 'frontend/src/views'),
      '@components': path.resolve(__dirname, 'frontend/src/components')
    }
  },
  entry: './frontend/src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'frontend/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './frontend/src/index.html',
      filename: './index.html'
    })
  ]
}
