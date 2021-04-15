export default {
	options() {
		return {
            /**
             * loading
             */
            mainLoading: false,                 // 页面的加载状态
		}
	},
    filters:{
        /**
         * 通过过滤，将select的value转化为label
         */
        selectFormatter( value, options, type ){
            if( type === "array" ){
                if( !Array.isArray(value) ){
                    value = value.split(',')
                }
                let valueText = [];
                options.forEach(element => {
                    if( value.includes(element.value) ){
                        valueText.push( element.label )
                    }
                });
                return valueText.join()
            }else{
                options.forEach(element => {
                    if( value === element.value ){
                        return element.label
                    }
                });
            }
        }
    },
	methods: {
		$loadDom(callback, times=500){
			this.$nextTick(function () {
				setTimeout(()=>{
					callback && typeof(callback)==="function" ? callback.call(this) : ""
				}, times);
			});
		},
	}
}
