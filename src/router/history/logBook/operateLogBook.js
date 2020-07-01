
const LOGBOOKROUTER=[
    {
        path: '/operateLogBook',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/history/logBook/opreateLogBook/list.vue"),
        meta: { title: '操作日志查询' }
    },
]
export default LOGBOOKROUTER