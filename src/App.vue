<template>
  <layout></layout>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      message: "hello Vue"
    };
  },
  mounted() {
    console.log(...[1, 2, 3]);
  },
  components: {
    layout: () => import(/* webpackChunkName: "layout" */ "./layout/layout.vue")
  }
};
</script>
<style lang="less" scoped>
@import url("./App.less");
</style>