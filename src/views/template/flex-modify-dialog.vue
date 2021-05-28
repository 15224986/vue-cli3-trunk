<template>
    <moc-container auto-height class="project-dialog-content">
        <moc-section>
            <el-form :model="newForm" ref="formRef" label-width="100px" label-suffix="：" class="project-form-horizontal">
                <el-form-item label="姓名">
                    <p class="project-form-text">{{newForm.name}}</p>
                </el-form-item>
                <el-form-item label="住址">
                    <el-input v-model="newForm.address" type="textarea" :rows="4"></el-input>
                </el-form-item>
            </el-form>
        </moc-section>
    </moc-container>
</template>
<script>

    /**
     * 混入对象
     */
    // 页面通用的
    import common from '@/mixins/common.js';


    export default {
        mixins:[ common ],
        components: {

        },
        props:{
            option:''
        },
        data () {
			return {
                newForm: this.option
			}
        },
        created(){

        },
        mounted () {

        },
        methods:{
            /**
             * 确定、取消
             */
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$message.success('删除成功');
                        // ajax 请求成功后
                        this.$emit('callback', true);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onCancel() {
                console.log(111)

                this.$emit('callback', false);
            },
        }
    }
</script>
