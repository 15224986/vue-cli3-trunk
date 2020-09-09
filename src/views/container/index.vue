<template>
    <el-container>
    	<el-aside width="220px">
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                router
            >
                <el-menu-item index="/anextUntil/login">
                    <span slot="title">登录</span>
                </el-menu-item>
                <el-menu-item index="/anextUntil/table">
                    <span slot="title">表格</span>
                </el-menu-item>
                <el-menu-item index="/anextUntil/form">
                    <span slot="title">表单</span>
                </el-menu-item>

    		</el-menu>
    	</el-aside>
        <el-main>
    		<router-view></router-view>
    	</el-main>
    </el-container>
</template>
<script>

    export default {
        mixins:[],
        components: {},
        data () {
			return {
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
