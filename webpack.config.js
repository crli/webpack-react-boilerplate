const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true, 
    contentBase: './app',
    progress: true
  },
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/main.js')
  ],
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name]-[hash].js'
  },
  module: {
    perLoaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'app'),
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { 
        test: /\.css$/, 
        include: path.resolve(__dirname, 'app'), 
        loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss-loader' 
      },
      { 
        test: /\.scss$/,
        include: path.resolve(__dirname, 'app'), 
        loader: 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss-loader!sass-loader?outputStyle=expanded'
      },
      { 
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  postcss: function () {
    return [require('autoprefixer')];
  },
  //检查自己的js是否符合jshint的规范
  jshint: {
    "esnext": true
  },
  //合并以后的代码，采用source-map的形式利于排错和定位
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: __dirname + "/app/templates/index.tem.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
}