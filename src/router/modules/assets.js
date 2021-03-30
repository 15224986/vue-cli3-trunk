export default {
    path: 'assets',
    name: 'assets',
    component: () => import(/* webpackChunkName: "assets" */ '@/views/assets/index'),
	redirect: '/assets/standard',
	children: [
		{
			path: 'standard',
			name: 'standard',
			component: () => import(/* webpackChunkName: "assets" */ '@/views/assets/standard'),
			meta: {
				title: '内部添加tabs'
			}
		},
        {
        	path: 'strategy',
        	name: 'strategy',
        	component: () => import(/* webpackChunkName: "assets" */ '@/views/assets/strategy'),
        	meta: {
        		title: '外部添加tabs'
        	}
        }
	]
}