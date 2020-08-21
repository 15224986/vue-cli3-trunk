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
        <el-option label="全选" value="all-selected-neusoft"></el-option>
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
            type: [Array, String, Number, Boolean],
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
            oldChooseData: [],
            chooseData: this.selectData
        };
    },
    watch: {
        selectData:function (nData, oData) {
            this.chooseData = nData;
            this.oldChooseData = nData.length > 0 ? nData : [];
        }
    },
    mounted() {
        if( this.chooseData.length > 0 ){
			this.selectAll(this.chooseData);
		}
    },
    methods: {
		selectAll (val) {
            // 保留所有值
            const allValues = [];
            this.selectOptions.forEach(item => {
                if( !item.disabled ){
                    allValues.push( item.value );
                }
            });
            allValues.unshift('all-selected-neusoft');
			// 用来储存上一次选择的值，可进行对比
			const oldVal = this.oldChooseData.length > 0 ? this.oldChooseData : [];

            // 若选择全部
            if ( val.includes('all-selected-neusoft') ) {
                // 判断当前列表中除了全选之外是否还有其他选项
                if( allValues.length>1 ){
                    this.chooseData = allValues;
                }else{
                    this.chooseData = [];
                }
            }

			// 取消全部选中， 上次有， 当前没有， 表示取消全选
			if (oldVal.includes('all-selected-neusoft') && !val.includes('all-selected-neusoft')) {
				this.chooseData = [];
			}

			// 点击非全部选中，需要排除全部选中 以及 当前点击的选项
			// 新老数据都有全部选中
			if (oldVal.includes('all-selected-neusoft') && val.includes('all-selected-neusoft')) {
				const index = val.indexOf('all-selected-neusoft');
				val.splice(index, 1); // 排除全选选项
				this.chooseData = val;
			}

			// 全选未选，但是其他选项都全部选上了，则全选选上
			if (!oldVal.includes('all-selected-neusoft') && !val.includes('all-selected-neusoft')) {
				if ( allValues.length > 1 && val.length === allValues.length - 1 ) {
					this.chooseData = ['all-selected-neusoft'].concat(val);
				}
			}

			// 储存当前选择的最后结果 作为下次的老数据
			this.oldChooseData = this.chooseData;
            this.$emit('change', this.chooseData);
		}
    }
};
</script>
