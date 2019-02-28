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
              <mu-card-header title="Ficks" sub-title="17620327669">
                <mu-avatar slot="avatar">
                  <img src="@/assets/headImg.jpg">
                </mu-avatar>
              </mu-card-header>
              <mu-card-media title="" sub-title="她们习惯在你背后指桑骂槐 因为没有当面和你对峙的资本 你是赢家 别怕">
                <img src="@/assets/infoBg.jpg">
              </mu-card-media>
            </mu-card>
            
            <div class="btns">
              <mu-button v-if="!userInfo.isFriends" @click="addFriends" full-width large color="primary">添加到通讯录</mu-button>
              <template v-else>
                <mu-button full-width large  color="primary">发送消息</mu-button>
                <mu-button full-width large  color="error">删除好友</mu-button>
              </template>
            </div>
        </mu-container>
    </div>
</template>

<script>
import friendsApi from "@/api/friends";
export default {
  data() {
    return {
      tel: "",
      userInfo: {}
    };
  },
  created() {
    this.tel = this.$route.query.tel;
    this.onSearch();
  },
  methods: {
    //   查询用户账号tel
    onSearch() {
      friendsApi.getFriends({ tel: this.tel }).then(data => {
        this.userInfo = data;
      });
    },
    // 添加好友
    addFriends() {
      friendsApi.addFriends(this.userInfo.data).then(data => {
        console.log(data);
      });
    }
  }
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
