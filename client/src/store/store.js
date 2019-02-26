import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userInfo: {}
  },
  getters: {
    token: state => {
      return state.isLogin;
    },
    userInfo: state => {
      return state.userInfo;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  }
});
