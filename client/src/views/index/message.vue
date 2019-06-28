<template>
  <div class="container_c" ref="container">
    <!-- 标题 -->
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="setOpenDrawer">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      {{$route.meta.title}}
      <mu-button icon slot="right" to="/addFriends">
        <i class="iconfont icon-tianjia"></i>
      </mu-button>
    </mu-appbar>

    <div class="pad_box_wr">
      <!-- 聊天 -->
      <mu-paper :z-depth="1" class="demo-list-wrap">
        <mu-list textline="three-line">
          <!-- <mu-sub-header>今天</mu-sub-header> -->
          <template v-for="(item,index) in listArr">
            <mu-list-item
              avatar
              :to="{path:'/chat',query:{tel:item.tel,groupId:item.groupId,nickName:item.nickName,headImg:item.headImg}}"
              button
            >
              <mu-list-item-action>
                <mu-avatar>
                  <img :src="userInfo.sysPath+item.headImg">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{item.nickName}}</mu-list-item-title>
                <mu-list-item-sub-title>
                  <!-- <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> -->
                  {{item.msg}}
                </mu-list-item-sub-title>
              </mu-list-item-content>
              <mu-list-item-action v-show="item.noReadTotal>0">
                <mu-badge :content="item.noReadTotal.toString()" color="secondary"></mu-badge>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider></mu-divider>
          </template>
        </mu-list>
      </mu-paper>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import common from "@/mixins/common";
export default {
  mixins: [common],
  computed: {
    ...mapGetters(["userInfo", "globalMsg"]),
    listArr() {
      let arr = [];
      for (let key in this.globalMsg) {
        arr.push(this.globalMsg[key].newMsg);
      }
      arr.sort((a, b) => {
        let aTm = new Date(a.createTime).getTime();
        let bTm = new Date(b.createTime).getTime();
        return bTm - aTm;
      });
      return arr;
    }
  },
  data() {
    return {
      shift: "movies",
      docked: false,
      openDrawer: false,
      position: "left",
      defaultHeadImg: "@/assets/headImg.jpg"
    };
  },
  methods: {
    ...mapMutations(["setOpenDrawer"]),
    outLogin() {
      // 退出登录
      this.$router.push({ path: "/login" });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.mu-list {
  padding: 0;
}
.fixbom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.top {
  width: 50%;
  margin: 0 auto;
  padding-top: 15px;

  .headimg {
    img {
      border-radius: 50%;
      width: 100%;
      -webkit-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
        0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 14px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
        0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 14px 0 rgba(0, 0, 0, 0.12);
      -webkit-transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
      transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
      color: rgba(0, 0, 0, 0.87);
    }
  }
  .nickname {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
}

.menu_list {
  .iconfont {
    font-weight: bold;
    font-size: 18px;
  }

  .mu-item-action {
    min-width: 30px;
  }
}
</style>
