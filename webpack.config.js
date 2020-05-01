require('dotenv/config');
const path = require('path');

const clientPath = path.resolve(__dirname, 'client/');
const publicPath = path.resolve(__dirname, 'server/public/');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: clientPath,
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: process.env.DEV_SERVER_PORT,
    contentBase: publicPath,
    historyApiFallback: true,
    watchContentBase: true,
    stats: 'minimal',
    proxy: {
      '/api': `http://localhost:${process.env.PORT}`
    }
  }
};
