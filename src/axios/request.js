import axios from 'axios'
/**
 * 引入路径
 * 不同服务器的ip地址
 */
import { axiosBaseURL } from '@/config/ip.js'
/**
 * 使用自定义配置新建一个 axios 实例
 */
const instance = axios.create({
	// baseURL: process.env.BASE_API, 		// api的base_url
	// baseURL: 'http://10.10.167.11:8765',
	// baseURL: axiosBaseURL.ip1,
	timeout: 15000, 						// 请求超时时间
    withCredentials: true,                  // Axios 默认不发送cookie，需要全局设置true发送cookie
})

import {
    showFullScreenLoading,
    tryHideFullScreenLoading,
    hideFullScreenLoading,
    checkResponse
} from './utils.js'
/**
 * 请求拦截器
 */
instance.interceptors.request.use((config) => {
    /**
     * 发送请求携带 token
     * 判断本地是否存在token，如果存在的话，则每个http header都加上token
     */
    const token = window.localStorage.getItem("token");
    if (token) {
        config.headers['token'] = token;
    }
    /**
     * 是否开启了 FullScreenLoading
     */
    showFullScreenLoading(config)
    /**
     * 参数
     */
    return config;
}, error =>{
    // 对请求错误做些什么
    return Promise.reject(error)
});
/**
 * 响应拦截器
 */
instance.interceptors.response.use(response =>{
    /**
     * 是否开启了 FullScreenLoading
     */
    tryHideFullScreenLoading(response.config)
    /**
     * 根据result跳转到响应页面
     */
    return checkResponse(response)
}, error =>{
    /**
     * 关闭本次开启的FullScreenLoading()
     */
    hideFullScreenLoading()
    // 对响应错误做点什么
    return Promise.reject(error)
});
export default instance
