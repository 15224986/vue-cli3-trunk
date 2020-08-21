import mocContainer from './src/container';
/* istanbul ignore next */
mocContainer.install = function(Vue) {
	Vue.component(mocContainer.componentName, mocContainer);
};
export default mocContainer;
