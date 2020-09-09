import Axios from 'axios';
import Qs from 'qs';
import Vue from 'vue';


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

/**
 * 拦截器
 * 在请求或响应被 then 或 catch 处理前拦截它们。
 */
// 引入路由
import router from '@/router';   // vue-router
import { MessageBox } from 'element-ui';

// 引入loading
import { Loading } from 'element-ui';
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



// 请求拦截器
instance.interceptors.request.use((config) => {

    // console.log(config);

    const timestamp = new Date().getTime();
    const tokenExpire = window.localStorage.getItem("tokenExpire")-0;
    if( timestamp >= tokenExpire && config.url != '/mock/table' ){
        return new Promise((resolve, reject) => {
            //刷新token
            // http.get( '/mock/table', {}, {baseURL:''}).then( res => {
            //     window.localStorage.setItem("tokenExpire", '123');
            //     axiosRequestUse(config)
            //     resolve(config);
            // })
            // .catch( error => {
            //     reject(error);
            // });

            setTimeout(() => {
              console.log('获取token');
              resolve(config)
            }, 3000);
        });
    }

    console.log( tokenExpire );

    axiosRequestUse(config)


    return config;
}, error =>{
    // 对请求错误做些什么
    return Promise.reject(error)
});
function axiosRequestUse(config){

    /**
     * 在发送请求之前转换post传过去时的参数格式
     * 安装插件 querystring 进行转化
     * 通过querystring 将json格式的请求数据转换为form-data格式
     */
    // if (config.method === 'post' || config.method === 'put' ) {
    //     config.data = Qs.stringify(config.data);
    // }


    /**
     * 发送请求携带 token
     * 判断本地是否存在token，如果存在的话，则每个http header都加上token
     */
    // const token = window.localStorage.getItem("token");
    // if (token) {
    //     config.headers['token'] = token;
    // }

    /**
     * 是否开启 loading
     * 如果参数中携带了 closeFullScreenLoading = true 则关闭本次的加载中调用
     */
    let closeFullScreenLoading = '';
    if (config.method === 'get' || config.method === 'delete' ) {
        closeFullScreenLoading = config.params.closeFullScreenLoading;
    }else{
        closeFullScreenLoading = config.data.closeFullScreenLoading;
    }
    if( !closeFullScreenLoading ){
    	showFullScreenLoading();
    }
}


// 添加响应拦截器
instance.interceptors.response.use(response =>{
    /**
     * 是否开启了 loading
     * 如果参数中携带了 closeFullScreenLoading = true 则本次加载了loading，
     * 关闭本次开启的FullScreenLoading()
     */
    let closeFullScreenLoading = '';
    if (response.config.method === 'get' || response.config.method === 'delete' ) {
        closeFullScreenLoading = response.config.params.closeFullScreenLoading;
    }else{
        closeFullScreenLoading = JSON.parse(response.config.data).closeFullScreenLoading;
    }
    if( !closeFullScreenLoading ){
        tryHideFullScreenLoading();
    }

    /**
     * 根据result跳转到响应页面
     */
    if( response.data.result == 702 ){
        router.push({ path: "/login" });
    }else if( response.data.result == 400 ){
        router.push({ path: "/400" });
    }else if( response.data.result == -1 ){
        MessageBox.alert( response.data.msg, '系统提示', {
            type: 'error',
            callback: action => {}
        });
    }



    /**
     * 返回数据
     */
    return response.data;
}, error =>{
    /**
     * 关闭本次开启的FullScreenLoading()
     */
    tryHideFullScreenLoading();

    // 对响应错误做点什么
	return Promise.reject(error)
});

export {instance, http};
