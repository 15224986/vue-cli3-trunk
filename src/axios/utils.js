import { returnToLogin } from '@/utils/auth'

// 引入Message、loading
import {
    Message,
    Loading
} from 'element-ui';

// 定义loading变量
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
/**
 * 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
 * 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
 * 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
 */
let needLoadingRequestCount = 0
/**
 * @param 开启全屏加载
 */
export function showFullScreenLoading(config) {
    /**
     * 是否开启了 loading
     * 如果参数中携带了 isShowFullScreenLoading = true 则本次加载了loading，
     * 关闭本次开启的FullScreenLoading()
     */
    let isShowFullScreenLoading = true;
    if (config.params && config.params.isShowFullScreenLoading === false) {
        isShowFullScreenLoading = false;
    } else if (config.data && config.data.isShowFullScreenLoading === false) {
        isShowFullScreenLoading = false;
    }
    if (isShowFullScreenLoading) {
        if (needLoadingRequestCount === 0) {
            startLoading()
        }
        needLoadingRequestCount++
    }
}
/**
 * @param 关闭全屏加载
 */
export function tryHideFullScreenLoading(config) {
    /**
     * 是否开启 loading
     * 如果参数中携带了 isShowFullScreenLoading = true 则关闭本次的加载中调用
     */
    let isShowFullScreenLoading = true;
    if (config.params && config.params.isShowFullScreenLoading === false) {
        isShowFullScreenLoading = false
    } else if (config.data && JSON.parse(config.data).isShowFullScreenLoading === false) {
        isShowFullScreenLoading = false
    }
    if (isShowFullScreenLoading) {
        if (needLoadingRequestCount <= 0) return
        needLoadingRequestCount--
        if (needLoadingRequestCount === 0) {
            endLoading()
        }
    }
}
export function hideFullScreenLoading() {
   if (needLoadingRequestCount <= 0) return
   needLoadingRequestCount--
   if (needLoadingRequestCount === 0) {
       endLoading()
   }
}



/**
 * @param 接口状态验证
 */
export function checkResponse(response) {
    /**
     * 根据result跳转到响应页面
     */
    const res = response.data
    if ( res.status == 200 ) {  // 正确
        return res;
    }else if (res.status === 2003) {
        Message({
            message: '当前用户无相关操作权限！',
            type: 'error',
            duration: 5 * 1000
        })
    } else if(res.status === 1003 || res.status === 1002) {
        Message({
            message: res.message,
            type: 'error',
            duration: 5 * 1000
        })
        /**
         * 退出登录
         */
        returnToLogin()
    }else if (res.status == 400) {
        router.push({
            path: "/400"
        });
    }else{
        Message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
        })
    }
}
