const COPMROUTER =[
    {
        path: '/qrycomp',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/parmcomp/qrycomp.vue"),
        meta: { title: '组件管理' }
    },
    {
        path: '/attrlist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/parmcomp/attrlist.vue"),
        meta: { title: '属性管理' }
    },
    {
        path: '/brcedit',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/brcinfo/brcedit.vue"),
        meta: { title: '机构信息维护' }
    },
    {
        path: '/brclist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/brcinfo/brclist.vue"),
        meta: { title: '机构信息管理' }
    },
    {
        path: '/brclinklist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/brclinkinfo/brclinklist.vue"),
        meta: { title: '机构关系管理' }
    },
    {
        path: '/brctypelist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/brctypeinfo/brctypelist.vue"),
        meta: { title: '机构类别管理' }
    },
    {
        path: '/puborglist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/puborginfo/puborglist.vue"),
        meta: { title: '法人管理' }
    },
    {
        path: '/pubsyslist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/pubsysinfo/pubsyslist.vue"),
        meta: { title: '系统管理' }
    },
    {
        path: '/pubccylist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/pubccyinfo/pubccylist.vue"),
        meta: { title: '币种管理' }
    },
    {
        path: '/pubtketlist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/pubtketinfo/pubtketlist.vue"),
        meta: { title: '券别管理' }
    },
    {
        path: '/pubcshlist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/pubcshinfo/pubcshlist.vue"),
        meta: { title: '现金项目代码' }
    },
    {
        path: '/pubmemlist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/pubmeminfo/pubmemlist.vue"),
        meta: { title: '摘要码' }
    },
    {
        path: '/pubrsplist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/pubrspinfo/pubrsplist.vue"),
        meta: { title: '冠字号' }
    },
    {
        path: '/pubcountrylist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/pubcountryinfo/pubcountrylist.vue"),
        meta: { title: '国家代码' }
    },
    {
        path: '/pubzonelist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/pubzoneinfo/pubzonelist.vue"),
        meta: { title: '地区代码' }
    },
    {
        path: '/pubidzonelist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/pubidzoneinfo/pubidzonelist.vue"),
        meta: { title: '发证机关代码' }
    },
    {
        path: '/pubindustrylist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/genparm/pubindustryinfo/pubindustrylist.vue"),
        meta: { title: '行业类型管理' }
    },
    {
        path: '/templatelist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/templatecomp/templatelist.vue"),
        meta: { title: '模板管理' }
    },
    {
        path: '/productlist',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/templatecomp/productlist.vue"),
        meta: { title: '产品管理' }
    },
    {
        path: '/productcata',
        component: () => import(/* webpackChunkName: "basedata" */ "@page/templatecomp/productcata.vue"),
        meta: { title: '产品目录管理' }
    },
]
export default COPMROUTER;