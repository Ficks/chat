<template>
  <div class="container_c">
    <!-- 左侧菜单 -->
    <mu-container>
      <div class="mask" v-show="openDrawer" @click="setOpenDrawer"></div>
      <mu-drawer :open.sync="openDrawer" :docked="docked" :right="position === 'right'" class="leftMenu">
        <div class="top">
          <div class="headimg">
            <img :src="userInfo.sysPath+userInfo.headImg" alt="">
          </div>
          <div class="nickname">{{userInfo.nickName}}</div>
        </div>
        <mu-list class="menu_list">
          <mu-list-item button>
            <mu-list-item-action>
              <i class="iconfont icon-shezhi"></i>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>我的设置</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>

          <mu-list-item button>
            <mu-list-item-action>
              <i class="iconfont icon-qianbao"></i>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>我的钱包</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>

          <mu-list-item button>
            <mu-list-item-action>
              <i class="iconfont icon-tubiao309"></i>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>我的积分</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>

          <mu-list-item button>
            <mu-list-item-action>
              <i class="iconfont icon-shoucang"></i>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>我的收藏</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>

          <mu-list-item button @click="outLogin">
            <mu-list-item-action>
              <i class="iconfont icon-dengchu"></i>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>退出登录</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-drawer>
    </mu-container>

    <!-- 底部 -->
    <div class="fixbom">
      <mu-bottom-nav :value.sync="shift" shift>
        <mu-bottom-nav-item to="message" value="message" title="Chat" icon="ondemand_video"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="friends" value="friends" title="通讯录" icon="books"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="find" value="find" title="发现" icon="music_note"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="world" value="world" title="世界" icon="photo"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </div>

    <!-- 路由 -->
    <keep-alive>
      <router-view />
    </keep-alive>

  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import common from "@/mixins/common";
export default {
  mixins: [common],
  computed: {
    ...mapState(["openDrawer"]),
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      shift: "message",
      docked: true,
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
  created() {
    this.shift = this.$route.name;
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.leftMenu{
  z-index: 9999;
}
.router {
  padding-bottom: 56px;
}
.fixbom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
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
