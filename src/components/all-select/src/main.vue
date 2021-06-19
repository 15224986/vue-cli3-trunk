<template>
    <el-select
        v-model="chooseData"
        multiple
        :clearable="clearable"
        :filterable="filterable"
        :size="size"
        :collapse-tags="collapseTags"
        :placeholder="placeholder"
        @change='selectAll'
    >
        <el-option label="全选" value="all-selected-null" v-if="selectOptions.length>0"></el-option>
        <el-option
            v-for="(item, index) in selectOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        >
        </el-option>
    </el-select>
</template>
<script>
export default {
    name: 'mocAllSelect',
    componentName: 'mocAllSelect',
    model:{
        prop: 'selectData',
        event: 'change'
    },
	props: {
        selectOptions: {
            type: Array,
            // default: function () { return [] }
            default: () => []
        },
        selectData: {
            type: Array,
            default: () => []
        },
        clearable:{
            type: Boolean,
            default: false
        },
        filterable:{
            type: Boolean,
            default: false
        },
        placeholder:{
            type: String,
            default: '请选择'
        },
        collapseTags:{
            type: Boolean,
            default: false
        },
        size:{
            type: String,
            default: ''
        }
    },
    data () {
        return {
            // selectOptions: [
            //     { value: '1', label: '苹果' },
            //     { value: '2', label: '橘子' },
            //     { value: '3', label: '葡萄' },
            //     { value: '4', label: '西瓜' },
            //     { value: '5', label: '芒果' },
            //     { value: '6', label: '山竹' }
            // ],
            oldChooseData: Array.isArray(this.selectData) ? this.selectData : [],
            chooseData: Array.isArray(this.selectData) ? this.selectData : []
        };
    },
    watch: {
        selectData:{
            deep: true,         // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
            immediate: true,    // 该回调将会在侦听开始之后被立即调用
            handler: function(nData){
                if( Array.isArray(nData) && Array.isArray(this.selectOptions)  ){
                    this.chooseData = nData;
                    if(this.selectOptions.length > 0){
                        this.addAllSelected(this.selectOptions)
                    }
                }
            }
        },
        selectOptions:{
            deep: true,
            immediate: true,
            handler: function(nData){
                if( Array.isArray(nData) && nData.length > 0 && Array.isArray(this.chooseData) ){
                    this.addAllSelected(nData)
                }
            }
        }
    },
    methods: {
        /**
         * 初始化事件
         */
        addAllSelected(options){
            let type = true;
            options.forEach(element=>{
                if(!element.disabled && this.chooseData.includes(element.value) === false ){
                    type = false
                }
            })
            if( type && !this.chooseData.includes('all-selected-null') ){
                this.$nextTick(function(){
                    this.chooseData.unshift('all-selected-null');
                    this.oldChooseData = this.chooseData;
                })
            }
        },
        /**
         * 点击事件
         */
		selectAll() {
            /**
             * 保留所有值
             */
            const allValues = [];
            this.selectOptions.forEach(item => {
                if( !item.disabled ){
                    allValues.push( item.value );
                }
            });

            /**
             * 点击全选的时候
             * 取消全部选中， 上次有， 当前没有， 表示取消全选
             * 点击非全部选中，上次没有， 当前有， 表示全选
             */
			if (this.oldChooseData.includes('all-selected-null') && !this.chooseData.includes('all-selected-null')) {
                this.chooseData = [];
			}
			if ( !this.oldChooseData.includes('all-selected-null') && this.chooseData.includes('all-selected-null')) {
                this.chooseData = allValues;
                this.chooseData.unshift('all-selected-null');
			}

            /**
             * 点击的不是全选时
             * 全选未选，但是其他选项都全部选上了，则添加全选
             * 全选以选，但是其他选项都未全部选上了，则删除全选
             */
            if (!this.oldChooseData.includes('all-selected-null') && !this.chooseData.includes('all-selected-null') || this.oldChooseData.includes('all-selected-null') && this.chooseData.includes('all-selected-null') ) {
                let type = allValues.every( value=> this.chooseData.includes(value))
                if ( type ) {
                    this.chooseData.unshift('all-selected-null');
                }else{
                    const idx = this.chooseData.indexOf('all-selected-null');
                    if( idx > -1 ) this.chooseData.splice(idx, 1);
                }
            }

			// 储存当前选择的最后结果 作为下次的老数据
			this.oldChooseData = this.chooseData;
            this.$emit('change', this.chooseData);
		}
    }
};
</script>
