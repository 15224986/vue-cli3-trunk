export default [
    {
        path: 'login',
        name: 'loginPage',
        component: () => import(/* webpackChunkName: "contianer" */ '@/views/container/login'),
        meta: {
            title: '登录页面'
        }
    },
    {
        path: 'table',
        name: 'tablePage',
        component: () => import(/* webpackChunkName: "contianer" */ '@/views/container/table'),
        meta: {
            title: '表格页面'
        }
    },
    {
        path: 'form',
        name: 'formPage',
        component: () => import(/* webpackChunkName: "contianer" */ '@/views/container/form'),
        meta: {
            title: '表单页面'
        }
    }
]
