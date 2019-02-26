import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: "首页",
      redirect: to => {
        return '/index'
      }
    },

    {
      path: '/login',
      name: 'login',
      title: "登录",
      component: resolve => require(['@/views/login/login.vue'], resolve)
    }, {
      path: '/register',
      name: 'register',
      title: "注册",
      component: resolve => require(['@/views/register/register.vue'], resolve)
    }, {
      path: '/retrievePwd',
      name: 'retrievePwd',
      title: "找回密码",
      component: resolve => require(['@/views/retrievePwd/retrievePwd.vue'], resolve)
    }, {
      path: '/index',
      name: 'index',
      title: "首页",
      component: resolve => require(['@/views/index/index.vue'], resolve)
    }, {
      path: '/chat',
      name: 'chat',
      title: "聊天",
      component: resolve => require(['@/views/chat/chat.vue'], resolve)
    },
  ]
})
