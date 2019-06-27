<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import friendsApi from '@/api/friends';
import chatListApi from '@/api/chatList';
export default {
  name: 'App',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['socket', 'userInfo', 'token', 'globalMsg']),
  },
  methods: {
    ...mapActions(['onSocket']),
    ...mapMutations([
      'setNewFriendsMsgLen',
      'updateHyStatus',
      'setGlobalMsg',
      'addGlobalMsg',
    ]),
    // 连接socket
    conncet() {
      if (this.token && !this.socket) {
        this.onSocket();
        this.onFriends();
      }
    },
    // 监听好友添加状态
    onFriends() {
      console.log('onFriends' + this.userInfo.tel);
      this.socket.on('onFriends', data => {
        console.log('好友添加记录通知：');
        console.log(data);
        this.getFriendsMsg();
        this.updateHyStatus();
        if (data.type == 0) {
          this.$toast.error(data.msg);
        } else if (data.type == 2) {
          this.$toast.error(data.msg);
        } else {
          this.$toast.message(data.msg);
        }
      });
    },
    // 获取新好友通知条数
    getFriendsMsg() {
      friendsApi.getFriendsMsg().then(data => {
        this.setNewFriendsMsgLen(data.length);
      });
    },

    // 查询临时聊天记录
    getChatMsg() {
      let chatMsg = {};
      chatListApi.getChatList(this.searchList).then(data => {
        for (let i = 0; i < data.length; i++) {
          chatMsg[data[i].groupId] = {
            newMsg: data[i],
            list: [],
          };
        }
        if (data.length > 0) {
          this.setGlobalMsg(chatMsg);
        }
        console.log(this.globalMsg);
      });
    },

    // 统一处理聊天消息
    onMsg() {
      this.socket.on('onMsg', data => {
        console.log('您有新的消息：');
        console.log(this.globalMsg);
        console.log(data);
        this.addGlobalMsg(data);
      });
    },
  },
  created() {
    this.conncet();
    this.getFriendsMsg();
    this.getChatMsg();
    this.onMsg();
  },
  watch: {
    token() {
      if (this.token) {
        this.getFriendsMsg();
      }
    },
  },
};
</script>

<style>
@import url("./App.less");

.tips {
  text-align: center;
  padding: 20px;
  color: #ccc;
}
</style>
