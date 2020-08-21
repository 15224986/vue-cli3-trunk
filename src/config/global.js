const Global = {
    /**
     * 分线器配置 相关变量
     */
    paginationSizes: [10, 20, 30, 40, 50],
    paginationLayout: 'total, sizes, prev, pager, next, jumper',
    /**
     * 时间插件的右侧按钮
     */
    datePickerOptions: {
        shortcuts: [{
            text: '最近一周',
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '最近一个月',
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '最近三个月',
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
            }
        }]
    },
};

export default Global;
