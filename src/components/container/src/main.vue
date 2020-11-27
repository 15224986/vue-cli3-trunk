<template>
	<section class="moc-container" :class="{'moc-horizontal': horizontal, 'moc-display-flex': displayFlex}">
        <slot></slot>
    </section>
</template>

<script>
	export default{
		name: 'mocContainer',
		componentName: 'mocContainer',
        props: {
            displayFlex: {
                type: Boolean,
                default: true
            },
            horizontal: {
                type: Boolean,
                default: false
            },
            inner: {
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
