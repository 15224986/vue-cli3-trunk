export default [
    {
        path: 'table',
        name: 'tablePage',
        component: () => import(/* webpackChunkName: "template" */ '@/views/template/table'),
        meta: {
            title: '表格页面'
        }
    },
    {
        path: 'flex',
        name: 'flexPage',
        component: () => import(/* webpackChunkName: "template" */ '@/views/template/flex'),
        meta: {
            title: '弹性盒模型'
        }
    },
    {
        path: 'form',
        name: 'formPage',
        component: () => import(/* webpackChunkName: "template" */ '@/views/template/form'),
        meta: {
            title: '表单页面'
        }
    },
    {
        path: 'standard',
        name: 'standard',
        component: () => import(/* webpackChunkName: "template" */ '@/views/template/standard'),
        meta: {
            title: '内部添加tabs'
        }
    },
    {
        path: 'strategy',
        name: 'strategy',
        component: () => import(/* webpackChunkName: "template" */ '@/views/template/strategy'),
        meta: {
            title: '外部添加tabs'
        }
    }
]
