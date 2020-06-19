
const FRAMEMANAGEROUTER=[
    {
        path: '/sysDefine',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/sysDefine/list.vue"),
        meta: { title: '系统定义2.0' }
    },
    {
        path: '/subSysDefine',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/subSysDefine/list.vue"),
        meta: { title: '子系统定义2.0' }
    },
    {
        path: '/subdomain',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/subdomain/list.vue"),
        meta: { title: '子域2.0' }
    },
    {
        path: '/tpsArOsItf',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/tpsArOsItf/list.vue"),
        meta: { title: '外联系统接口2.0' }
    },

]
export default FRAMEMANAGEROUTER