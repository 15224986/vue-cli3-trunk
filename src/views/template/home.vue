<template>
    <el-container id="page-bodier">
        <el-main id="page-content">
            <moc-container>

                <moc-section>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </moc-section>

                <moc-section class="project-index-panel">
                    <el-table
                        :data="tableData"
                        row-key="id"
                        :height="300"
                        v-loading="tableLoading"
                        border
                        stripe
                        default-expand-all
                        lazy
                        :load="loadTable"
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    >
                        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                        <el-table-column type="selection" width="55" align="center"></el-table-column>
                        <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
                        <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                    </el-table>
                </moc-section>
                <moc-section class="project-index-panel">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane v-for="item in tabData" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
                    </el-tabs>
                </moc-section>
                <moc-section class="project-index-panel">
                    <div class="echarts-item" style="height: 560px;">
                        <p id="showText"></p>
                        <div id="box1"></div>
                        <div id="box2"></div>
                    </div>
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
                        date: '2021-03-16 18:50:00',
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
                ],



                activeName: 'first',
                tabData:[
                    {
                        label: '用户管理111',
                        name: '111',
                        path: 'system/level/111'
                    },
                    {
                        label: '用户管理222',
                        name: '222',
                        path: 'system/level/222'
                    },
                    {
                        label: '用户管理333',
                        name: '333',
                        path: 'system/level/333'
                    },
                    {
                        label: '用户管理444',
                        name: '444',
                        path: 'system/level/444'
                    },
                    {
                        label: '用户管理555',
                        name: '555',
                        path: 'system/level/555'
                    },
                    {
                        label: '用户管理666',
                        name: '666',
                        path: 'system/level/666'
                    },
                    {
                        label: '用户管理777',
                        name: '777',
                        path: 'system/level/777'
                    },
                    {
                        label: '用户管理888',
                        name: '888',
                        path: 'system/level/888'
                    },
                    {
                        label: '用户管理999',
                        name: '999',
                        path: 'system/level/999'
                    },
                    {
                        label: '用户管理000',
                        name: '000',
                        path: 'system/level/000'
                    }
                ]
            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(()=>{
                let box1 = document.querySelector('#box1'),
                	box2 = document.querySelector('#box2'),
                	type = this.getOverlap(box1, box2),
                	numb = this.getRandom(0, 100);
                if(type){
                	document.querySelector('#showText').innerHTML ="有重叠：" + numb
                }else{
                	document.querySelector('#showText').innerHTML ="无重叠：" + numb
                }
            })
        },
        methods: {
            handleClick(tab, event){
                console.log(tab, event);
            },

            /**
             * 生成随机正整数
             */
            getRandom(min, max) {
            	return Math.floor(Math.random() * (max - min)) + min;
            },
            /**
             * 检测是否有重叠
             */
            getOverlap(box1, box2){
            	/**
            	 * 判断box2是否碰撞box1
            	 * 分别计算box1和box2的 的距离
            	 * 比较上一步计算出来的值
            	 */
            	var b1Left = box1.offsetLeft,
            		b1Right = b1Left + box1.offsetWidth,
            		b1Top = box1.offsetTop,
            		b1Bottom = b1Top + box1.offsetHeight,
            		b2Left = box2.offsetLeft,
            		b2Right = b2Left + box2.offsetWidth,
            		b2Top = box2.offsetTop,
            		b2Bottom = b2Top + box2.offsetHeight;
            	if (b2Right < b1Left || b1Right < b2Left || b2Bottom < b1Top || b1Bottom < b2Top) {
            		// 无重叠
            		return false
            	} else {
            		// 有重叠
            		return true
            	}
            },

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
    .echarts-item{
        position: relative;
    }
    #showText{
    	text-align: center;
    	font-size: 24px;
    	color: #FF0000;
    }
    #box1 {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 200px;
        top: 350px;
        background: lightcoral;
    }
    #box2 {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 150px;
        top: 100px;
        background: lightgreen;
    }
</style>
