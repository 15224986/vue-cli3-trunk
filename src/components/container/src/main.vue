<template>
	<article class="moc-container" :class="{'is-horizontal': horizontal, 'is-flex': flex}">
        <slot></slot>
    </article>
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
            }
        },
		data() {
			return{
			}
		}
	}
</script>
