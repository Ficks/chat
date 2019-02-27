<template>
    <div class="container_c">
        <mu-appbar style="width: 100%;" color="primary">
          <mu-button icon slot="left" @click="$router.back(-1)">
            <i class="iconfont icon-back"></i>
          </mu-button>
          添加好友
        </mu-appbar>

        <div class="search">
            <mu-text-field v-model="tel" fullWidth label="UserName"  label-float help-text="用户账号为手机号" :action-click="onSearch" action-icon="search" icon="account_circle"></mu-text-field>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return { tel: "" };
  },
  methods: {
    //   查询用户账号tel
    onSearch() {}
  }
};
</script>

<style lang="less" scoped>
.search {
  padding-top: 0.266667rem /* 20/75 */;
  padding-right: 20px;
  box-sizing: border-box;
}
</style>
