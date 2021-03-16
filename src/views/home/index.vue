<template>
    <el-container id="page-bodier">
        <el-main id="page-content">
            <moc-container>
                <moc-section class="project-index-panel">
                    <el-table
                        :data="tableData"
                        row-key="id"
                        :height="360"
                        v-loading="tableLoading"
                        border
                        stripe
                        default-expand-all
                        lazy
                        :load="loadTable"
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    >
                        <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
                        <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                    </el-table>
                </moc-section>
                <moc-section class="project-index-panel">
                    <div class="echarts-item" style="height: 260px;"></div>
                </moc-section>
                <moc-section class="project-index-panel">
                    <div class="echarts-item" style="height: 260px;"></div>
                </moc-section>
                <moc-section class="project-index-panel">
                    <div class="echarts-item" style="height: 260px;"></div>
                </moc-section>
            </moc-container>
        </el-main>
    </el-container>
</template>
<script>
    /**
     * 混入对象
     */
    import common from '@/mixins/common.js'; // 通用  每个页面都需要引入

    export default {
        mixins: [common],
        components: {},
        data() {
            return {
                tableLoading: false,
                tableData: [
                    {
                        id: 1,
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 2,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                    {
                        id: 3,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        children: [
                            {
                                id: 31,
                                date: '2016-05-01',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1519 弄',
                                children: [
                                    {
                                        id: 311,
                                        date: '2016-05-01',
                                        name: '王小虎',
                                        address: '上海市普陀区金沙江路 1519 弄'
                                    }, {
                                        id: 312,
                                        date: '2016-05-01',
                                        name: '王小虎',
                                        address: '上海市普陀区金沙江路 1519 弄'
                                    }
                                ]
                            }, {
                                id: 32,
                                date: '2016-05-01',
                                name: '王小虎',
                                address: '上海市普陀区金沙江路 1519 弄'
                            }
                        ]
                    },
                    {
                        id: 4,
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄',
                        hasChildren: true
                    }
                ]
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            loadTable(treeData, treeNode, resolve) {
                console.log( treeData, treeNode )
                let data = [
                    {
                      id: 41,
                      date: '2016-05-03',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                      id: 42,
                      date: '2016-05-03',
                      name: '王小虎',
                      address: '上海市普陀区金沙江路 1519 弄'
                    }
                ];
                setTimeout(() => {
                   resolve(data)
                }, 1000)
            }
        }
    }
</script>
<style lang="scss">
    .project-index-panel {
        padding: 20px;
        background-color: #FFFFFF;
    }
</style>
