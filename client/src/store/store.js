import Vue from 'vue';
import Vuex from 'vuex';
import Config from '../config/config';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openDrawer: false, //左侧导航
    token: '',
    userInfo: {},
    socket: null,
    newFriendsMsgLen: '0', //新好友通知数量
    updateHyStatus: 0, //好友状态发生改变

    goToBom: {
      groupId: '', //判断是否当前ID
      num: 0, //自增更新视图用的
    },
    globalMsg: {
      // newMsg: {
      //   type: 1, //1、单聊 2、群聊
      //   createTime: '1561562956422',
      //   mId: 73,
      //   msg: 'halo',
      //   msgType: '1',
      //   status: '1',
      //   toUserTel: '15111327689',
      //   updateTime: null,
      //   userTel: '17620327669',
      // },
      // list: [
      //   {
      //     type: 1, //1、单聊 2、群聊
      //     createTime: '1561562956422',
      //     mId: 73,
      //     msg: 'halo',
      //     msgType: '1',
      //     status: '1',
      //     toUserTel: '15111327689',
      //     updateTime: null,
      //     userTel: '17620327669',
      //   },
      // ],
    },
  },
  getters: {
    token: state => {
      return state.token;
    },
    userInfo: state => {
      return state.userInfo;
    },
    socket: state => {
      return state.socket;
    },
    globalMsg: state => state.globalMsg,
    goToBom: state => state.goToBom,
  },
  mutations: {
    // 设置左侧导航的展开与收起
    setOpenDrawer(state, val) {
      state.openDrawer = !state.openDrawer;
    },
    // 设置token
    setToken(state, token) {
      state.token = token;
    },
    // 设置个人信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 设置socket
    setSocket(state, socket) {
      state.socket = socket;

      state.socket.on('connect', () => {
        console.log('连接上了');
        // 登录，同步前后端信息
        // 请求后端login接口，写入socketid
        state.socket.emit('login', {
          // 身份标识，可以是时间戳或者唯一id，最要用来回去socketid进行私聊
          id: state.userInfo.tel,
        });

        state.socket.emit('serverXinTiao', true);

        // 客户端心跳
        state.socket.on('pcXinTiao', function (msg) {
          setTimeout(() => {
            state.socket.emit('serverXinTiao', true);
          }, 5000);
        });
      });
    },
    // 设置新好友通知数量
    setNewFriendsMsgLen(state, num) {
      state.newFriendsMsgLen = String(num);
    },
    // 好友状态发生改变
    updateHyStatus(state) {
      state.updateHyStatus++;
    },
    // 添加聊天列表
    addGlobalMsg(state, data) {
      // 更新最新记录
      console.log(data);

      if (!state.globalMsg[data.groupId]) {
        Vue.set(state.globalMsg, data.groupId, {
          newMsg: {
            groupId: data.groupId,
            noReadTotal: 0
          },
          list: [],
        });
        Object.assign(state.globalMsg[data.groupId].newMsg, data.userInfo);
      }

      Object.assign(state.globalMsg[data.groupId].newMsg, data.msgInfo);
      state.globalMsg[data.groupId].list.push(data.msgInfo);
      state.goToBom = {
        groupId: data.groupId,
        num: state.goToBom.num++,
      };
    },
    //追加一组聊天记录
    concatGlobalMsg(state, data) {
      console.log('追加一组数据：' + data.groupId);
      if (!state.globalMsg[data.groupId]) {
        Vue.set(state.globalMsg, data.groupId, {
          newMsg: {
            groupId: data.groupId,
          },
          list: [],
        });
      }
      state.globalMsg[data.groupId].list = data.list.concat(
        state.globalMsg[data.groupId].list
      );
    },
    // 设置临时聊天列表
    setGlobalMsg(state, data) {
      state.globalMsg = data;
    },
    // 设置当前聊天为已读消息
    setChatMsgRead(state, groupId) {
      if (state.globalMsg[groupId]) {
        state.globalMsg[groupId].newMsg.noReadTotal = 0;
      }
    }
  },
  actions: {
    onSocket({ commit }) {
      // 建立连接
      commit('setSocket', io(Config.baseUrl));
    },
  },
});
