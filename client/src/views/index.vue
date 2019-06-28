<template>
  <div class="rel">

    <!-- 不能叠加两层有绝对定位 -->
    <transition :name='transitionName'>
      <router-view class="Router" />
    </transition>
    <!-- <transition :name='transitionName'>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="Router" />
      </keep-alive>
    </transition> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-left',
    };
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = 'slide-right';
    } else {
      this.transitionName = 'slide-left';
    }
    setTimeout(() => {
      this.$router.isBack = false;
      next();
    }, 60);
  },
  created() {},
};
</script>
</script>
<style lang="less" scoped>
// 页面动画
.rel {
  position: relative;
  height: 100%;
  width: 100%;
  // overflow: hidden;
}

.Router {
  padding-top: 56px; /*no*/
  box-sizing: border-box;
  position: absolute;
  top: 0;
  background: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

// // 安卓切换效果
// .slide-left-enter, .slide-right-leave-active {
//   opacity: 0;
//   -webkit-transform: translate(50px, 0);
//   transform: translate(50px, 0);
// }
// .slide-left-leave-active, .slide-right-enter {
//   opacity: 0;
//   -webkit-transform: translate(-50px, 0);
//   transform: translate(-50px, 0);
// }

// IOS切换效果
.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  z-index: 1;
}
.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translateX(-50px);
  transform: translateX(-50px);
  z-index: -1;
}
</style>
