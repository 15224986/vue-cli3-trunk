
<template>
    <article id="page-container">
        <moc-container v-if="shwoPage==='page'" flex horizontal>
            <moc-section class="project-group-tree">
                <my-group-tree
                    :groupTree="groupTree"
                    title="分组"
                    ref="myGroupTree"
                    treeType="tag"
                    showHeader
                    nodeTools
                    search
                    appendRoot
                    :props="defaultProps"
                    :default-expanded-keys="['root']"
                    @tree-node-click="treeNodeClick"
                    @tree-node-deleted="treeNodeDeleted"
                    @tree-node-rename="treeNodeRename"
                    @add-append-node="addAppendNode"
                ></my-group-tree>
            </moc-section>
            <moc-container id="page-content" flex>
                <moc-section class="project-toolbar">
                    <el-button @click="onAdd" type="primary" plain>添加人员</el-button>
                    <el-button @click="onRemove" type="primary" plain>删除人员</el-button>
                    <el-button type="primary" plain>导入人员</el-button>
                    <el-button type="primary" plain>请假人员</el-button>
                </moc-section>
                <moc-section class="project-search">
                    <el-form :model="search" :inline="true" label-width="90px" label-suffix="：" class="content-width-160">
                        <el-form-item label="姓名">
                            <el-input v-model="search.name" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select
                                v-model="search.sex"
                                placeholder="请选择"
                                filterable
                                clearable
                            >
                                <el-option
                                    v-for="(item, index) in options.sex"
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年龄" class="content-width-90">
                            <el-input v-model="search.startAge" clearable placeholder="请输入"></el-input>
                            <span class="project-form-label-static">至</span>
                            <el-input v-model="search.endAge" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="出生时间">
                            <el-date-picker
                                v-model="search.date"
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
                        <el-form-item label="爱好">
                            <moc-all-select
                                v-model="search.like"
                                :selectOptions="options.like"
                                filterable
                                clearable
                                collapseTags
                            >
                            </moc-all-select>
                        </el-form-item>
                        <el-form-item class="project-search-btns">
                            <el-button @click="onSearch()" type="primary">查询</el-button>
                        </el-form-item>
                    </el-form>
                </moc-section>
                <moc-section id="project-table" class="project-table" bodier>
                    <el-table
                        :data="tableData"
                        :height="tableHeight"

                        border
                        stripe
                        @selection-change="handleSelectedRows"
                    >
                        <el-table-column label="序号" type="index" :index="handleIndex" :width="tableIndexWidth" align="center" class-name="neu-table-index"></el-table-column>
                        <el-table-column type="selection" width="50" align="center"></el-table-column>
                        <el-table-column label="姓名" prop="name" width="100"></el-table-column>
                        <el-table-column label="性别" prop="sex" width="56"></el-table-column>
                        <el-table-column label="年龄" prop="age" width="56"></el-table-column>
                        <el-table-column label="出生时间" prop="date" width="168" :formatter="dateFormatter"></el-table-column>
                        <el-table-column label="爱好" prop="like" min-width="186" :formatter="(row, column, cellValue) => selectFormatter(cellValue, options.like)"></el-table-column>
                        <el-table-column label="住址" prop="address" min-width="186"></el-table-column>
                        <el-table-column label="操作" width="178">
                            <template slot-scope="scope">
                                <el-link @click="onModifyAddress(scope.row)" type="primary">修改住址</el-link>
                                <el-divider direction="vertical"></el-divider>
                                <el-link @click="onDelTableRulesRow(scope.$index)" type="primary">查看详情</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </moc-section>
                <moc-section class="project-pagination">
                    <el-pagination
                        :current-page.sync="search.current"
                        :page-size.sync="search.size"
                        @current-change="initTableData()"
                        @size-change="initTableData()"
                        :total="tableTotal"
                        :layout="$global.paginationLayout"
                        :page-sizes="$global.paginationSizes"
                        background
                    >
                    </el-pagination>
                </moc-section>
            </moc-container>
        </moc-container>
        <add-form v-if="shwoPage==='addForm'" @callback="addFormCallback"></add-form>

        <el-dialog
            title="修改住址"
            :visible.sync="modifyDialogVisible"
            width="560px"
            top="50px"
            append-to-body
            v-mocDialogDrag
        >
            <modify-dialog :option="activeRow" @callback="modifyDialogCallback" ref="modifyDialog"></modify-dialog>
            <template #footer>
                <el-button @click="$refs.modifyDialog.onCancel()">取 消</el-button>
                <el-button @click="$refs.modifyDialog.onSubmit('formRef')" type="primary">确 定</el-button>
            </template>
        </el-dialog>
    </article>
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
            myGroupTree: () => import("@/views/components/group-tree/main.vue"),
            addForm:()=>import('./flex-add-form.vue'),
            modifyDialog:()=>import('./flex-modify-dialog.vue')
        },
        data () {
			return {
                /**
                 * 显示页面
                 */
                shwoPage: 'page',


                /**
                 * 左侧菜单树
                 */
                defaultProps: {
                    id: 'value',
                    children: 'childs',
                    label: 'name'
                },
                groupTree: [
                    {
                        value: 'root',
                        name: '全部',
                        childs:[
                            {
                                value: '11',
                                name: '111'
                            },
                            {
                                value: '22',
                                name: '222'
                            },
                            {
                                value: '33',
                                name: '333'
                            }
                        ]
                    }
                ],

                /**
                 * 搜索条件
                 */
                search: {
                    name: '',
                    sex: '',
                    startAge: '',
                    endAge: '',
                    date: [],
                    like: '',
                    // 分页器
                    current: 1,             // 当前页
                    size: 20                // 每页显示条数
                },

                /**
                 * 表格
                 */
                tableData: [],                              // 表格数据
                selectedRows: [],                           // 多选框选中的行
                activeRow: '',                              // 正在操作的行

                /**
                 * 修改弹框
                 */
                modifyDialogVisible: false,

                /**
                 * 下拉、多选、单选 等数据
                 */
                options:{
                    sex:[],
                    like:[]
                },
			}
        },
        created(){

        },
        mounted () {
            this.initOptions()
        },
        methods:{

            /**
             * 左侧树
             */
            treeNodeClick(data) {
                if(data.value === "root"){
                    this.search.groupId = 0

                }else{
                    if( !data.childs || data.childs.length==0 ){
                        this.search.groupId = data.value
                    }
                }
            },
            treeNodeDeleted(data) {
                this.$message.success('删除成功');
                this.$refs.myGroupTree.removeTreeNode(data)

                // this.$http.post('/business/delGroupList', data).then( res => {
                //     this.$message.success('删除成功');
                //     this.$refs.myGroupTree.removeTreeNode(data)
                // });
            },
            treeNodeRename(data, val){
                this.$message.success('改名成功');
                this.$refs.myGroupTree.renameTreeNode(data,val)
            },
            addAppendNode(data) {
                // console.log(data)
                this.$message.success('添加成功');


                // this.$http.post('/business/addGroupList', data).then( res => {
                //     this.$message.success('添加成功');
                //     this.initGroupList() //重新获取树的数据
                // });

            },


            /**
             * 新增、修改、删除
             */
            onAdd(){
                this.shwoPage='addForm'
            },
            addFormCallback(){
                this.shwoPage='page'
            },
            onModifyAddress(row){
                this.activeRow = this.$lodash.cloneDeep(row)
                this.modifyDialogVisible = true
            },
            modifyDialogCallback(type){
                if(type){
                    this.initTableData()
                }
                this.activeRow = ''
                this.modifyDialogVisible = false
            },
            onRemove(){
                // console.log(this.selectedRows)
                if( this.selectedRows.length > 0 ){
                    var params = {
                        id: []
                    };
                    this.selectedRows.forEach( (el)=>{
                        params.id.push( el.id );
                    } );

                    this.$confirm('此操作将永久删除, 是否继续?', '系统提示', {
                        type: 'warning'
                    }).then(() => {
                       this.$message.success('删除成功');
                    }).catch(() => {

                    });
                }else{
                    this.$alert('请至少选择一条记录进行删除', '系统提示', {
                        callback: action => {}
                    });
                }
            },

            /**
             * 查询事件
             */
            onSearch(){
                this.initTableData()
            },
            /**
             * 表格选中事件
             */
            handleSelectedRows(rows){
                this.selectedRows = rows;
            },



            /**
             * 初始化
             */
            initOptions(){
                this.options = {
                    sex:[
                        {
                            label: '男',
                            value: 1
                        },
                        {
                            label: '女',
                            value: 2
                        }
                    ],
                    like:[
                        {
                            label: '足球',
                            value: 'football'
                        },
                        {
                            label: '篮球',
                            value: 'basketball'
                        }
                    ]
                };
                this.initTableData()
            },
            /**
             * 初始化表格数据
             */
            initTableData(){
                for (let index = 0; index < 20; index++) {
                    let obj = {
                        id: index+515,
                        date: '20160502000000',
                        name: '王小虎',
                        age: 31,
                        sex: '男',
                        like: 'football',
                        address: '上海市普陀区金沙江路 1518 弄'
                    };
                    this.tableData.push(obj)
                }

                // this.$http.post('/business/querySchemaList', this.search).then( res => {
                //     this.tableData = res.data.list;
                //     this.tableTotal = res.data.size;
                // });
            },
        }
    }
</script>
