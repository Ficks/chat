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
      <mu-load-more @refresh="refresh" :refreshing="searchLoad.refreshing" :loading="searchLoad.loading" @load="load">
        <!-- 聊天 -->
        <mu-paper :z-depth="1" class="demo-list-wrap">
          <mu-list textline="three-line">
            <!-- <mu-sub-header>今天</mu-sub-header> -->
            <mu-list-item avatar to="/chat/12" v-for="(item,index) in listArr" button>
              <mu-list-item-action>
                <mu-avatar>
                  <img :src="userInfo.sysPath+item.headImg">
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{item.nickName}}</mu-list-item-title>
                <mu-list-item-sub-title>
                  <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </mu-paper>
      </mu-load-more>
    </div>

  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import common from "@/mixins/common";
import listArr from "@/mixins/listArr";
import chatListApi from '@/api/chatList'
export default {
  mixins: [common, listArr],
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
    ...mapMutations(["setOpenDrawer"]),
    outLogin() {
      // 退出登录
      this.$router.push({ path: "/login" });
    }
  },
	created(){
		chatListApi.getChatList(this.searchList).then(data=>{
			console.log(data)
			this.afterGetList(data)
		})
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
