<template>
	<section class="moc-container" :class="{'moc-horizontal': horizontal}">
        <div class="moc-container-inner" :class="{'moc-is-scroll': isScroll}">
            <slot></slot>
        </div>
    </section>
</template>

<script>
	export default{
		name: 'mocContainer',
		componentName: 'mocContainer',
        props: {
            isScroll: {
                type: Boolean,
                default: false
            },
            horizontal: {
                type: Boolean,
                default: false
            },
        },
		data() {
			return{
			}
		}
	}
</script>
