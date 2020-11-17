<template>
    <section class="moc-container-section" :class="{ 'moc-container-bodier':bodier }">
        <div class="moc-container-section-header" v-if="$scopedSlots.header">
            <slot name="header"></slot>
        </div>
        <div class="moc-container-section-body">
            <slot></slot>
        </div>
        <div class="moc-container-section-footer" v-if="$scopedSlots.footer">
            <slot name="footer"></slot>
        </div>
    </section>
</template>

<script>
	export default{
		name: 'mocSection',
		componentName: 'mocSection',
		data() {
			return{}
		},
	  	props: {
            bodier: {
                type: Boolean,
                default: false
            },
		},
        created() {
        },
        mounted() {
        }
	}
</script>
