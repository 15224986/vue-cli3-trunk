export default {
    path: 'anextUntil',
    component: () => import(/* webpackChunkName: "home" */ '@/views/container/index'),
    name: 'anextUntil',
	redirect: '/anextUntil/table',
	children: [
		{
			path: 'table',
			component: () => import(/* webpackChunkName: "charts" */ '@/views/container/table'),
			name: 'tablePage',
			meta: {
				title: '表格页面'
			}
		},
		{
			path: 'form',
			component: () => import(/* webpackChunkName: "charts" */ '@/views/container/form'),
			name: 'formPage',
			meta: {
				title: '表单页面'
			}
		}
	]
}
