const VERMANAGERTAROUTER = [{
        path: '/tpsTask',
        component: () =>
            import ( /* webpackChunkName: "verManager" */ "@page/verManager/task/tpsTask.vue"),
        meta: { title: '任务管理' }
    },


]
export default VERMANAGERTAROUTER