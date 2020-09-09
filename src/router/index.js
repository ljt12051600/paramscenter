import Vue from 'vue';
import Router from 'vue-router';
import BASEDATAROUTER from "./base/basedata";
import SYSTEMROUTER from "./base/system";
import FRAMEMANAGEROUTER from './base/frameManage';
import PUBPARAMROUTER from './history/systemParam/pubParam';
import LOGBOOKROUTER from './history/logBook/operateLogBook';
import MYCHANGEROUTER from './history/verManager/myChange';
import VERREPOSITORYROUTER from './history/verManager/verRepository';
import COPMROUTER from "./base/comp";
Vue.use(Router);


let children = [
    ...SYSTEMROUTER,
    ...BASEDATAROUTER,
    ...FRAMEMANAGEROUTER,
    ...PUBPARAMROUTER,
    ...LOGBOOKROUTER,
    ...MYCHANGEROUTER,
    ...VERREPOSITORYROUTER,
    ...COPMROUTER,


]
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    } //解决404重复跳转控制台报错，如有问题请修改掉



export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () =>
                import ( /* webpackChunkName: "home" */ '@/views/common/Home.vue'),
            meta: {
                title: 'test'
            },
            children
        },
        {
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '@page/Login.vue'),
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