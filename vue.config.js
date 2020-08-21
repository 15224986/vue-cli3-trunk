const webpack = require('webpack');

module.exports = {	// webpack-dev-server 相关配置
  	/**
	 * 1.安装@vue/cli-plugin-eslint后生效。为true时将检查错误输出为编译警告输出到命令行，编译不会失败。
	 * 为"error"时，将检查错误直接显示在浏览器中。强制eslint-loader将lint错误输出为编译错误，编译会失败。
	 */
	lintOnSave: false,
	/**
	 * 2.1部署应用包时的基本URL。用法和webpack本身的output.publicPath一致。
	 * 但在cli的其它地方也会用到这个值，所以请不要直接修改webpack的output.publicPath。
	 * 2.2默认情况下,Vue Cli会假设你的应用是被部署在一个域名的根路径。
	 * 如我本地的应用的路径是“D:\WORK\study\vue\vue_cli3_test\demo1”，则在这个应用中，根路径就是“D:\WORK\study\vue\vue_cli3_test\demo1”
	 */
    // publicPath: '/',
    /**
     * 3.当运行vue-cli-service build时生成的生产环境构建环境的目录。用法和webpack的output.path一样，不要修改output.path
     */
	// outputDir :'dist',
	/**
	 * 4.放置打包后生成的静态资源（js、css、img、fonts）的目录，该目录相对于outputDir。
	 */
	assetsDir:'static',
	/**
	 * 5.指定生成的index.html的输出路径，相对于outputDir。也可以是一个绝对路径。
	 */
  	// indexPath : 'index.html',
  	/**
  	 * 6.如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  	 */
  	productionSourceMap : false,
    /**
	 * 端口号、域名、代理等配置
	 */
  	devServer: {
	    open: true,			// 启动是否自动打开浏览器
	    host: '0.0.0.0',	// 本机域名
		port: 8280,			// 端口号
	    proxy: null,
	    // proxy: {
	    //   	'/api': {
		//         target: 'http://10.10.2.231:8100/wisdom-station-1.0-SNAPSHOT/',
		//         // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
		//         changeOrigin: true,
		//         ws: true,
		//         pathRewrite: {
		//           	// 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
		//           	'^/api': '/'
		//         }
		// 	},
		// 	'/foo': {
		//         target: 'http://api.douban.com/v2',
		//         // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
		//         changeOrigin: true,
		//         ws: true,
		//         pathRewrite: {
		//           	// 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
		//           	'^/api': '/'
		//         }
	    //   	}
	    // }
	},
  	/**
  	 * 显示生成的css文件的所使用的sass、less的文件和位置。
  	 * 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
  	 */
  	css:{
  		sourceMap: true
  	},
  	/**
  	 * 配置sass的公共资源
  	 */
  	chainWebpack: config => {
		/**
		 * 加载sass的公共文件 _mixin.scss 和 _variables.scss
		 */
		const oneOfsMap = config.module.rule('scss').oneOfs.store
	    oneOfsMap.forEach(item => {
	      	item
	      		.use('sass-resources-loader')
		        .loader('sass-resources-loader')
		        .options({
		          	// 提供文件的路径数组
		          	resources: ['./src/styles/components/_mixin.scss', './src/styles/components/_variables.scss']
		        })
		        .end()
		});
	},
	configureWebpack: {	// 引入jquery
	    plugins: [
		    new webpack.ProvidePlugin({
		    	$:"jquery",
		    	jQuery:"jquery",
		    	"windows.jQuery":"jquery"
		    })
	    ]
	 }
};
