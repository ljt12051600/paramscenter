import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';


import 'element-ui/lib/theme-chalk/index.css';


let a, b;
if (localStorage.getItem("color") == 1) {
    a = "./assets/css/theme-green/index.css";
    b = "./assets/css/theme-green/color-green.css";
} else {
    a = "./assets/css/main.css"
    b = "./assets/css/color-dark.css"
}
import './assets/css/icon.css';
import './assets/css/font.css';
try {
    import (`${a}`);
    import (`${b}`)
} catch (e) {

}
if (window.location.href.includes('index.html')) {
    window.location.href = window.location.href.replace("index.html", "")
}




// 默认主题



//  

// }


import './assets/css/icon.css';
import './assets/css/font.css';
import './assets/css/main.css';
import './views/common/directives';
import 'babel-polyfill';
import store from './store'
import systemTable from '@views/components/table.component.vue';
import systemTab from '@views/components/tab.component.vue';
Vue.component('systemTable', systemTable);
Vue.component('systemTab', systemTab);
Vue.prototype.klbTop = function() {
    document.querySelector(".content").scrollTop = 0
}
Vue.prototype.contentHeight = (num = 120) => {
    return { height: window.innerHeight - num + "px", overflow: 'auto', "overflow-x": "hidden" };

}




Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});


//使用钩子函数对路由进行权限跳转

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');