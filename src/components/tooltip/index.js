import mocComponent from './src/main.vue';
/* istanbul ignore next */
mocComponent.install = function(Vue) {
	Vue.component(mocComponent.componentName, mocComponent);
};
export default mocComponent;
