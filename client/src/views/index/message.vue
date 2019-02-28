<template>
    <div class="container_c">
        <!-- 标题 -->
        <mu-appbar style="width: 100%;" color="primary">
          <mu-button icon slot="left" @click="openDrawer=true">
              <mu-icon value="menu"></mu-icon>
          </mu-button>
          Chat
          <mu-button icon slot="right" to="/addFriends">
            <i class="iconfont icon-tianjia"></i>
          </mu-button>
        </mu-appbar>
        

    <!-- 聊天 -->
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-list textline="three-line">
        <mu-sub-header>今天</mu-sub-header>
        <mu-list-item avatar to="/chat" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>这个周末一起吃饭么?</mu-list-item-title>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar to="/chat" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>Alex Qin</mu-list-item-title>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .87)">看电影啊</span><br/>
              我们去看电影，最近有部烂片上映，又有吐槽的了
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar to="/chat" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>LOL</mu-list-item-title>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .87)">去打游戏啊</span><br/>
              周末一起 LOL
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar to="/chat" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="@/assets/headImg.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>LOL</mu-list-item-title>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .87)">哇去</span><br/>
              实在编不下去，这就是个demo
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
  </mu-paper>

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
