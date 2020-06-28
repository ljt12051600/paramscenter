
const LOGBOOKROUTER=[
    {
        path: '/operateLogBook',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/logBook/opreateLogBook/list.vue"),
        meta: { title: '操作日志查询' }
    },
]
export default LOGBOOKROUTER