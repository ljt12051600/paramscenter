import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);


export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "system" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/button',
                    component: () => import(/* webpackChunkName: "system" */ '@page/system/menu/button.vue'),
                    meta: { title: '系统按钮' }
                },
                {
                    // vue-schart组件
                    path: '/user',
                    component: () => import(/* webpackChunkName: "system" */ '@page/system/menu/user.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/role',
                    component: () => import(/* webpackChunkName: "system" */ '@page/system/menu/role.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/rolerelation',
                    component: () => import(/* webpackChunkName: "system" */ '@page/system/menu/rolerelation.vue'),
                    meta: { title: '系统权限' }
                },
              
           
                {
                    // 国际化组件
                    path: '/menu',
                    component: () => import(/* webpackChunkName: "menu" */ "@page/system/menu/menu.vue"),
                    meta: { title: '菜单管理' }
                },
              
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
              
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});


