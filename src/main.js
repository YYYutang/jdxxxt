import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import { getRequest } from './utils/api';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(ElementUI);
router.beforeEach((to,from,next)=>{
  if(window.sessionStorage.getItem('tokenStr')){
    if(!window.sessionStorage.getItem('user')){
      return getRequest('/user/info').then(
        resp=>{
          if(resp){
            //存入用户信息
            window.sessionStorage.setItem('user',JSON.stringify(resp));
            next();
          }
      
        }
      )
    }
    next();
  }
  else{
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
