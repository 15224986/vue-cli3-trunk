export default {
	methods:{
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
