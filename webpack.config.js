const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath="/";

//生成HtmlWebpackPlugin配置
const getHtmlConfig = (name,title)=>({
	filename: name+'.html',
	template: './src/view/'+name+'.html',
	title:title,
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
		'user-content':'./src/pages/user-content/index.js',
		'user-login':'./src/pages/user-login/index.js',
		'user-register':'./src/pages/user-register/index.js',
		'user-update-password':'./src/pages/user-update-password/index.js',
		'result':'./src/pages/result/index.js',
		'list':'./src/pages/list/index.js',
		'detail':'./src/pages/detail/index.js',
		'cart':'./src/pages/cart/index.js',
		'order-confirm':'./src/pages/order-confirm/index.js',
		'order-list':'./src/pages/order-list/index.js',
		'order-detail':'./src/pages/order-detail/index.js',
		'payment':'./src/pages/payment/index.js',
	},
	/*
	//额外配置jquery的模板
	externals:{
		'jquery':'window.jQuery'
	}
	*/
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
			service:path.resolve(__dirname,'./src/service/'),
			node_modules:path.resolve(__dirname,'./node_modules/'),
			common:path.resolve(__dirname,'./src/common/'),
			images:path.resolve(__dirname,'./src/images/'),
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
		        test:/\.(png|jpg|gif|ttf|woff2|woff|eot|svg)\??.*$/,
		        use:[
		        	{
		          		loader:'url-loader',
		          		options:{
		          			limit:100,//图片大小限制，小于该值时打包为barse64格式
		          			name:'resource/[name].[ext]'//文件打包后的目录
		          		}
		       		}
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
            },
            {
            	test:/\.tpl$/,
                use: {
                    loader: 'html-loader',
                },
            }
		]
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
	      filename: "css/[name].css",
	      chunkFilename: "[id].css"
	    }),
		new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('result','结果提示')),
		new HtmlWebpackPlugin(getHtmlConfig('user-content','用户中心')),
		new HtmlWebpackPlugin(getHtmlConfig('user-update-password','修改密码')),
		new HtmlWebpackPlugin(getHtmlConfig('list','详情页面')),
		new HtmlWebpackPlugin(getHtmlConfig('detail','详情页面')),
		new HtmlWebpackPlugin(getHtmlConfig('cart','购物车页面')),
		new HtmlWebpackPlugin(getHtmlConfig('order-confirm','结算页面')),
		new HtmlWebpackPlugin(getHtmlConfig('order-list','订单列表')),
		new HtmlWebpackPlugin(getHtmlConfig('order-detail','订单详情')),
		new HtmlWebpackPlugin(getHtmlConfig('payment','支付页面')),
		
	], 
	devServer: {
    	contentBase:'./dist',
    	port:3002,
    	//代理
		proxy:{
			"/user":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true,
			},
			"/product":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true,
			},
			"/cart":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true,
			},
			"/order":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true,
			},
			"/shipping":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true,
			},
			"/payment":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true,
			}
		}    	
   	},

};