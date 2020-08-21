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
