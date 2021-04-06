<template>
    <moc-container id="page-content" flex>
        <moc-section class="project-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </moc-section>
        <moc-section class="project-xxx">
            <div class="xxx" style="height: 66px; background-color: #FFFFFF;"></div>
        </moc-section>
        <moc-section class="project-xxx" bodier>
            <moc-container flex>
                <moc-section class="moc-tabs">
                    <el-tabs v-model="activeName" type="border-card" class="m-b-md" style="background-color: #FFFFFF;">
                        <el-tab-pane label="用户管理" name="first" style="height: 100px;">
                            <moc-container flex horizontal>
                                <p style="background-color: #F2F2F2; line-height: 100px; padding:0 30px; font-size: 20px;">155555555</p>
                                <moc-section bodier>
                                    <h2 style="text-align: center; line-height: 100px;background-color: #81909E; color: #FFFFFF;">bodier bodier bodier bodier bodier</h2>
                                </moc-section>
                                <p style="background-color: #F2F2F2; line-height: 100px; padding:0 30px; font-size: 20px;">155555555</p>
                            </moc-container>
                        </el-tab-pane>
                        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </moc-section>
                <moc-section id="project-table" bodier>
                    <el-table
                        :data="tableData"
                        :height="tableHeight"
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
                </moc-section>
            </moc-container>
        </moc-section>
        <moc-section class="project-xxx">
            <div class="xxx" style="height: 66px; background-color: #FFFFFF;"></div>
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
                activeName: 'first',

                /**
                 * 表格
                 */
                tableData: Array(20).fill(item),
                options:{
                    like:[]
                },
			}
        },
        created(){

        },
        mounted () {

        },
        methods:{

        }
    }
</script>
