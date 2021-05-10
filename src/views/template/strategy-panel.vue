<template>
    <moc-container flex>
        <moc-section class="project-toolbar m-t-sm">
            <dl>
                <dt>{{title}}</dt>
                <dd>{{text}}</dd>
            </dl>
        </moc-section>
    </moc-container>
</template>
<script>

    export default {
        props:{
            title: '',
            text: '',
        },
        data () {
			return {}
        },
        created(){

        },
        mounted () {

        },
        methods:{

        }
    }
</script>
