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
            <div class="btns" v-if="item.status==2 && item.bId==userInfo.id">
              <mu-button @click="onSubmit(item)" color="primary">接受</mu-button>
              <mu-button @click="refuseFriends(item)" color="error">拒绝</mu-button>
            </div>
            <div v-else-if="item.status">
              <mu-chip class="demo-chip">
                {{statusMsg(item)}}
              </mu-chip>
            </div>
          </mu-list-item-action>
        </mu-list-item>
        <p class="tips" v-if="listArr.length==0">暂无记录</p>
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
          this.listArr = data;
          console.log(11);
          console.log(this.listArr);
        })
        .catch(err => {});
    },
    // 同意好友的添加
    onSubmit(item) {
      friendsApi.agree(item.id).then(data => {
        console.log(data);
        this.getAddFriendsList();
      });
    },
    // 拒绝添加
    refuseFriends(item) {
      friendsApi.refuseFriends(item.id).then(data => {
        this.getAddFriendsList();
      });
    },
    // 过滤器
    statusMsg(item) {
      if (item.status == 1) {
        return "已添加";
      } else if (item.status == 2) {
        return "等待验证";
      } else if (item.status == 3) {
        if (item.aId == this.userInfo.id) {
          return "被拒绝";
        } else {
          return "已拒绝";
        }
        console.log(d);
      } else if (item.status == 4) {
        return "黑名单";
      }
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
