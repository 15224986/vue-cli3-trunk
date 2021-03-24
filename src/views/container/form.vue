<template>
    <moc-container>
        <moc-section class="project-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
        </moc-section>

        <moc-section class="project-form">
            <p>典型表单</p>
            <el-form ref="formHorizontal" :model="form" label-width="80px" class="moc-form-horizontal">
                <el-form-item v-for="item in conts" :key="item" label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <p>行内表单</p>
            <el-form ref="formInline" :model="form" label-width="80px" :inline="true" class="moc-form-inline">
                <el-form-item v-for="item in conts" :key="item" label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
        </moc-section>
        <moc-section class="project-btns">
            <el-button>取消</el-button>
            <el-button type="primary">立即创建</el-button>
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
        methods:{

        }
    }
</script>
<style lang="scss">


</style>
