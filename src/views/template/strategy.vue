<template>
    <article id="page-container">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="moc-container-tabs" id="page-content" type="border-card">
            <el-tab-pane label="用户管理" name="first">
                <strategy-first></strategy-first>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">
                <strategy-panel v-if="activeName=='second'" title="配置管理" text="每次进入需要重新 初始化"></strategy-panel>
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="third">
                <strategy-panel v-if="third" title="角色管理" text="不需要重新 初始化"></strategy-panel>
            </el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">
                <strategy-panel v-if="fourth" title="定时任务补偿" text="不需要重新 初始化"></strategy-panel>
            </el-tab-pane>
        </el-tabs>
    </article>
</template>
<script>

    export default {
        components: {
            strategyFirst: () => import('./strategy-first.vue'),
            strategyPanel: () => import('./strategy-panel.vue')
        },
        data () {
			return {
                activeName:'first',

                // 不需要重置
                third: false,
                fourth: false
			}
        },
        created(){

        },
        mounted () {

        },
        methods:{
            handleClick(tab, event) {
                this.activeName = tab.name

                if( tab.name === 'third' ){
                    this.third = true;
                }else if( tab.name === 'fourth' ){
                    this.fourth = true;
                }
            }
        }
    }
</script>
