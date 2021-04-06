<template>
    <el-tabs class="moc-container-tabs" id="page-content" type="border-card">
        <el-tab-pane label="用户管理">
            <moc-container flex>
                <moc-section class="project-toolbar m-t-sm">
                    <el-button type="primary" plain>导入策略集</el-button>
                    <el-button type="primary" plain>导入文件样式</el-button>
                    <el-button type="primary" plain>添加策略集</el-button>
                    <el-button type="primary" plain>删除策略集</el-button>
                    <el-button type="primary" plain>下发策略集</el-button>
                </moc-section>
                <moc-section class="project-search">
                    <el-form :model="search" :inline="true" label-width="120px" label-suffix="：">
                        <el-form-item label="输入框">
                            <el-input v-model="search.user" clearable placeholder="审批人"></el-input>
                        </el-form-item>
                        <el-form-item label="单选下拉">
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
                        <el-form-item label="多选下拉">
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
                            <el-button @click="onSearch()" type="primary">查询</el-button>
                        </el-form-item>
                    </el-form>
                </moc-section>
                <moc-section id="project-table" bodier class="project-table" style="margin: 0 10px;">
                    <!-- <template #header>
                        <p>class里面的project为项目名称</p>
                    </template> -->
                    <el-table
                        :data="tableData"
                        :height="tableHeight"
                        v-loading="tableLoading"
                        border
                        stripe
                    >
                        <el-table-column label="序号" type="index" :index="handleIndex" :width="tableIndexWidth" align="center" class-name="neu-table-index"></el-table-column>
                        <el-table-column label="日期" prop="date" width="218" :formatter="dateFormatter"></el-table-column>
                        <el-table-column label="姓名" prop="name" width="186"></el-table-column>
                        <el-table-column label="性别" prop="sex" width="112"></el-table-column>
                        <el-table-column label="年龄" prop="age" width="112"></el-table-column>
                        <el-table-column label="爱好" prop="like" width="112" :formatter="(row, column, cellValue) => selectFormatter(cellValue, options.like)"></el-table-column>
                        <el-table-column label="地址" prop="address" min-width="256"></el-table-column>
                    </el-table>
                    <!-- <template #footer>
                        <p style="padding: 6px;">class里面的project为项目名称</p>
                    </template> -->
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
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>

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
        components: {

        },
        data () {
            const item = {
				date: '20160502000000',
				name: '王小虎',
				age: 31,
				sex: '男',
				like: 'football',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
                /**
                 * 搜索条件
                 */
                search: {
                    user: '1',
                    region: '选项2',
                    region2: '',
                    date: '',
                    datetime: '',
                    checkTime: ''
                },
                /**
                 * 表格
                 */
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
                        }
                    ],
                    like:[]
                },

			}
        },
        created(){
            // this.initOptions();
        },
        mounted () {

        },
        methods:{
            /**
             * 搜索事件
             */
            onSearch(){
                console.log( this.search.region2 );
                this.pagination.current = 1;
                this.initTableData();
            },
            /**
             * 下拉框 options 的数据
             */
            initOptions(){
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
