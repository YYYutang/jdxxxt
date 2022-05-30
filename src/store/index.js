import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const now = new Date();
const store = new Vuex.Store({
  state: {
    sessions: {},
    admins: [],
    currentAdmin: JSON.parse(window.sessionStorage.getItem('user')), // 当前用户
    currentSession: null,
    lessonList: [],
  },
  mutations: {
    INIT_ADMIN(state, admin) {
      state.currentAdmin = admin
  },
    INIT_LESSONLIST(state, list) {
      state.lessonList = list;
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store;
