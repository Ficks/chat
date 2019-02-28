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
        return '/index/message'
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
      component: resolve => require(['@/views/index/index.vue'], resolve),
      children: [{
        path: '/index/message',
        name: 'message',
        title: "聊天记录",
        component: resolve => require(['@/views/index/message.vue'], resolve)

      }, {
        path: '/index/friends',
        name: 'friends',
        title: "通讯录",
        component: resolve => require(['@/views/index/friends.vue'], resolve)

      }, {
        path: '/index/find',
        name: 'find',
        title: "发现",
        component: resolve => require(['@/views/index/find.vue'], resolve)

      }, {
        path: '/index/world',
        name: 'world',
        title: "世界",
        component: resolve => require(['@/views/index/world.vue'], resolve)

      },]
    }, {
      path: '/addFriends',
      name: 'addFriends',
      title: "添加好友",
      component: resolve => require(['@/views/addFriends/addFriends.vue'], resolve)
    }, {
      path: '/friendsInfo',
      name: 'friendsInfo',
      title: "好友信息",
      component: resolve => require(['@/views/friendsInfo/friendsInfo.vue'], resolve)
    }, {
      path: '/chat',
      name: 'chat',
      title: "聊天",
      component: resolve => require(['@/views/chat/chat.vue'], resolve)
    },
  ]
})
