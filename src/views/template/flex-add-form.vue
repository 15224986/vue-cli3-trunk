<template>
    <moc-container id="page-content" flex>
        <moc-section class="project-page-title">
            <a @click="onCancel()" href="javascript:;">
                <i class="el-icon-arrow-left"></i> 添加人员
            </a>
        </moc-section>
        <moc-section class="project-form" bodier>
            <el-form :model="newForm" ref="newForm" label-width="100px" label-suffix="：" class="project-form-horizontal project-form-page">
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="姓名">
                            <el-input v-model="newForm.name" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="性别">
                            <el-select
                                v-model="newForm.sex"
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
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="年龄">
                            <el-input v-model="newForm.age" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="出生时间">
                            <el-date-picker
                                v-model="newForm.date"
                                value-format="yyyyMMddHHmmss"
                                type="datetime"
                                placeholder="任意时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="爱好">
                            <el-input v-model="newForm.like" type="textarea" :rows="14"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="住址">
                            <el-input v-model="newForm.address" type="textarea" :rows="4"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </moc-section>
        <moc-section class="project-btns">
            <el-button @click="onCancel()">取消</el-button>
            <el-button @click="onSubmit('newForm')" type="primary">确定</el-button>
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

        data () {
			return {
                newForm: {
                    name: '王小虎',
                    age: 31,
                    sex: '男',
                    date: '20160502000000',
                    like: 'football',
                    address: '上海市普陀区金沙江路 1518 弄'
                },

                /**
                 * 下拉、多选、单选 等数据
                 */
                options:{
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
                },
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
                        this.$message.success('添加成功');
                        // ajax 请求成功后
                        this.$emit('callback', true);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onCancel() {
                this.$emit('callback', false);
            },
        }
    }
</script>
