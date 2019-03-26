<template>
  <div class="container_c">
    <!-- 标题 -->
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="openDrawer=true">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      发现
      <mu-button icon slot="right" to="/addFriends">
        <i class="iconfont icon-tianjia"></i>
      </mu-button>
    </mu-appbar>
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
