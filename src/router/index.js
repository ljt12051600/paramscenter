import Vue from 'vue';
import Router from 'vue-router';
import BASEDATAROUTER from "./base/basedata";
import SYSTEMROUTER from "./base/system";
Vue.use(Router);


let children = [
    ...SYSTEMROUTER,
    ...BASEDATAROUTER,
    

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