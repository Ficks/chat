<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url("./App.less");

.tips {
  text-align: center;
  padding: 20px;
  color: #ccc;
}
</style>
