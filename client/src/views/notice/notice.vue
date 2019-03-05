<template>
  <div class="container_c">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <i class="iconfont icon-back"></i>
      </mu-button>
      新的朋友
      <mu-button icon slot="right" to="/addFriends">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>

    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-list>
        <mu-list-item avatar button :ripple="false" v-for="(item,index) in listArr">
          <mu-list-item-action>
            <mu-avatar>
              <img :src="userInfo.sysPath+item.headImg" alt="" v-if="item.headImg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>{{item.nickName}}</mu-list-item-title>
          <mu-list-item-action>
            <div class="btns" v-if="item.status==2">
              <mu-button @click="onSubmit(item)" color="primary">接受</mu-button>
              <mu-button color="error">拒绝</mu-button>
            </div>
            <div class="tips" v-if="item.status">

              <mu-chip class="demo-chip">
                {{item.status | statusMsg}}
              </mu-chip>
            </div>
          </mu-list-item-action>
        </mu-list-item>

      </mu-list>
      <mu-divider></mu-divider>
    </mu-paper>
  </div>
</template>

<script>
import friendsApi from "@/api/friends";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  filters: {
    statusMsg(status) {
      if (status == 1) {
        return "已同意好友添加";
      } else if (status == 3) {
        return "拒绝了好友添加";
      } else if (status == 4) {
        return "加入黑名单ta";
      }
    }
  },
  data() {
    return {
      listArr: []
    };
  },
  methods: {
    //   查询好友申请列表
    getAddFriendsList() {
      friendsApi
        .getAddFriendsList({ id: this.userInfo.id })
        .then(data => {
          console.log(data);
          this.listArr = data;
        })
        .catch(err => {});
    },
    // 同意好友的添加
    onSubmit(item) {
      friendsApi.agree(item.id).then(data => {
        console.log(data);
        this.getAddFriendsList();
      });
    }
  },
  created() {
    this.getAddFriendsList();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.btns {
  display: flex;

  button {
    min-width: 60px;
    margin-left: 0.133333rem /* 10/75 */;
  }
}
</style>
