
const PUBPARAMROUTER=[
    {
        path: '/pubParam',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/history/systemParam/pubParam/list.vue"),
        meta: { title: '参数管理' }
    },
]
export default PUBPARAMROUTER