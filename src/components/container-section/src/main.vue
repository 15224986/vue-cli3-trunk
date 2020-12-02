<template>
    <section class="moc-container-section" :class="{ 'is-bodier':bodier }">
        <div v-if="bodier" class="moc-container-section-inner">
            <div class="moc-container-section-header" v-if="$scopedSlots.header">
                <slot name="header"></slot>
            </div>
            <slot></slot>
            <div class="moc-container-section-footer" v-if="$scopedSlots.footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <template v-else>
            <div class="moc-container-section-header" v-if="$scopedSlots.header">
                <slot name="header"></slot>
            </div>
            <slot></slot>
            <div class="moc-container-section-footer" v-if="$scopedSlots.footer">
                <slot name="footer"></slot>
            </div>
        </template>
    </section>
</template>

<script>
	export default{
		name: 'mocSection',
		componentName: 'mocSection',
	  	props: {
            bodier: {
                type: Boolean,
                default: false
            }
		},
		data() {
			return{}
		},
        created() {
        },
        mounted() {
        }
	}
</script>
