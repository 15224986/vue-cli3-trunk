import axios from 'axios'
import { axiosBaseURL } from '@/config/ip.js'
import { MessageBox } from 'element-ui';

/**
 * 全局加载中
 *
 * 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
 * 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
 * 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
 */
import { Loading } from 'element-ui';
let loading
// 使用Element loading-start 方法
function startLoading() {
	loading = Loading.service({
		lock: false,
		body: true,
		text: '加载中……',
		background: 'rgba(0, 0, 0, 0.7)'
	})
}
// 使用Element loading-close 方法
function endLoading() {
	loading.close()
}
let needLoadingRequestCount = 0
function showFullScreenLoading() {
	if (needLoadingRequestCount === 0) {
		startLoading()
	}
	needLoadingRequestCount++
}
function tryHideFullScreenLoading() {
	if (needLoadingRequestCount <= 0) return
	needLoadingRequestCount--
	if (needLoadingRequestCount === 0) {
		endLoading()
	}
}


// 创建axios实例
const instance = axios.create({
	// baseURL: process.env.BASE_API, 		// api的base_url
	// baseURL: 'http://10.10.167.11:8765',
	// baseURL: axiosBaseURL.ip1,
	timeout: 15000, 						// 请求超时时间
    withCredentials: true,                  // Axios 默认不发送cookie，需要全局设置true发送cookie
})


// 请求拦截器
instance.interceptors.request.use((config) => {

    /**
     * 是否开启 loading
     * 如果参数中携带了 closeFullScreenLoading = true 则关闭本次的加载中调用
     */
    let closeFullScreenLoading = true;
    if ( config.params ) {
        closeFullScreenLoading = config.params.closeFullScreenLoading;
    }
    if( !closeFullScreenLoading ){
    	showFullScreenLoading();
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('请求响应');
            resolve(config)
        }, 3000);
    });

    return config;
}, error =>{
    // 对请求错误做些什么
    return Promise.reject(error)
});


// 添加响应拦截器
instance.interceptors.response.use(response =>{
    /**
     * 是否开启了 loading
     * 如果参数中携带了 closeFullScreenLoading = true 则本次加载了loading，
     * 关闭本次开启的FullScreenLoading()
     */
    let closeFullScreenLoading = true;
    if ( response.config.params ) {
        closeFullScreenLoading = response.config.params.closeFullScreenLoading;
    }
    if( !closeFullScreenLoading ){
        tryHideFullScreenLoading();
    }



    /**
     * 返回状态验证
     */
    const res = response.data
    if( res.result == 700 ){
        router.push({ path: "/login" });
    }else if( res.result == 400 ){
        router.push({ path: "/400" });
    }else if( res.result == -1 ){
        MessageBox.alert( res.msg, '系统提示', {
            type: 'error',
            callback: action => {}
        });
    }else if ( response.status !== 200 || ( res.result && res.result !== 0)) {
        MessageBox.alert( response.data.msg, '系统提示', {
            type: 'error',
            callback: action => {}
        });
        // return response.data
        return Promise.reject('error')
    }



    return response.data
}, error =>{
    /**
     * 关闭本次开启的FullScreenLoading()
     */
    tryHideFullScreenLoading();

    // 对响应错误做点什么
	return Promise.reject(error)
});





export default instance
