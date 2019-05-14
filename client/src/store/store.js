import Vue from "vue";
import Vuex from "vuex";
import Config from '../config/config';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openDrawer: false,//左侧导航
    token: "",
    userInfo: {},
    socket: null,
    newFriendsMsgLen: '0',//新好友通知数量
    updateHyStatus: 0,//好友状态发生改变
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
    }
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

      state.socket.on("connect", () => {
        console.log("连接上了");
        // 登录，同步前后端信息
        // 请求后端login接口，写入socketid
        state.socket.emit("login", {
          // 身份标识，可以是时间戳或者唯一id，最要用来回去socketid进行私聊
          id: state.userInfo.tel
        });


        state.socket.emit("serverXinTiao", true)

        // 客户端心跳
        state.socket.on("pcXinTiao", function (msg) {
          setTimeout(() => {
            state.socket.emit("serverXinTiao", true)
          }, 5000)
        })
      });
    },
    // 设置新好友通知数量
    setNewFriendsMsgLen(state, num) {
      state.newFriendsMsgLen = String(num);
    },
    // 好友状态发生改变
    updateHyStatus(state) {
      state.updateHyStatus++;
    }
  },
  actions: {
    onSocket({ commit }) {
      // 建立连接
      commit('setSocket', io(Config.baseUrl));
    }
  }
});
