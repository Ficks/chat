// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



// Muse-ui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import store from './store/store';


import Toast from 'muse-ui-toast';
Vue.use(Toast, {
  position: 'top'
});
Vue.use(MuseUI);


import Message from 'muse-ui-message';
import 'muse-ui-message/dist/muse-ui-message.css';
Vue.use(Message);

Vue.config.productionTip = false


let userInfo = sessionStorage.userInfo ? JSON.parse(sessionStorage.userInfo) : {};
document.title = userInfo.nickName;
store.commit('setUserInfo', userInfo);
router.beforeEach((to, from, next) => {
  let token = store.state.token || sessionStorage.token;
  to.path == "/login" ? next() : token ? next() : next("/login");
  next();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
