<template>
    <moc-container>
        <moc-section class="project-search">
            <el-form :model="search" :inline="true" label-width="120px" label-suffix="：">
                <el-form-item label="审批人">
                    <el-input v-model="groupId" clearable placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select
                        v-model="search.region"
                        placeholder="活动区域"
                        filterable
                        clearable
                    >
                        <el-option
                            v-for="(item, index) in options.region"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动区域">
                    <moc-all-select
                        v-model="search.region2"
                        :selectOptions="options.region"
                        filterable
                        clearable
                    >
                    </moc-all-select>
                </el-form-item>
                <el-form-item label="日期选择">
                    <el-date-picker
                        v-model="search.date"
                        placeholder="任意日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="时间段选择">
                    <el-date-picker
                        v-model="search.checkTime"
                        type="datetimerange"
                        value-format="yyyyMMddHHmmss"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="$global.datePickerOptions"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="project-search-btns">
                    <el-button type="primary" @click="onSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </moc-section>
        <moc-section class="project-dialog-table" bodier>
            <template #header>
                <p>class里面的project为项目名称</p>
            </template>
            <el-table
                :data="tableData"
                :height="tableHeight"
                v-loading="tableLoading"
                border
                stripe
            >
                <el-table-column label="序号" type="index" :index="handleIndex" :width="tableIndexWidth" align="center" class-name="neu-table-index"></el-table-column>
                <el-table-column prop="date" label="日期" width="218" :formatter="dateFormatter"></el-table-column>
                <el-table-column prop="name" label="姓名" width="186"></el-table-column>
                <el-table-column prop="address" label="地址" min-width="256"></el-table-column>
            </el-table>
            <template #footer>
                <p style="padding: 6px;">class里面的project为项目名称</p>
            </template>
        </moc-section>
        <moc-section class="project-pagination">
            <el-pagination
                :current-page.sync="pagination.current"
                :page-size.sync="pagination.size"
                @current-change="initTableData()"
                @size-change="initTableData()"
                :total="pagination.total"
                :layout="$global.paginationLayout"
                :page-sizes="$global.paginationSizes"
                background
            >
            </el-pagination>
        </moc-section>
    </moc-container>
</template>
<script>
    /**
     * 混入对象
     */
    // 页面通用的
    import common from '@/mixins/common.js';
    // 表格通用的
    import tableCommon from '@/mixins/tableCommon.js';
    // 表格数据格式化
    import tableFormatter from '@/mixins/tableFormatter.js';
    /**
     * 公共数据、方法的几种使用方式
     * 1.公共数据、方法写在mixins文件夹里，以mixin的形式使用
     * 2.公共数据写config文件夹中,用到的次数较多的，写在global.js里，全局引入
     * 3.公共方法写在常用的写在'assets/scripts/common.js'里
     * 4.不常用的写在utils里面，按需引入
     */
    export default {
        mixins:[ common, tableCommon, tableFormatter ],
        components: {},
        props: {
            groupId: {
                default: '1'
            }
        },
        data () {
            const item = {
				date: '20160502000000',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
                /**
                 * 搜索条件
                 */
                search: {
                    user: '',
                    region: '',
                    region2: '',
                    date: '',
                    datetime: '',
                    checkTime: '',
                    arr:[1,2,3],
                    obj:{
                        a:1,
                        b:22222
                    },
                },
                /**
                 * 表格
                 */
                calcTableHeightDom:".project-dialog-table",
				tableData: Array(20).fill(item),
                options:{
                    region:[
                        {
                            label: '黄金糕',
                            value: '选项1'
                        },
                        {
                            label: '双皮奶',
                            value: '选项2',
                            disabled: true
                        },
                        {
                            label: '蚵仔煎',
                            value: '选项3'
                        },
                        {
                            label: '蚵仔煎',
                            value: '选项4'
                        },
                        {
                            label: '蚵仔煎',
                            value: '选项5'
                        },
                        {
                            label: '蚵仔煎',
                            value: '选项6'
                        },
                        {
                            label: '蚵仔煎',
                            value: '选项7'
                        },
                        {
                            label: '蚵仔煎',
                            value: '选项8'
                        },
                        {
                            label: '蚵仔煎',
                            value: '选项9'
                        }
                    ]
                }
			}
        },
        created(){
            this.inintData();
        },
        mounted () {

        },
        methods:{
            /**
             * 初始化数据，在父页面调用
             */
            inintData(){
                console.log('初始化弹框数据', this.groupId)
            },
            /**
             * 搜索事件
             */
            onSearch(){
                this.pagination.current = 1;
                this.initTableData();
            },
            /**
             * 下拉框 options 的数据
             */
            initOptions(){
                /**
                 * 模拟请求数据
                 */
                this.initTableData();
            },
            /**
             * 初始化表格数据
             */
            initTableData() {
                let params = { ...this.$lodash.cloneDeep(this.search), ...this.pagination };
            },
        }
    }
</script>
