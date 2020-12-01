<template>
    <el-container id="page-container">
		<el-header id="page-header">
            <div class="moc-page-nav">
                <router-link :to="{path:'/'}">首页</router-link>
            </div>
        </el-header>
        <router-view></router-view>
    </el-container>
</template>
<script>
    export default {
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
