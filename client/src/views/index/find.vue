<template>
  <div class="container_c">
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
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setOpenDrawer"])
  }
};
</script>

<style>
</style>
