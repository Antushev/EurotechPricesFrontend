const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },

  devServer: {
    static: {
      directory: path.join(__dirname, './public')
    },
    open: false,
    port: 1337,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ]
  },

  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `json`]
  },

  devtool: 'source-map',
  mode: 'development'
};
