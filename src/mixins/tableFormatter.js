export default {
	methods:{
        /**
         * 表格对应select格式化
         */
        selectFormatter( value, options, type ){
            if( type === "array" ){
                if( !Array.isArray(value) ){
                    value = value.split(',')
                }
                let valueText = [];
                options.forEach(element => {
                    if( value.includes(element.value) ){
                        valueText.push( element.label )
                    }
                });
                return valueText.join()
            }else{
                for (let i=0; i<options.length; i++){
                    let item = options[i];
                    if( value == item.value ){
                        return item.label
                    }
                }
            }
        },
		/**
		 * 格式化表格里面的时间日期结构
		 */
		dateFormatter(row, column, cellValue, index){
			if(cellValue){
				cellValue = cellValue + '';
				let langthNum = cellValue.length;
				var year = '',
					month = '',
					day = '',
					hour = '',
					minute = '',
					second = '',
					date = '';
				if( langthNum >= 4 ){
					year = cellValue.slice(0,4);
					date = year;
				}
				if(langthNum >= 6){
					month = cellValue.slice(4,6);
					date += '-' + month;
				}
				if(langthNum >= 8){
					day = cellValue.slice(6,8);
					date += '-' + day;
				}
				if(langthNum >= 10){
					hour = cellValue.slice(8,10);
					date += ' ' + hour;
				}
				if(langthNum >= 12){
					minute = cellValue.slice(10,12);
					date += ':' + minute;
				}
				if(langthNum >= 14){
					second = cellValue.slice(12,14);
					date += ':' + second;
				}
				return date;
			}
		},
	}
}
