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
                <el-menu-item index="/template/table">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">表格</span>
                </el-menu-item>
                <el-menu-item index="/template/form">
                    <i class="el-icon-s-claim"></i>
                    <span slot="title">表单</span>
                </el-menu-item>
                <el-menu-item index="/template/flex">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">flex 布局</span>
                </el-menu-item>
                <el-menu-item index="/template/standard">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">内部添加tabs</span>
                </el-menu-item>
                <el-menu-item index="/template/strategy">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">外部添加tabs</span>
                </el-menu-item>
    		</el-menu>
    	</el-aside>
        <el-main id="page-main">
            <div style="line-height: 38px; text-align: center; background-color: #FFFFFF; border-bottom: #CCCCCC 2px solid;">这是tags-views标签页</div>
            <transition  name="stage-left-right" mode="out-in">
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
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .stage-left-right-enter-active,
    .stage-left-right-leave-active {
        -webkit-transition: all .5s;
        transition: all .5s
    }
    .stage-left-right-enter {
        opacity: 0;
        -webkit-transform: translateX(-30px);
        transform: translateX(-30px)
    }
    .stage-left-right-leave-to {
        opacity: 0;
        -webkit-transform: translateX(30px);
        transform: translateX(30px)
    }
</style>
