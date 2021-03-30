import Axios from 'axios';
/**
 * 引入路径
 * 不同服务器的ip地址
 */
import { axiosBaseURL } from '@/config/ip.js'
/**
 * 使用自定义配置新建一个 axios 实例
 */
var instance = Axios.create({
    baseURL: axiosBaseURL.ip1,
    timeout: 15000,  //超时响应
    withCredentials: true,  // Axios 默认不发送cookie，需要全局设置true发送cookie
    // headers: {
    //     'Content-Type' : 'application/x-www-form-urlencoded'
    // }
});


/**
 * 封装Axios方法
 * @param url
 * @param data
 * @returns {Promise}
 */
const http = ( params = {} ) => {
    return new Promise((resolve, reject) => {
        instance(params).then(response => {
                resolve(response);
            }).catch(err => {
                reject(err)
            })
    })
};


/**
 * 封装all方法
 * 创建的 instance 里面并没有all方法，所有使用 Axios 执行，如果要想使用 instance.all 需要 添加下面的解决方案，
 * 这里之所以要加上注释，因为在eslint里是不允许对__proto__进行重新赋值的
 * https://blog.csdn.net/weixin_33928137/article/details/88040948
 */
/* eslint-disable no-proto */
// instance.__proto__ = Axios
http.__proto__ = Axios
/* eslint-enable */
http.all = ( promiseArray = [] ) => {
	return new Promise((resolve, reject) => {
		Axios.all(promiseArray)
			.then(allResponse => {
				resolve(allResponse)
			})
			.catch((error) => {
				reject(error)
			})
	})
};
/**
 * 使用例子
 */
// httpall(){
//     let params = {};
//     let params2 = {
//         baseURL:''       // 修改默认路径
//     };
//     let ajaxArr= [
//         this.$http.get('/mock/additionOptions', params, params2),
//         this.$http.get('/mock/addition', params, params2)
//     ];
//     this.$http.all(ajaxArr).then(response => {
//             console.log( response );
//         })
//         .catch(error => {
//             console.log(error);
//         });
//     this.$http.all(ajaxArr).then(this.$http.spread(function(acct, perms) {
//             console.log( acct, perms );
//         }))
//         .catch(error => {
//             console.log(error);
//         });
// },


/**
 * 封装get方法
 * @param url       // 路径
 * @param params    // 参数
 * @param obj       // 配置
 * @returns {Promise}
 */
http.get = (url, params = {}, obj = {} ) => {
    return new Promise((resolve, reject) => {
        obj.params = params;
        instance.get(url, obj ).then(response => {
                resolve(response);
            }).catch(err => {
                reject(err)
            })
    })
};

/**
 * 封装delete方法
 * @param url       // 路径
 * @param params    // 参数
 * @param obj       // 配置
 * @returns {Promise}
 */
http.delete = (url, params = {}, obj = {}) => {
    return new Promise((resolve, reject) => {
        obj.params = params;
        instance.delete(url, obj ).then(response => {
                resolve(response);
            }).catch(err => {
                reject(err)
            })
    })
};


/**
 * 封装head方法
 * @param url       // 路径
 * @param params    // 参数
 * @param obj       // 配置
 * @returns {Promise}
 */
http.head = (url, params = {}, obj = {}) => {
    return new Promise((resolve, reject) => {
        obj.params = params;
        instance.head(url, obj).then(response => {
                resolve(response);
            }).catch(err => {
                reject(err)
            })
    })
}



/**
 * 封装post请求
 * @param url       // 路径
 * @param data      // 参数
 * @param obj       // 配置
 * @returns {Promise}
 */
http.post = (url, data = {}, obj = {}) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data, obj).then(response => {
                resolve(response);
            }, err => {
                reject(err)
            })
    });
}


/**
 * 封装put请求
 * @param url       // 路径
 * @param data      // 参数
 * @param obj       // 配置
 * @returns {Promise}
 */
http.put = (url, data = {}, obj = {}) => {
    return new Promise((resolve, reject) => {
        instance.put(url, data, obj).then(response => {
            resolve(response);
        }, err => {
            reject(err)
        })
    });
}


/**
 * 封装patch请求
 * @param url       // 路径
 * @param data      // 参数
 * @param obj       // 配置
 * @returns {Promise}
 */
http.patch = (url, data = {}, obj = {}) => {
    return new Promise((resolve, reject) => {
        instance.patch(url, data, obj).then(response => {
            resolve(response);
        }, err => {
            reject(err)
        })
    });
}




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
 * 添加响应拦截器
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

export {instance, http};
