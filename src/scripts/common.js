// 声明函数
function WidgetFun(){
    // 利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题。
    if (! this instanceof WidgetFun) {
        return new WidgetFun();
    }
};

// 去除所有空格
WidgetFun.prototype.trimAll = function (val) {
    if(!val) {
        return "";
    };
    return val.replace(/\s/ig,'');
};
// 去除左侧空格
WidgetFun.prototype.trimLeft = function (val) {
    if(!val) {
        return "";
    };
    return val.replace(/(^\s*)/g, "");
};
// 去除右侧空格
WidgetFun.prototype.trimRight = function (val) {
    if(!val) {
        return "";
    };
    return val.replace(/(\s*$)/g, "");
};


export default new WidgetFun();
