/**
 * 通过过滤，将select的value转化为label
 * @param {string} value
 * @return {string}
 */
export function selectFormatter(value, options, type) {
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
        options.forEach(element => {
            if( value === element.value ){
                return element.label
            }
        });
    }
}


/**
 * 首字母大写
 * @param {string} value
 * @return {string}
 */
export function capitalize(value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * 字符串转换为大写
 * @param {string} value
 * @return {string}
 */
export function toUpperCase(value) {
    if (!value) return ''
    value = value.toString()
    return value.toUpperCase();
}
