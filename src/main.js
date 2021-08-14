import Vue from 'vue';
import App from './App.vue';
import router from './router';	// vue-router

/**
 * Vue去掉警告 You are running Vue in development mode
 */
Vue.config.productionTip = false;


/**
 * 配置是否允许 vue-devtools 检查代码。
 */
// Vue.config.devtools = false;

/**
 * 引入各种全局组件的样式
 */
import 'element-ui/lib/theme-chalk/index.css'   // element-ui
import '@/styles/element-variables.scss'        // 自定义element-ui主题
import 'nprogress/nprogress.css'                // nprogress（页面顶部进度条）
import '@/styles/global.scss';


/**
 * 引入mock数据，关闭则注释该行
 */
require('./assets/mock');


/**
 * 引入定义的axios
 */
import { instance, http } from './axios/http'
Vue.prototype.$http = http;
Vue.prototype.$axios = instance;


/**
 * 完整引入 引入ui模板 element-ui
 */
import ElementUI from 'element-ui';
let ElementUIsize = 'mini'
if( document.body.clientWidth >= 1610 ){
    ElementUIsize = 'small'
}
Vue.use(ElementUI, { size: ElementUIsize, zIndex: 900 });


/**
 * 全局lodash
 * Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库
 * Lodash 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。
 * https://www.lodashjs.com
 */
import * as lodash from "lodash";
Vue.prototype.$lodash = lodash;























/**
 * 定义默认路径
 */
Vue.prototype.$baseSrc = process.env.VUE_APP_URL;


/**
 * 通用UI库
 * 项目中使用过的插件
 */
import mocWidget from './components/index.js';
Vue.use(mocWidget);


/**
 * 引入公共数据
 */
import Global from '@/config/global.js'
Vue.prototype.$global = Global


/**
 * 引入项目的公共方法
 */
// import commonJs from '@/scripts/common.js'
// Vue.prototype.$common = commonJs


/**
 * 自定义工具
 */
// import toBoolean from "@/utils/toBoolean.js";
// Vue.prototype.$toBoolean = toBoolean;


/**
 * 全局指令
 */
import * as directives from '@/directives'
// 注册指令
Object.keys(directives).forEach(k => {
    Vue.directive(k, directives[k])
})


/**
 * 全局过滤器
 */
import * as filters from './filters/index.js' // global filters
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
})




















new Vue({
	router,
  	render: h => h(App),
}).$mount('#app');
