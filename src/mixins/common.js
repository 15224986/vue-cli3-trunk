export default {
	options() {
		return {
            /**
             * loading
             */
            mainLoading: false,                 // 页面的加载状态
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
