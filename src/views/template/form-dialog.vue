<template>
    <moc-container class="project-dialog-content">
        <moc-section class="project-form">
            <p>典型验证</p>
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="project-form-horizontal" label-suffix="：">
                <el-form-item
                    label="活动名称"
                    prop="name"
                    :rules="[
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]"
                >
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="活动区域"
                    prop="region"
                    :rules="{ required: true, message: '请选择活动区域', trigger: 'change' }"
                >
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间" required>
                    <el-col :span="11">
                        <el-form-item
                            prop="date1"
                            :rules="{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }"
                        >
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-form-item
                            prop="date2"
                            :rules="{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }"
                        >
                            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item
                    label="即时配送"
                    prop="delivery"
                >
                    <el-switch v-model="ruleForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item
                    label="活动性质"
                    prop="type"
                    :rules="{ required: true, message: '请至少选择一个活动性质', trigger: 'change' }"
                >
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item
                    label="特殊资源"
                    prop="resource"
                    :rules="{ required: true, message: '请选择活动资源', trigger: 'change' }"
                >
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    label="活动形式"
                    prop="desc"
                    :rules="{ required: true, message: '请填写活动形式', trigger: 'blur' }"
                >
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
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
</template>
<script>
    /**
     * 混入对象
     */
    import common from '@/mixins/common.js'; // 通用  每个页面都需要引入

    export default {
        mixins: [common],
        components: {},
        props: {},
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },

                /**
                 * 表单
                 */
                conts: 20,
                form: {
                    name: ''
                }
            }
        },
        created() {
            this.initOptions();
        },
        mounted() {
        },
        watch: {

        },
        methods: {
            /**
             * 确定、取消
             */
            onSubmit() {
                this.$emit('after-callback', true);
            },
            onCancel() {
                this.$emit('after-callback', false);
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            initOptions(){
                console.log('初始化固定数据')
            }
        }
    }
</script>
