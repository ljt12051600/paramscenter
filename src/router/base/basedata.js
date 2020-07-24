
const BASEDATAROUTER=[
    {
        path: '/vocab',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/basedata/vocab.vue"),
        meta: { title: '词根' }
    },
    {
        path: '/dic',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/basedata/dic.vue"),
        meta: { title: '数据字典' }
    },
    {
        path: '/unitdata',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/basedata/unitdata.vue"),
        meta: { title: '元数据' }
    },
    {
        path: '/datagovnce',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/basedata/datagovnce.vue"),
        meta: { title: '响应信息' }
    },
    {
        path: '/option',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/basedata/option/list.vue"),
        meta: { title: '选项代码2.0' }
    },
    {
        path: '/datatable',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/basedata/table/list.vue"),
        meta: { title: '数据表定义' }
    },

]
export default BASEDATAROUTER