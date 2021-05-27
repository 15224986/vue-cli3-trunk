export default {
	data() {
		return {
            /**
             * loading
             */
            tableLoading: false,                // 表格的加载状态
			/**
             * 表格相关
			 */
            calcTableHeightDom: '#project-table',       // 表格高度依据的dom
            calcTableHeightMinuend: 0,                  // 表格去除的高度
            tableHeight: 100,                           // 表格高度
			tableIndexWidth: 56,                        // 表格序号列的宽度
            
            
            tableTotal: 0,                              // 总条数
		}
	},
	watch: {
		/**
         * 计算表格序号列的宽度
		 * 监听总条数的变化
		 */
		"search.current": function (newVal, oldVal) {
			let num = (this.search.current * this.search.size + '').toString().length;
			this.tableIndexWidth = num*10+36;
		}
	},
    mounted () {
        /**
         * 表格计算高度
         */
        this.$nextTick(()=>{
            this.calcTableHeight(this.calcTableHeightMinuend);
        })
        window.addEventListener('resize', this.calcTableHeight, false);
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.calcTableHeight, false);
    },
	methods: {
		/**
		 * 自定义索引
		 */
		handleIndex(index){
			return ( this.search.current-1 ) * this.search.size + index + 1;
		},
        /**
         * 计算表格的高度
         * minuend 高度去掉多少
         */
        calcTableHeight(minuend){
            /**
             * 预定义变量
             */
            let $ = document.querySelector.bind(document);
            /**
             * 初始化设置table的高度
             */
            this.$nextTick( ()=>{
                let $dom = $(this.calcTableHeightDom),
                    $head = $(this.calcTableHeightDom + ' .moc-container-section-header'),
                    $foot = $(this.calcTableHeightDom + ' .moc-container-section-footer'),
                    headH = $head ? $head.offsetHeight : 0,
                    footH = $foot ? $foot.offsetHeight : 0;
                if($dom){
                    this.tableHeight = $dom.offsetHeight - headH - footH - minuend;

                    // /**
                    //  * 循环检测高度，每隔200毫秒从新获取 $dom 的高度
                    //  * 判断这个div的高度是否和table的高度相等，如果相等执行计数，如果连续runNumber次(每次1s钟)相等，则停止循环
                    //  * 如果不相等，则将div的高度 赋值给table，并从新开始计数
                    //  */
                    // let timesRun = 0,               // 当前循环次数
                    //     runNumber = 10,             // 多少秒之后停止算
                    //     coefficient = 5,            // 系数
                    //     intervals = 200;            // 循环间隔时间
                    // let interval = setInterval( ()=>{
                    //     let containerH = $dom.offsetHeight - headH - footH - minuend;

                    //     console.log(containerH)
                    //     if( this.tableHeight === containerH ){
                    //         timesRun++;
                    //         if( timesRun >= runNumber*coefficient ){
                    //             clearInterval(interval);
                    //         }
                    //     }else{
                    //         timesRun = 0;
                    //         this.tableHeight = containerH;
                    //     }
                    // }, intervals);
                }
            });
        }
	}
}
