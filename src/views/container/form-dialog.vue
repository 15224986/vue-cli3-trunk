<template>
    <el-dialog
        title="系统提示"
        :visible="visible"
        width="960px"
        fullscreen
        @close="onCancel()"
    >
        <moc-container>
            <moc-section class="project-form">
                <p>典型表单</p>
                <el-form ref="formHorizontal" :model="form" label-width="100px" class="project-form-horizontal" label-suffix="：">
                    <el-form-item v-for="item in conts" :key="item" label="活动名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <p>行内表单</p>
                <el-form ref="formInline" :model="form" label-width="100px" :inline="true" class="project-form-inline" label-suffix="：">
                    <el-form-item v-for="item in conts" :key="item" label="活动名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
                <p>查看详情</p>
                <el-form ref="formInline" :model="form" label-width="100px" :inline="true" class="project-form-details content-width-180" label-suffix="：">
                    <el-form-item v-for="item in conts" :key="item" label="活动名称">
                        <p class="project-form-text">{{form.name}}</p>
                    </el-form-item>
                </el-form>
            </moc-section>
        </moc-container>
        <template #footer>
            <el-button @click="onSubmit()">取 消</el-button>
            <el-button type="primary" @click="onCancel()">确 定</el-button>
        </template>
    </el-dialog>

</template>
<script>
    /**
     * 混入对象
     */
    import common from '@/mixins/common.js';            // 通用  每个页面都需要引入

    export default {
        mixins:[ common ],
        components: {},
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data () {
			return {
                /**
                 * 表单
                 */
                conts: 20,
                form:{
                    name:''
                }
			}
        },
        created(){

        },
        mounted(){

        },
        watch:{
            visible:{
                immediate: false,
                handler(newValue, oldValue){
                    console.log( newValue )
                }
            },
            groupId:(newValue, oldValue)=>{
                console.log( newValue )
            }
        },
        methods:{
            /**
             * 确定、取消
             */
            onSubmit(){
                this.$emit('after-callback', true);
            },
            onCancel(){
                this.$emit('after-callback', false);
            },
        }
    }
</script>
