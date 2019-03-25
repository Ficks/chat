<template>
  <div class="container_c">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <i class="iconfont icon-back"></i>
      </mu-button>
      好友信息
    </mu-appbar>

    <mu-container>
      <mu-card style="width: 100%;margin-top:20px;">
        <mu-card-header :title="userData.data.nickName" :sub-title="userData.data.tel">
          <mu-avatar slot="avatar">
            <img :src="userInfo.sysPath+userData.data.headImg" alt="">
          </mu-avatar>
        </mu-card-header>
        <mu-card-media title="" sub-title="她们习惯在你背后指桑骂槐 因为没有当面和你对峙的资本 你是赢家 别怕">
          <img src="@/assets/infoBg.jpg">
        </mu-card-media>
      </mu-card>

      <div class="btns" v-if="userData.data.id!=userInfo.id">
        <template v-if="userData.status==1">
          <mu-button full-width large color="primary">发送消息</mu-button>
          <mu-button full-width large color="error">删除好友</mu-button>
        </template>

        <mu-button v-else-if="userData.status==2" full-width large color="success">等待对方验证</mu-button>
        <mu-button v-else @click="addFriends" full-width large color="primary">添加到通讯录</mu-button>
      </div>
    </mu-container>
  </div>
</template>

<script>
import friendsApi from "@/api/friends";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tel: "",
      userData: {
        data: {}
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this.tel = this.$route.query.tel;
    this.onSearch();
  },
  methods: {
    //   查询用户账号tel
    onSearch() {
      friendsApi.getFriends({ tel: this.tel }).then(data => {
        this.userData = data;
      });
    },
    // 添加好友
    addFriends() {
      friendsApi.addFriends(this.userData.data).then(data => {
        this.userData.status = 2;
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.btns {
  margin-top: 20px;
  button {
    margin-top: 10px;
  }
}
</style>
