// 布局
import mocContainer from './container/index.js';
import mocContainerSection from './container-section/index.js';


// element-ul Select 选择器 封装全选
import mocAllSelect from './all-select/index.js';







// 存储组件列表
const components = [
    mocContainer,
    mocContainerSection,
	mocAllSelect
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
    // 判断是否安装
    if (install.installed) return
    // 遍历注册全局组件
	components.map(component => {
		Vue.component(component.componentName, component);
	});

}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

// 导出的对象必须具有 install，才能被 Vue.use() 方法安装
export default install;
// 以下是具体的组件列表
export {
	mocContainer,
	mocContainerSection,
	mocAllSelect
};
