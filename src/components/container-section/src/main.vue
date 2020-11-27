<template>
    <section class="moc-container-section" :class="{ 'moc-container-bodier':bodier }">
        <div class="moc-container-section-inner" :class="{'moc-is-scroll': isScroll}">
            <div class="moc-container-section-header" v-if="$scopedSlots.header">
                <slot name="header"></slot>
            </div>
            <div class="moc-container-section-body">
                <slot></slot>
            </div>
            <div class="moc-container-section-footer" v-if="$scopedSlots.footer">
                <slot name="footer"></slot>
            </div>
        </div>
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
            },
            isScroll: {
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
