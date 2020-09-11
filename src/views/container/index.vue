<template>
    <el-container>
    	<el-aside id="page-sidebar" width="auto">
            <div class="neu-menu-tools">
                <a @click="toggleSideBar()" class="hamburger" href="javascript:;">
                    <i :class="sidebar.opened ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
                </a>
            </div>
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                :collapse="sidebar.opened"
                router
            >
                <el-menu-item index="/anextUntil/login">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">登录</span>
                </el-menu-item>
                <el-menu-item index="/anextUntil/table">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">表格</span>
                </el-menu-item>
                <el-menu-item index="/anextUntil/form">
                    <i class="el-icon-s-claim"></i>
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
    import {
        setSidebarOpened,
        getSidebarOpened
    } from '@/utils/auth'

    export default {
        mixins:[],
        components: {},
        data () {
			return {
                sidebar:{
                    opened: getSidebarOpened() ? getSidebarOpened() : true
                }
			}
        },
        created(){
        },
        mounted(){
        },
        methods:{
            toggleSideBar() {
                this.sidebar.opened = !this.sidebar.opened
                if (this.sidebar.opened) {
                   setSidebarOpened(true)
                } else {
                   setSidebarOpened(false)
                }
            }
        }
    }
</script>
