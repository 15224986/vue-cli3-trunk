export default {
    components: {
        tableColumnConfig:()=>import('@/views/container/table-column-config.vue'),
    },
	data() {
		return {
            tableColumnConfigShow: [],
		}
	},
    created(){
        // 发送ajax获取数据
        this.initShowColumn();
    },
	computed: {
	    /**
	     * 计算列是否显示
	     */
	    setTableColumn() {
	        return function (prop) {
	            return this.tableColumnConfigShow.includes( prop );
	        }
	    }
	},
    methods:{
        initShowColumn(){
            this.tableColumnConfigShow = ["name", "address"];
        }
    }
}
