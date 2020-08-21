const Mock = require('mockjs');

//格式： Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/mock/table', 'get', require('./json/table'));

import tableData from './json/tableData.js'
Mock.mock('/mock/tableData', 'get', tableData);