let SYSTEMROUTER = [{
        path: '/dashboard',
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '@page/Dashboard.vue'),
        meta: { title: '系统首页' }
    },

    {
        path: '/button',
        component: () =>
            import ( /* webpackChunkName: "system" */ '@page/system/button.vue'),
        meta: { title: '系统按钮' }
    },
    {
        // vue-schart组件
        path: '/user',
        component: () =>
            import ( /* webpackChunkName: "system" */ '@page/system/user.vue'),
        meta: { title: '用户管理' }
    },
    {
        path: '/role',
        component: () =>
            import ( /* webpackChunkName: "system" */ '@page/system/role.vue'),
        meta: { title: '角色管理' }
    },
    {
        path: '/rolerelation',
        component: () =>
            import ( /* webpackChunkName: "system" */ '@page/system/rolerelation.vue'),
        meta: { title: '系统权限' }
    },
    {
        path: '/swagger',
        component: () =>
            import ( /* webpackChunkName: "system" */ '@page/system/swagger.vue'),
        meta: { title: '接口文档' }
    },


    {
        path: '/menu',
        component: () =>
            import ( /* webpackChunkName: "menu" */ "@page/system/menu.vue"),
        meta: { title: '菜单管理' }
    },
    {
        path: '/404',
        component: () =>
            import ( /* webpackChunkName: "404" */ '@page/404.vue'),
        meta: { title: '404' }
    },
    {
        path: '/403',
        component: () =>
            import ( /* webpackChunkName: "403" */ '@page/403.vue'),
        meta: { title: '403' }
    },
]
export default SYSTEMROUTER;