<template>
    <article id="page-container">
        <moc-container id="page-content">
            <!-- <moc-section class="project-breadcrumb">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </moc-section> -->

            <moc-section class="project-form">
                <el-form ref="formHorizontal" :model="form" label-width="100px" class="project-form-horizontal" label-suffix="：">
                    <p class="project-form-title">典型表单</p>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="活动名称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="活动名称">
                                <el-select
                                    v-model="form.region"
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
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="活动名称">
                                <el-date-picker
                                    v-model="form.date"
                                    placeholder="任意日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="活动名称">
                                <el-date-picker
                                    v-model="form.checkTime"
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
                        </el-col>
                    </el-row>
                </el-form>
                <el-form ref="formInline" :model="form" label-width="100px" :inline="true" class="project-form-inline" label-suffix="：">
                    <p class="project-form-title">行内表单</p>
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动名称">
                        <el-select
                            v-model="form.region"
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
                    <el-form-item label="活动名称">
                        <el-date-picker
                            v-model="form.date"
                            placeholder="任意日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动名称">
                        <el-date-picker
                            v-model="form.checkTime"
                            type="daterange"
                            value-format="yyyyMMddHHmmss"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            :default-time="['00:00:00', '23:59:59']"
                            :picker-options="$global.datePickerOptions"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-form>

                <el-form ref="formHorizontal" :model="form" label-width="100px" class="project-form-horizontal" label-suffix="：">
                    <p class="project-form-title">作为撑起高度的填充物</p>
                    <el-form-item label="活动名称" v-for="item in 20" :key="item">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
            </moc-section>
            <moc-section class="project-btns">
                <el-button>取消</el-button>
                <el-button type="primary">立即创建</el-button>
            </moc-section>

        </moc-container>
    </article>
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
                conts: 2,
                form:{
                    name:'',
                    region:'',
                    date:'',
                    checkTime: '',
                },

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
                        }
                    ]
                },
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
