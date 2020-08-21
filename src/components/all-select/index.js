import mocAllSelect from './src/all-select';
/* istanbul ignore next */
mocAllSelect.install = function(Vue) {
	Vue.component(mocAllSelect.componentName, mocAllSelect);
};
export default mocAllSelect;
