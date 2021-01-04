<template>
    <el-container id="page-container">
        <el-header id="page-header">
            <div class="moc-page-nav">
                <router-link :to="{path:'/index'}" class="moc-page-nav-item">首頁</router-link>
                <router-link :to="{path:'/anextUntil'}" class="moc-page-nav-item">数据管理</router-link>
                <router-link :to="{path:'/contianer'}" class="moc-page-nav-item">资产管理</router-link>
                <router-link :to="{path:'/content'}" class="moc-page-nav-item">安全管理</router-link>
            </div>
        </el-header>
        <router-view></router-view>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {}
        },
        created() {},
        mounted() {},
        methods: {}
    }
</script>
