const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath="/";

//生成HtmlWebpackPlugin配置
cosnt getHtmlConfig = (name)=>({
	filename: name+'.html',
	template: './src/view/'+name+'.html',
	inject:true,
	hash:true,
	chunks:['common',name]
})

module.exports={
	// mode:'production',
	mode:'development',
	// entry:'./src/index.js',
	entry:{
		'common':'./src/pages/common/index.js',
		'index':'./src/pages/index/index.js',
		'user-login':'./src/pages/user-login/index.js'
	},
	output:{
		filename:'js/[name].js',
		publicPath:publicPath,
		path:path.resolve(__dirname,'dist')
	},

	//配置别名
	resolve:{
		alias:{
			pages:path.resolve(__dirname,'./src/pages/'),
			util:path.resolve(__dirname,'./src/util/'),
			api:path.resolve(__dirname,'./src/api/'),
			common:path.resolve(__dirname,'./src/common/'),
		},
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use: [
		          {
		            loader: MiniCssExtractPlugin.loader,
		            options: {
		              
		            }
		          },
		          "css-loader"
		        ]
			},
		    {
		        test:/\.(png|jpg|gif)$/,
		        use:[
		          'url-loader'
		        ]
		     },
		     {
                test:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react','es2015','stage-3'],
                    }
                },            
            }
		]
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
	      filename: "[name].css",
	      chunkFilename: "[id].css"
	    }),
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login')),
		
	], 
	devServer: {
    	contentBase:'./dist',
    	port:3002,
    	historyApiFallback:true,
    	
   	},

};