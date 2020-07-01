
const FRAMEMANAGEROUTER=[
    {
        path: '/sysDefine',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/sysDefine/list.vue"),
        meta: { title: '系统定义' }
    },
    {
        path: '/subSysDefine',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/subSysDefine/list.vue"),
        meta: { title: '子系统定义' }
    },
    {
        path: '/subdomain',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/subdomain/list.vue"),
        meta: { title: '子域' }
    },
    {
        path: '/tpsArOsItf',
        component: () => import(/* webpackChunkName: "frameManage" */ "@page/frameManage/tpsArOsItf/list.vue"),
        meta: { title: '外联系统接口' }
    },

]
export default FRAMEMANAGEROUTER