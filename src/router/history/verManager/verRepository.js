
const VERREPOSITORYROUTER=[
    {
        path: '/verRepository',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/history/verManager/verRepository/list.vue"),
        meta: { title: '版本库' }
    },
]
export default VERREPOSITORYROUTER
///pages/edition/edition-his.html
//verRepository
