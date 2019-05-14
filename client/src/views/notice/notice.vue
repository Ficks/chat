<template>
  <div class="container_c" ref="container">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="$router.goBack">
        <i class="iconfont icon-back"></i>
      </mu-button>
      新的朋友
      <mu-button icon slot="right" to="/addFriends">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>

    <div class="pad_box_wr">
      <mu-load-more @refresh="refresh" :refreshing="searchLoad.refreshing" :loading="searchLoad.loading" @load="load">
        <mu-paper :z-depth="1" class="demo-list-wrap">

          <mu-list v-for="(item,index) in listArr" :key="index" @click="openWin({name:'friendsInfo',query:{tel:item.tel}})">
            <mu-list-item avatar button :ripple="false">
              <mu-list-item-action>
                <mu-avatar>
                  <img :src="userInfo.sysPath+item.headImg" alt="" v-if="item.headImg">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>{{item.nickName}}</mu-list-item-title>
              <mu-list-item-action>
                <div class="btns" v-if="item.status==2 && item.bTel==userInfo.tel">
                  <mu-button @click.stop="onSubmit(item)" color="primary">接受</mu-button>
                  <mu-button @click.stop="refuseFriends(item)" color="error">拒绝</mu-button>
                </div>
                <div v-else>
                  <mu-chip class="demo-chip" @click.stop="()=>{}">
                    {{statusMsg(item)}}
                  </mu-chip>
                </div>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider v-if="index!=listArr.length-1"></mu-divider>
          </mu-list>
          <p class="tips" v-if="listArr.length==0">暂无记录</p>
        </mu-paper>
      </mu-load-more>
    </div>
  </div>
</template>

<script>
import friendsApi from "@/api/friends";
import { mapState, mapGetters, mapMutations } from "vuex";
import common from "@/mixins/common";
import listArr from "@/mixins/listArr";
export default {
  mixins: [common, listArr],
  computed: {
    ...mapGetters(["userInfo", "socket"]),
    ...mapState(["updateHyStatus"])
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setNewFriendsMsgLen"]),
    //   查询好友申请列表
    getList() {
      let d = { id: this.userInfo.id };
      Object.assign(d, this.searchList);
      friendsApi
        .getAddFriendsList(d)
        .then(data => {
          this.afterGetList(data);
          // 所有消息已读
          this.setAllMsgRead();
          for (let i = 0; i < this.listArr.length; i++) {
            console.log(this.listArr[i].status);
          }
        })
        .catch(err => {});
    },
    // 同意好友的添加
    onSubmit(item) {
      friendsApi.agree(item).then(data => {
        item.status = 1;
      });
    },
    // 拒绝添加
    refuseFriends(item) {
      friendsApi.refuseFriends(item).then(data => {
        item.status = 3;
      });
    },
    // 过滤器
    statusMsg(item) {
      if (item.status == 0) {
        return "已解除好友关系";
      } else if (item.status == 1) {
        return "已添加";
      } else if (item.status == 2) {
        return "等待验证";
      } else if (item.status == 3) {
        if (item.aTel == this.userInfo.tel) {
          return "被拒绝";
        } else {
          return "已拒绝";
        }
        console.log(d);
      } else if (item.status == 4) {
        return "黑名单";
      }
    },
    // 设置所有消息为已读
    setAllMsgRead() {
      friendsApi.getFriendsAllMsgRead().then(data => {
        this.setNewFriendsMsgLen(0);
      });
    }
  },
  watch: {
    updateHyStatus() {
      this.$refs.container.scrollTop = 0; //必须设置父组件的ref
      this.init();
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.pad_box_wr{
  padding-bottom: 0;
}
.btns {
  display: flex;

  button {
    min-width: 60px;
    margin-left: 0.133333rem /* 10/75 */;
  }
}
</style>
