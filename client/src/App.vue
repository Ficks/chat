<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import friendsApi from "@/api/friends";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["socket", "userInfo", "token"])
  },
  methods: {
    ...mapActions(["onSocket"]),
    ...mapMutations(["setNewFriendsMsgLen"]),
    // 连接socket
    conncet() {
      if (this.token && !this.socket) {
        this.onSocket();
        this.onFriends();
      }
    },
    // 监听好友添加状态
    onFriends() {
      console.log("onFriends" + this.userInfo.tel);
      this.socket.on("onFriends" + this.userInfo.tel, data => {
        this.getFriendsMsg();
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
    }
  },
  created() {
    this.conncet();
    this.getFriendsMsg();
  }
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
