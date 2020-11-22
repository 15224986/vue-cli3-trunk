<template>
    <moc-container horizontal>
        <moc-section class="moc-btns">
            <el-button @click="onSubmit" type="primary">立即创建</el-button>
            <el-button>取消</el-button>
        </moc-section>
        <moc-section class="moc-form" bodier>
            <moc-container>
                <moc-section class="moc-form" bodier>
                    <el-form ref="formHorizontal" :model="form" label-width="80px" class="moc-form-horizontal">
                        <el-form-item label="账号">
                            <el-input v-model="form.user"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item>
                    </el-form>
                </moc-section>
                <moc-section class="moc-btns">
                    <el-button @click="onSubmit" type="primary">立即创建</el-button>
                    <el-button>取消</el-button>
                </moc-section>
            </moc-container>
        </moc-section>
    </moc-container>
</template>
<script>
    /**
     * 混入对象
     */
    import common from '@/mixins/common.js';            // 通用  每个页面都需要引入

    export default {
        mixins:[ common ],
        components: {},
        data () {
			return {
                /**
                 * 表单
                 */
                form:{
                    user:'',
                    password:''
                }
			}
        },
        created(){

        },
        mounted(){

        },
        methods:{
            onSubmit(){
                let timestamp = new Date().getTime();
                let tokenExpire = timestamp;
                let tokenContent = 3600*1000+'851881';

                console.log(tokenExpire)
            }
        }
    }
</script>
<style lang="scss">


</style>
