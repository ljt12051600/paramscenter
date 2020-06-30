
const MYCHANGEROUTER=[
    {
        path: '/myChange',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/verManager/myChange/list.vue"),
        meta: { title: '我的变更' }
    },
]
export default MYCHANGEROUTER
///pages/edition/edition-chg.html