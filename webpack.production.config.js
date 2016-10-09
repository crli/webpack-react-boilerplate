const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  // entry: {
  //  //三个入口文件，app, mobile和 vendors
  //   app: path.resolve(APP_PATH, 'index.js'),
  //   mobile: path.resolve(APP_PATH, 'mobile.js'),
  //   vendors: ['jquery']
  // },
  entry: [
    path.resolve(__dirname, 'app/main.js')
  ],
  output: {
    path: __dirname + '/build',
    filename: '[name]-[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { 
        test: /\.css$/, 
        include: path.resolve(__dirname, 'app'), 
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss-loader")
      },
      { 
        test: /\.scss$/,
        include: path.resolve(__dirname, 'app'), 
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss-loader!sass-loader?outputStyle=expanded")
        // 'style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss-loader!sass-loader?outputStyle=expanded'
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
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: __dirname + "/app/templates/index.tem.html"
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new ExtractTextPlugin("[name]-[hash].css")
  ]
  // //添加我们的插件 会自动生成一个html文件
  // //多页面打包
  // plugins: [
  //   //这个使用uglifyJs压缩你的js代码
  //   new webpack.optimize.UglifyJsPlugin({minimize: true}),
  //   //把入口文件里面的数组打包成verdors.js
  //   new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
  //   //创建了两个HtmlWebpackPlugin的实例，生成两个页面
  //   new HtmlwebpackPlugin({
  //     title: 'Hello World app',
  //     template: __dirname + "/app/templates/index.tem.html",
  //     filename: 'index.html',
  //     //chunks这个参数告诉插件要引用entry里面的哪几个入口
  //     chunks: ['app', 'vendors'],
  //     //要把script插入到标签里
  //     inject: 'body'
  //   }),
  //   new HtmlwebpackPlugin({
  //     title: 'Hello Mobile app',
  //     template: __dirname + "/app/templates/mobile.tem.html",
  //     filename: 'mobile.html',
  //     chunks: ['mobile', 'vendors'],
  //     inject: 'body'
  //   })
  // ]
}
