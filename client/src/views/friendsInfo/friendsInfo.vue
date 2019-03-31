<template>
  <div class="container_c">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="$router.goBack">
        <i class="iconfont icon-back"></i>
      </mu-button>
      {{$route.meta.title}}
    </mu-appbar>

    <mu-container>
      <mu-card style="width: 100%;margin-top:20px;">
        <mu-card-header :title="userData.nickName" :sub-title="userData.tel">
          <mu-avatar slot="avatar">
            <img :src="userInfo.sysPath+userData.headImg" alt="">
          </mu-avatar>
        </mu-card-header>
        <mu-card-media title="" sub-title="她们习惯在你背后指桑骂槐 因为没有当面和你对峙的资本 你是赢家 别怕">
          <img src="@/assets/infoBg.jpg">
        </mu-card-media>
      </mu-card>

      <div class="btns" v-if="userData.id!=userInfo.id">
        <template v-if="userData.status==1">
          <mu-button full-width large color="primary" @click="openWin({path:'/chat/'+userData.userId})">发送消息</mu-button>
          <mu-button full-width large color="error" @click="openSimpleDialog">删除好友</mu-button>
        </template>

        <mu-button v-else-if="userData.status==2 && userData.aId==userInfo.id" full-width large color="success">等待对方验证</mu-button>
        <mu-button v-else-if="userData.status==2 && userData.bId==userInfo.id" @click="agreeFriends" full-width large color="primary">同意好友请求</mu-button>
        <mu-button v-else @click="addFriends" full-width large color="primary">添加到通讯录</mu-button>
      </div>
    </mu-container>

    <mu-dialog :title="'删除'+userData.nickName" width="360" :open.sync="openSimple">
      确定删除该好友嘛
      <mu-button slot="actions" flat color="error" @click="deleteFriends">删除</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">取消</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import friendsApi from "@/api/friends";
import { mapGetters } from "vuex";
import common from "@/mixins/common";
export default {
  mixins: [common],
  data() {
    return {
      tel: "",
      id: "",
      userData: {},
      openSimple: false
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    // 判断是用id还是tel查找
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.onSearch();
    } else {
      this.tel = this.$route.query.tel;
      this.onSearch();
    }
  },
  methods: {
    //   查询用户Id
    onSearch() {
      let d = { id: this.id };
      if (this.tel) {
        d = { tel: this.tel };
      }
      friendsApi.getFriendsGourp(d).then(data => {
        console.log(data);
        this.userData = data.data;
      });
    },
    // 添加好友
    addFriends() {
      let id = this.userData.userId;
      friendsApi.addFriends(this.userData).then(data => {
        this.userData.status = 2;
      });
    },
    // 同意对方添加好友
    agreeFriends() {
      friendsApi.agree(this.userData.id).then(data => {
        this.userData.status = 1;
      });
    },
    // 删除好友
    deleteFriends() {
      friendsApi.deleteFriends(this.userData).then(data => {
        this.userData.status = 0;
        this.closeSimpleDialog();
      });
    },
    openSimpleDialog() {
      this.openSimple = true;
    },
    closeSimpleDialog() {
      this.openSimple = false;
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
