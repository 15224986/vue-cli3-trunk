<template>
    <el-container id="app">
        <el-header id="page-header">
            <div class="moc-page-logo">XX管理系统</div>
            <div class="moc-page-nav">
                <router-link :to="{path:'/home'}" class="moc-page-nav-item">首頁</router-link>
                <router-link :to="{path:'/contianer'}" class="moc-page-nav-item">基础页面</router-link>
                <router-link :to="{path:'/assets'}" class="moc-page-nav-item">资产管理</router-link>
                <router-link :to="{path:'/safety'}" class="moc-page-nav-item">安全管理</router-link>
            </div>
        </el-header>
        <router-view></router-view>
    </el-container>
</template>
<script>
    // 加载资源
    export default {
        name: 'App'
    }
</script>
