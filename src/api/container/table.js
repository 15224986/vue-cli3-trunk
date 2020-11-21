import request from '@/axios/request'

export function getTableData(username, password) {
    const params = {
        userName: username,
        password: password
    }
    return request({
        url: '/mock/tableData',
        method: 'post',
        params
    })
}
export function getTable(params) {
    return request({
        url: '/mock/table',
        method: 'get',
        params: params
    })
}
