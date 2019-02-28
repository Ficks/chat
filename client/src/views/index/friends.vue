<template>
<div class="container_c">
        <!-- 标题 -->
        <mu-appbar style="width: 100%;" color="primary">
          <mu-button icon slot="left" @click="openDrawer=true">
              <mu-icon value="menu"></mu-icon>
          </mu-button>
          通讯录
          <mu-button icon slot="right" to="/addFriends">
            <i class="iconfont icon-tianjia"></i>
          </mu-button>
        </mu-appbar>


        <mu-paper :z-depth="1" class="demo-list-wrap">
  <mu-list>
    <mu-sub-header>星标朋友</mu-sub-header>
    <mu-list-item avatar button>
      <mu-list-item-action>
        <mu-avatar>
          <img src="@/assets/headImg.jpg">
        </mu-avatar>
      </mu-list-item-action>
      <mu-list-item-title>Mike Li</mu-list-item-title>
      <mu-list-item-action>
        <mu-icon value="chat_bubble"></mu-icon>
      </mu-list-item-action>
    </mu-list-item>
    <mu-list-item avatar button>
      <mu-list-item-action>
        <mu-avatar>
          <img src="@/assets/headImg.jpg">
        </mu-avatar>
      </mu-list-item-action>
      <mu-list-item-title>Maco Mai</mu-list-item-title>
      <mu-list-item-action>
        <mu-icon value="chat_bubble"></mu-icon>
      </mu-list-item-action>
    </mu-list-item>
    <mu-list-item avatar button>
      <mu-list-item-action>
        <mu-avatar>
          <img src="@/assets/headImg.jpg">
        </mu-avatar>
      </mu-list-item-action>
      <mu-list-item-title>Alex Qin</mu-list-item-title>
      <mu-list-item-action>
        <mu-icon value="chat_bubble"></mu-icon>
      </mu-list-item-action>
    </mu-list-item>
    <mu-list-item avatar button>
      <mu-list-item-action>
        <mu-avatar>
          <img src="@/assets/headImg.jpg">
        </mu-avatar>
      </mu-list-item-action>
      <mu-list-item-title>Allen Qun</mu-list-item-title>
      <mu-list-item-action>
        <mu-icon value="chat_bubble"></mu-icon>
      </mu-list-item-action>
    </mu-list-item>
    <mu-list-item avatar button>
      <mu-list-item-action>
        <mu-avatar>
          <img src="@/assets/headImg.jpg">
        </mu-avatar>
      </mu-list-item-action>
      <mu-list-item-title>Myron Liu</mu-list-item-title>
      <mu-list-item-action>
        <mu-icon value="chat_bubble"></mu-icon>
      </mu-list-item-action>
    </mu-list-item>
  </mu-list>
  <mu-divider></mu-divider>
  <mu-list>
    <mu-sub-header>History</mu-sub-header>
    <mu-list-item avatar button>
      <mu-list-item-action>
        <mu-avatar>
          <img src="@/assets/headImg.jpg">
        </mu-avatar>
      </mu-list-item-action>
      <mu-list-item-title>Gaia Zhou</mu-list-item-title>
      <mu-list-item-action>
        <mu-icon value="chat_bubble"></mu-icon>
      </mu-list-item-action>
    </mu-list-item>
    <mu-list-item avatar button>
      <mu-list-item-action>
        <mu-avatar>
          <img src="@/assets/headImg.jpg">
        </mu-avatar>
      </mu-list-item-action>
      <mu-list-item-title>Miller Wang</mu-list-item-title>
      <mu-list-item-action>
        <mu-icon value="chat_bubble"></mu-icon>
      </mu-list-item-action>
    </mu-list-item>
  </mu-list>
</mu-paper>
</div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
</style>
