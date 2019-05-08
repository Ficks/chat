import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userInfo: {},
    socket: null,
    newFriendsMsgLen: '0',//新好友通知数量
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
      });
    },
    // 设置新好友通知数量
    setNewFriendsMsgLen(state, num) {
      state.newFriendsMsgLen = String(num);
    }
  },
  actions: {
    onSocket({ commit }) {
      // 建立连接
      commit('setSocket', io("http://localhost:3000"));
    }
  }
});
