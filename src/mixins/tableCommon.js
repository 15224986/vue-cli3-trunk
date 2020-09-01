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
            tableHeight: 100,           // 表格高度
            tableMinuend: 0,            // 表格被占用的高度
			tableIndexWidth: 56,        // 表格序号列的宽度
            /**
             * 分页器
             */
            pagination: {
                current: 1,         // 当前页
                size: 20,           // 每页显示条数
                total: 0,        // 总条数
            },
		}
	},
	watch: {
		/**
         * 计算表格序号列的宽度
		 * 监听总条数的变化
		 */
		"pagination.current": function (newVal, oldVal) {
			let num = (this.pagination.current * this.pagination.size + '').toString().length;
			this.tableIndexWidth = num*10+36;
		}
	},
    mounted () {
        window.addEventListener('resize', this.calcTableHeight, false);
        this.calcTableHeight();
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.calcTableHeight, false);
    },
	methods: {
		/**
		 * 自定义索引
		 */
		handleIndex(index){
			return ( this.pagination.current-1 ) * this.pagination.size + index + 1;
		},
        /**
         * 计算表格的高度
         */
        calcTableHeight(Height, dom){
            if( Height == 'auto' ){
                return false;
            }
            /**
             * 预定义变量
             */
            if( Height && typeof(Height) === 'number' ){
                this.tableMinuend = Height;
            }
            let $ = document.querySelector.bind(document);
            /**
             * 初始化设置table的高度
             */
            this.$nextTick( ()=>{
                let $dom = dom || $('.moc-table');
                if( $dom ){
                    this.tableHeight = $dom.offsetHeight - this.tableMinuend;

                    // /**
                    //  * 循环检测高度，每隔200毫秒从新获取 $dom 的高度
                    //  * 判断这个div的高度是否和table的高度相等，如果相等执行计数，如果连续runNumber次(每次1s钟)相等，则停止循环
                    //  * 如果不相等，则将div的高度 赋值给table，并从新开始计数
                    //  */
                    // let timesRun = 0,
                    //     runNumber= 200;  // 多少秒之后停止算
                    // let interval = setInterval( ()=>{
                    //     let containerH = $dom.clientHeight - this.tableMinuend;
                    //     if( this.tableHeight === containerH ){
                    //         timesRun++;
                    //         if( timesRun > runNumber*5 ){
                    //             clearInterval(interval);
                    //         }
                    //     }else{
                    //         timesRun = 0;
                    //         this.tableHeight = containerH;
                    //     }
                    // }, 100);
                }
            });
        }
	}
}
