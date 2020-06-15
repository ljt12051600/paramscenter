
const FRAMEMANAGEROUTER=[
    {
        path: '/sysDefine',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/sysDefine.vue"),
        meta: { title: '系统定义2.0' }
    },
    {
        path: '/subSysDefine',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/subSysDefine.vue"),
        meta: { title: '子系统定义2.0' }
    },
    {
        path: '/subdomain',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/subdomain.vue"),
        meta: { title: '子域2.0' }
    },

]
export default FRAMEMANAGEROUTER