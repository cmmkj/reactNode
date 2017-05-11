const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  entry: [
    './src/entry.js'
  ],
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, loader: "babel-loader?presets[]=es2015&presets[]=react", include: /src/},
      { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader"},
      { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    })
  ]
}





