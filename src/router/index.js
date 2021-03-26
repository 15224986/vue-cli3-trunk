import Vue from 'vue';
import Router from 'vue-router';
// 引入
Vue.use(Router);

/**
 * 解决vue路由重复导航错误
 * 获取原型对象上的push函数
 * 修改原型对象中的push方法
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}



/**
 * 引入页面模块
 */
import container from './modules/container'
import assets from './modules/assets'

const router = new Router({
	// mode: 'history',
	linkActiveClass: "moc-active",
	routes: [
		{
			path: '/',
			component: () => import(/* webpackChunkName: "index" */ '@/views/Index'),
            name: 'root',
            meta:{
                title: '智能管理平台'
            },
            redirect: '/home',
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "home" */ '@/views/home/index')
                },
				container,
                assets
            ]
		}
	]
});












/**
 * vue使用nprogress页面加载进度条
 */
import NProgress from 'nprogress' 		// progress bar
NProgress.configure({
	easing: 'ease',  					// 动画方式
	speed: 500,  						// 递增进度条的速度
	showSpinner: false, 				// 是否显示加载ico
	trickleSpeed: 200, 					// 自动递增间隔
	minimum: 0.3 						// 初始化时的最小百分比
});


/**
 * 检测是否已经登录
 */
router.beforeEach((to, from, next) => {
	// 每次切换页面时，调用进度条
    NProgress.start();

	/**
	 * 动态修改页面的title
	 */
	if ( to.meta.title ) {
		document.title = to.meta.title;
	}else{
		document.title = '智能管理平台';
    }

    next();
});

//当路由进入后：关闭进度条
router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})

export default router;
