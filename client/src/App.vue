<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
    // 连接socket
    conncet() {
      if (this.token && !this.socket) {
        this.onSocket();
        console.log("丢你");
        this.onFriends();
      }
    },
    // 监听好友添加状态
    onFriends() {
      console.log("onFriends" + this.userInfo.tel);
      this.socket.on("onFriends" + this.userInfo.tel, data => {
        if (data.type == 0) {
          this.$toast.error(data.msg);
        } else if (data.type == 2) {
          this.$toast.error(data.msg);
        } else {
          this.$toast.message(data.msg);
        }
      });
    }
  },
  created() {
    this.conncet();
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
