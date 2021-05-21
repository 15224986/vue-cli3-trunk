<template>
    <moc-container auto-height class="project-dialog-content">
        <moc-section>
            <div style="height: 120px; background-color: #FFFFFF;">
                111111111111111111111
            </div>
        </moc-section>
        <moc-section>
            <div style="height: 120px; background-color: #FFFFFF;">
                12222222222222222
            </div>
        </moc-section>
        <moc-section>
            <div style="height: 120px; background-color: #FFFFFF;">
                333333333333333333333
            </div>
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
        components: {},
        props: {

        },
        data () {
			return {

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
            onSubmit(){
                this.$emit('after-callback', true);
            },
            onCancel(){
                this.$emit('after-callback', true);
            }
        }
    }
</script>
<style scoped>
    dt{
        font-weight: 700;
        color: #000000;
    }
    dd + dt{
        margin-top: 10px;
    }
</style>
