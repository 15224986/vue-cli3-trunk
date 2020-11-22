<template>
	<section class="moc-container" :class="{'moc-horizontal': horizontal}">
        <div v-if="bodier" class="moc-container-inner">
            <slot></slot>
        </div>
        <slot v-else></slot>
    </section>
</template>

<script>
	export default{
		name: 'mocContainer',
		componentName: 'mocContainer',
        props: {
            inner: {
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
