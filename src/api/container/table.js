import request from '@/axios/request'

export function getTableData(params) {
    return request({
        url: '/mock/tableData',
        method: 'post',
        data: params
    })
}
export function getTable(params) {
    return request({
        url: '/mock/table',
        method: 'get',
        params: params
    })
}
