import Vue from 'vue';
import Router from 'vue-router';
import BASEDATAROUTER from "./base/basedata";
import SYSTEMROUTER from "./base/system";
Vue.use(Router);


let children = [
    ...SYSTEMROUTER,
    ...BASEDATAROUTER,
    {
        path: '/404',
        component: () => import( /* webpackChunkName: "404" */ '@page/404.vue'),
        meta: {
            title: '404'
        }
    },
    {
        path: '/403',
        component: () => import( /* webpackChunkName: "403" */ '@page/403.vue'),
        meta: {
            title: '403'
        }
    },

]


export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '@/views/common/Home.vue'),
            meta: {
                title: 'test'
            },
            children
        },
        {
            path: '/login',
            component: () => import( /* webpackChunkName: "login" */ '@page/Login.vue'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});