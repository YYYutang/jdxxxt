import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import { getRequest } from './utils/api';
import {postRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
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
