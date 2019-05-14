<template>
  <div class="container_c">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="$router.goBack">
        <i class="iconfont icon-back"></i>
      </mu-button>
      {{$route.meta.title}}
    </mu-appbar>

    <div class="search">
      <mu-text-field type="tel" v-model="tel" fullWidth label="UserName" label-float help-text="用户账号为手机号" :action-click="onSearch" action-icon="search" icon="account_circle"></mu-text-field>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { tel: "15111327689" };
  },
  methods: {
    //   查询用户账号tel
    onSearch() {
      this.$router.push({
        path: "/friendsInfo",
        query: {
          tel: this.tel
        }
      });
    }
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
