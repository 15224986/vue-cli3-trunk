import mocContainerSection from './src/container-section';
/* istanbul ignore next */
mocContainerSection.install = function(Vue) {
	Vue.component(mocContainerSection.componentName, mocContainerSection);
};
export default mocContainerSection;
