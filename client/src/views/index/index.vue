<template>
  <div class="container_c">
    <!-- 左侧菜单 -->
    <mu-container>
      <mu-drawer :open.sync="openDrawer" :docked="docked" :right="position === 'right'">
        <div class="top">
          <div class="headimg">
            <img v-if="userInfo.headImg" :src="userInfo.headImg" alt="">
            <img v-else src="../../assets/headImg.jpg" alt="">
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
        <mu-bottom-nav-item to="message" value="movies" title="Chat" icon="ondemand_video"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="friends" value="books" title="通讯录" icon="books"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="find" value="music" title="发现" icon="music_note"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="world" value="pictures" title="世界" icon="photo"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </div>

    <!-- 路由 -->
    <keep-alive>
      <router-view />
    </keep-alive>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import common from "@/mixins/common";
export default {
  mixins: [common],
  computed: {
    ...mapGetters(["userInfo"])
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
    outLogin() {
      // 退出登录
      this.$router.push({ path: "/login" });
    }
  },
  mounted() {
    console.log(this.userInfo);
  }
};
</script>
<style lang="less" scoped>
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
