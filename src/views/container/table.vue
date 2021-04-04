<template>
    <moc-container flex>
        <moc-section class="project-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
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
                    <el-button @click="testAssignCloneDeep()" type="primary">测试扩展运算符和复杂数据深层复制</el-button>
                    <el-button @click="tableDialogShow()" type="primary">table 弹出框</el-button>
                    <el-button @click="formDialogShow()" type="primary">form 弹出框</el-button>
                </el-form-item>
            </el-form>
        </moc-section>
        <moc-section id="project-table" bodier class="project-table">
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


        <!-- 弹出框 -->
        <el-dialog
            title="建议这样使用，下面的例子destroy-on-close属性无法使用"
            :visible.sync="tableDialogVisible"
            width="88%"
            top="50px"
            append-to-body
            v-mocDialogDrag
            custom-class="moc-dialog-fixed"
            destroy-on-close
        >
            <table-dialog :groupId="new Date().getTime()" @after-callback="dialogCallback" ref="dialogTableTemplate"></table-dialog>
            <template #footer>
                <el-button @click="$refs.dialogTableTemplate.onSubmit()">取 消</el-button>
                <el-button @click="$refs.dialogTableTemplate.onCancel()" type="primary">确 定</el-button>
            </template>
        </el-dialog>

        <form-dialog :visible="formDialogVisible" :groupId="new Date().getTime()" @after-callback="dialogCallback"></form-dialog>

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

    import {
        getTableData,
        getTable
    } from '@/api/container/table'

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
            tableDialog:()=>import('./table-dialog.vue'),
            formDialog:()=>import('./form-dialog.vue')
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
                    region: '2',
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
				tableData: Array(20).fill(item),
                /**
                 * 分页器
                 */
                pagination2: {
                    user: '',
                    region: '',
                    oages: undefined,
                    obj:{
                        b:2,
                        c:3
                    }
                },
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

                /**
                 * 弹出框
                 */
                tableDialogVisible: false,
                formDialogVisible: false
			}
        },
        created(){
            this.initOptions();
        },
        mounted () {

        },
        methods:{
            tableDialogShow(){
                this.tableDialogVisible = true;
                /**
                 * 通过调用子组件里面的方法实现初始化
                 */
                if (this.$refs.dialogTableTemplate !== undefined) {     // 判断是否存在
                    this.$refs.dialogTableTemplate.inintData()
                }
            },
            formDialogShow(){
                /**
                 * 通过监听visible字段的变化进行初始化
                 */
                this.formDialogVisible = true;
            },
            dialogCallback(type){
                this.tableDialogVisible = false;
                this.formDialogVisible = false;
            },



            testAssignCloneDeep(){
                /**
                 * assign 和 展开运算符(...) 属于浅层  不会处理原型链上的属性，也不会合并相同的属性，而是用后面的属性值覆盖前面的属性值
                 * merge 遇到相同属性名的时候，如果属性值是纯对象或集合的时候，会合并属性值
                 */
                // let newObj = { ...{ a:1 }, ...{ b: { c: 2, d: 3 } }, ...{ b: { e: 4 } } }
                // let newObj = this.$lodash.assign({ a:1 }, { b: { c: 2, d: 3 } }, { b:{e: 4}} )
                let newObj = this.$lodash.merge({ a:1 },{b:{c:2,d:3}},{b:{e:4}})
                console.log(newObj)

                let params = this.$lodash.merge(this.$lodash.cloneDeep(this.search), this.pagination, this.pagination2);
                delete params.total;
                params.arr.push('a','b','c');
                console.log( params, this.search );
            },
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
                /**
                 * 模拟请求数据
                 */
                this.$http.post(`/mock/tableData`, {'api':123}, {baseURL:''}).then( res => {
                    console.log(res)
                });
                this.$http.get(`/mock/table?api=123`, {}, {baseURL:''}).then( res => {
                    console.log(res)
                });

                getTableData().then( response => {
                    console.log(response)
                    getTable({'api':123}).then( response => {
                        console.log(response)

                        this.options.like = [
                            {
                                label: '篮球',
                                value: 'basketball'
                            },
                            {
                                label: '足球',
                                value: 'football',
                                disabled: true
                            }
                        ]
                    });
                });

            },
            /**
             * 初始化表格数据
             */
            initTableData() {
                let params = { ...this.$lodash.cloneDeep(this.search), ...this.pagination };
                // this.$http.get(`/mock/tableData`, params).then( res => {
                //     this.tableData = res.table;
                //     this.pagination = res.pagination;
                // })
                // .catch( error => {
                //     this.$message(error);
                // });
            },
        }
    }
</script>
