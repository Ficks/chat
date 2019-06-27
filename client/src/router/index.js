import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

Vue.use (Router);

Router.prototype.goBack = () => {
  this.a.isBack = true;
  window.history.go (-1);
};

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'app',
      component: resolve => require (['@/views/index'], resolve),
      redirect: to => {
        return '/index/message';
      },
      children: [
        {
          path: '/login',
          name: 'login',
          meta: {
            title: '登录',
          },
          component: resolve => require (['@/views/login/login'], resolve),
        },
        {
          path: '/register',
          name: 'register',
          meta: {
            title: '注册',
          },
          component: resolve =>
            require (['@/views/register/register'], resolve),
        },
        {
          path: '/retrievePwd',
          name: 'retrievePwd',
          meta: {
            title: '找回密码',
          },
          component: resolve =>
            require (['@/views/retrievePwd/retrievePwd'], resolve),
        },
        {
          path: '/index',
          name: 'index',
          meta: {
            title: '首页',
          },
          component: resolve => require (['@/views/index/index'], resolve),
          children: [
            {
              path: '/index/message',
              name: 'message',
              meta: {
                title: '聊天记录',
                keepAlive: true,
              },
              component: resolve =>
                require (['@/views/index/message'], resolve),
            },
            {
              path: '/index/friends',
              name: 'friends',
              meta: {
                title: '通讯录',
              },
              component: resolve =>
                require (['@/views/index/friends'], resolve),
            },
            {
              path: '/index/find',
              name: 'find',
              meta: {
                title: '发现',
              },
              component: resolve => require (['@/views/index/find'], resolve),
            },
            {
              path: '/index/world',
              name: 'world',
              meta: {
                title: '世界',
              },
              component: resolve => require (['@/views/index/world'], resolve),
            },
          ],
        },
        {
          path: '/addFriends',
          name: 'addFriends',
          meta: {
            title: '添加好友',
          },
          component: resolve =>
            require (['@/views/addFriends/addFriends'], resolve),
        },
        {
          path: '/friendsInfo',
          name: 'friendsInfo',
          meta: {
            title: '好友信息',
          },
          component: resolve =>
            require (['@/views/friendsInfo/friendsInfo'], resolve),
        },
        {
          path: '/notice',
          name: 'notice',
          meta: {
            title: '新的朋友',
          },
          component: resolve => require (['@/views/notice/notice'], resolve),
        },
        {
          path: '/chat',
          name: 'chat',
          meta: {
            title: '聊天',
          },
          component: resolve => require (['@/views/chat/chat'], resolve),
        },
      ],
    },
  ],
});
