<template>
	<el-tooltip
		:disabled="isShowTooltip"
		:content="content"
		:effect="effect"
		:placement="placement"
		:popper-class="popperClass ? 'moc-tooltip-popper ' + popperClass : 'moc-tooltip-popper'"
	>
		<div :ref="'parent-'+refName" @mouseover="onMouseOver(refName)" class="moc-tooltip">
			<span :ref="refName" v-html="content"></span>
		</div>
	</el-tooltip>
</template>

<script>
	export default {
		name: 'mocTooltip',
		componentName: 'mocTooltip',
		props: {
			// 显示的文字内容
			content: {
				type: String,
				default: () => {
					return ''
				}
			},
			// 外层框的样式，在传入的这个类名中设置文字显示的宽度
			popperClass: {
				type: String,
				default: () => {
					return ''
				}
			},
			// 为页面文字标识（如在同一页面中调用多次组件，此参数不可重复）
			refName: {
				type: String,
				default: () => {
					return ''
				}
			},
			effect: {
				type: String,
				default: () => {
					return 'light'
				}
			},
			placement: {
				type: String,
				default: () => {
					return 'bottom'
				}
			}
		},
		data() {
			return {
				isShowTooltip: false
			}
		},
		methods: {
			onMouseOver(str) {
                if( this.$refs['parent-'+str] && this.$refs[str] ){
                    let parentWidth = this.$refs['parent-'+str].offsetWidth;
                    let contentWidth = this.$refs[str].offsetWidth;
                    // 判断是否开启tooltip功能
                    if (contentWidth > parentWidth) {
                        this.isShowTooltip = false;
                    } else {
                        this.isShowTooltip = true;
                    }
                }
			}
		}
	}
</script>
