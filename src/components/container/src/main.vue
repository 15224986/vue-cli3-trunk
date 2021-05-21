<template>
	<div class="moc-container" :class="{'is-horizontal': horizontal, 'is-flex': flex, 'is-auto-height': autoHeight}">
        <slot></slot>
    </div>
</template>

<script>
	export default{
		name: 'mocContainer',
		componentName: 'mocContainer',
        props: {
            flex: {
                type: Boolean,
                default: false
            },
            horizontal: {
                type: Boolean,
                default: false
            },
            autoHeight: {
                type: Boolean,
                default: false
            }
        },
		data() {
			return{
			}
		}
	}
</script>
