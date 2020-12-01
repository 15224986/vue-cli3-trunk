<template>
    <el-container id="page-bodier">
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
        <el-main id="page-content">
            <transition  name="fade-transform" mode="out-in">
                <router-view></router-view>
            </transition>
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
                    opened: getSidebarOpened()
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
                setSidebarOpened(this.sidebar.opened)
            }
        }
    }
</script>
<style lang="scss">
    #page-content{
        overflow: hidden
    }
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .fade-transform-enter-active,.fade-transform-leave-active {
        -webkit-transition: all .5s;
        transition: all .5s
    }
    .fade-transform-enter {
        opacity: 0;
        -webkit-transform: translateX(-30px);
        transform: translateX(-30px)
    }
    .fade-transform-leave-to {
        opacity: 0;
        -webkit-transform: translateX(30px);
        transform: translateX(30px)
    }
</style>
