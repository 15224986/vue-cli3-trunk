<template>
    <div class="moc-table-column-config-btn">
        <el-button @click="dialogShow()" type="primary" plain>列显示配置</el-button>
        <el-dialog
            title="配置显示列"
            :visible.sync="isShow"
            width="660px"
            top="50px"
            append-to-body
            v-mocDialogDrag
        >
           <moc-container>
               <moc-section class="moc-table-column-config">
                   <el-form :inline="true" :model="form" ref="editRef" v-loading="loading">
                       <div class="neu-form">
                           <el-form-item label="" class="m-r-0">
                               <el-transfer
                                   v-model="form.show"
                                   :data="tableColumnAll"
                                   :titles="['隐藏列', '显示列']"
                               >
                               </el-transfer>
                           </el-form-item>
                       </div>
                   </el-form>
               </moc-section>
           </moc-container>
           <template #footer>
               <el-button @click="onCancel()">取 消</el-button>
               <el-button @click="onSubmit()" type="primary">确 定</el-button>
           </template>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        props:{
            pageType: [String, Number], // 页面类型
            value:{
                type: Array,
                default: () => []
            },
            tableColumnAll:{
                type: Array,
                default: () => []
            }
        },
        data () {
			return {
                loading: false,
                isShow: false,
                form:{
                    // 展示列
                    show: this.value
                }
			}
        },
        created(){

        },
        mounted () {

        },
        methods:{
            dialogShow(){
                this.isShow = true
            },
            onSubmit(){
                this.$emit('input', this.form.show);
                this.isShow = false
            },
            onCancel(){
                this.isShow = false
            }
        }
    }
</script>
<style>
    .moc-table-column-config-btn{
        display: inline-block;
    }
    .el-button+.moc-table-column-config-btn {
        margin-left: 10px;
    }
</style>
