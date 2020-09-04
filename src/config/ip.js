/**
 * true 开发用， false 打包用
 */
const istest = true;



/**
 * 公共ip
 */
let axiosBaseURL = {
    ip1: process.env.VUE_APP_URL,   // 平台共享工单和租户入主工单
    ip2: "http://10.4.66.45:8891/",             //
};
if( istest ){
    axiosBaseURL = {
        ip1: '',   // 平台共享工单和租户入主工单
        ip2: "http://10.4.66.45:8891/",             //
    };
}










export { istest, axiosBaseURL };
