/**
 * true 开发用， false 打包用
 */
const istest = true;


function getHeadUrl() {
	var reg = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
	var protocol = window.location.protocol;		// 获取http 还是 https
	var ip = reg.exec(window.location.href)[0];		// 获取ip
	var port = location.port;						// 获取端口号
	var protocolIp = protocol + '//' + ip;			// 拼接
	return protocolIp


    /**
     * 以iframe嵌入到别的页面里使用
     */
    // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    let curWwwPath = window.document.location.href
    // 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    let pathName = window.document.location.pathname
    let pos = curWwwPath.indexOf(pathName)
    // 获取主机地址，如： http://localhost:8083
    let localhostPaht = curWwwPath.substring(0, pos)
    // 获取带"/"的项目名，如：/uimcardprj
    let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1)
    // js获取项目根路径，如： http://localhost:8083/uimcardprj
    let protocolIp = localhostPaht + projectName
    return protocolIp
}



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
