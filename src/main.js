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
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/element-variables.scss'   // 自定义element-ui主题
import ElementUI from 'element-ui';
Vue.use(ElementUI);


/**
 * 全局lodash
 * Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库
 * Lodash 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。
 * https://www.lodashjs.com
 */
import * as lodash from "lodash";
Vue.prototype.$lodash = lodash;


/**
 * 全局moment
 * 日期处理类库
 */
import moment from 'moment'
Vue.prototype.$moment = moment;





















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
 * 案例： home/directiveFilters
 */
// import toBoolean from "@/utils/toBoolean.js";
// Vue.prototype.$toBoolean = toBoolean;


/**
 * 全局指令
 * 案例： home/directiveFilters
 */
// import dialogDrag from '@/directives/dialogDrag.js'
// Vue.use(dialogDrag);


/**
 * 全局过滤器
 */
// import * as filters from './filters/index.js' // global filters
// Object.keys(filters).forEach(key => {
// 	Vue.filter(key, filters[key]);
// })




















new Vue({
	router,
  	render: h => h(App),
}).$mount('#app');
