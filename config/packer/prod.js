const path = require('path');
const webpack = require('webpack');
const fs=require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifier = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const lessToJs = require('less-vars-to-js');
const themeVariables=lessToJs(fs.readFileSync(path.resolve(__dirname, '../../src/assets/style/theme.less'), 'utf8'));

const base = require('./base.js');

module.exports = {
  context: base.rootPath,
  entry: {
    main: ['./src/app.js'],
    common: ['react', 'react-dom']
  },
  output: {
    path: base.staticPath,
    filename: 'assets/script/[name]_[hash:5].js',
    publicPath: base.ProdPath
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   include: base.srcPath,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: {loader: 'css-loader', options: {minimize: true, modules: true, localIdentName: '[name]__[local]__[hash:base64:5]'}}
      //   })
      // },
      // {
      //   test: /\.css$/,
      //   include: base.libPath,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: {loader: 'css-loader', options: {modules: true}}
      //   })
      // },
      // {
      //   test: /\.less$/,
      //   use: [
      //     require.resolve('style-loader'),
      //     require.resolve('css-loader'),
      //     {
      //       loader: require.resolve('less-loader'),
      //       options: {
      //         modifyVars:themeVariables,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          use:[ 
            require.resolve('css-loader'),
            {
              loader: require.resolve('less-loader'),
          options: {
            modifyVars:themeVariables,
          },
         }
        ],
          fallback: 'style-loader',
        }),
      },
    
      {
        test: /\.jsx?$/,
        include: base.srcPath,
        use: {loader:'babel-loader',options:{
          plugins:[
            ['import', { libraryName: 'antd', style: true }],
          ],
        }}
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        use: {loader: 'file-loader', options: {name: 'assets/image/[name]_[sha512:hash:base64:7].[ext]'}}
      }
    ]
  },
  resolve: {
    alias: {}, 
    modules: [base.libPath, base.srcPath]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{'NODE_ENV': JSON.stringify('production')}
    }),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: 'Test App'
    }),
    new ExtractTextPlugin({
      filename: 'assets/style/[name]_[hash:6].css',
      disable:false,
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: true
    }),
    new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
        PT: 'prop-types'
    }),
    new WebpackNotifier({
      title: '编译完成',
      alwaysNotify: true,
      contentImage: base.masterPath
    })
  ]
};
