

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';


import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/main.css';
import './assets/css/color-dark.css';
let a,b;
if(localStorage.getItem("color")==1){
   a="./assets/css/theme-green/index.css";
   b="./assets/css/theme-green/color-green.css";
}
try{
    import (`${a}`) ; 
    import (`${b}`)
}
catch(e){

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
Vue.component('systemTable',systemTable);
Vue.prototype.klbTop=function(){
    document.querySelector(".content").scrollTop=0
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