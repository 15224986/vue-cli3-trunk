const Mock = require('mockjs');

/**
 * 请求拦截
 */
Mock.setup({
    timeout: "500-3000"
})


//格式： Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/mock/table?api=123', 'get', require('./json/table'));

import tableData from './json/tableData.js'
Mock.mock('/mock/tableData', 'post', tableData);
