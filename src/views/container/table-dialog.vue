<template>
    <moc-container flex>
        <moc-section class="project-search">
            <dl class="m-b-lg">
                <dt>1.使用destroy-on-close的前提条件是传入dialog的必须是组件，而不是元素</dt>
                <dd>1.1 element是基于vue的UI库，vue中通过key作为组件的唯一标识，一旦key更新，就会触发组件的更新，而element就是利用这个原理，定义destroy-on-close属性的</dd>
                <dd>1.2 我们就知道了为什么一定要往dialog中传入组件，destroy-on-close才会生效，因为key是触发组件更新的，元素则不行。</dd>
                <dt>2.使用destroy-on-close后避免在组件的生命周期函数中发请求</dt>
                <dd>这里指的是数据基本不会变的请求，打开页面只用发起一次就够了，如果你在使用了destroy-on-close的组件中的created中发起请求，当你关闭弹窗时，由于会触发key的更新，所以此时也会发请求，造成不必要的资源浪费。。</dd>
                <dt>3.替代方案</dt>
                <dd>3.1 使用destroy-on-close的情况下，对于数据量不会变的请求，放到dialog同级的页面发请求，再传值到dialog的组件</dd>
                <dd>3.2 使用v-if代替destroy-on-close</dd>
                <dt>总结</dt>
                <dd>1.能不用destroy-on-close就不用，使用v-if替代</dd>
                <dd>2.一定要用，注意传入的是组件，并且注意dialog的关闭事件，会触发组件的生命周期。</dd>
            </dl>
            <el-form :model="search" :inline="true" label-width="120px" label-suffix="：">
                <el-form-item label="审批人">
                    <el-input v-model="search.user" clearable placeholder="审批人"></el-input>
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
        <moc-section id="project-dialog-table" bodier class="project-table">
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
                <el-table-column prop="date" label="日期" width="218" :formatter="dateFormatter"></el-table-column>
                <el-table-column prop="name" label="姓名" width="186"></el-table-column>
                <el-table-column prop="address" label="地址" min-width="256"></el-table-column>
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
                type: [ Boolean, String, Number],
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
                calcTableHeightDom:"#project-dialog-table",
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
            this.initOptions();
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
                const item = {
                	date: '20160502000000',
                	name: '王小虎',
                	address: '上海市普陀区金沙江路 1518 弄'
                };
                let arr = Array(20).fill(item);
                this.tableData = this.tableData.concat(arr)
            },
            /**
             * 搜索事件
             */
            onSearch(){
                this.pagination.current = 1;
                this.initTableData();
            },

            /**
             * 确定、取消
             */
            onSubmit(){
                this.$emit('after-callback', true);
            },
            onCancel(){
                this.$emit('after-callback', true);
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

                this.pagination.total = this.tableData.length * 2
            },
        }
    }
</script>
<style scoped>
    dt{
        font-weight: 700;
        color: #000000;
    }
    dd + dt{
        margin-top: 10px;
    }
</style>
