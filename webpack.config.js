const path = require("path") ;
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devServer =  require('webpack-dev-server')
module.exports = {
    entry: './src/client/index.js',
    output:{
        filename:"main.js",
        path: path.resolve(__dirname,"dist")
    },
    mode:'development',
    devtool: 'source-map',
    
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
            
       
            {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader","sass-loader"],
      },
            
        ]
    },
    plugins: [
    new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    }),
    new WorkboxPlugin.GenerateSW({
      
       clientsClaim: true,
       skipWaiting: true,
     }),
    
     new MiniCssExtractPlugin({
         filename:'main.css'

     })
    
]

}