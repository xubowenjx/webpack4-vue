import Vue from "vue";
import vueRouter from "vue-router";
Vue.use(vueRouter);
const router = new vueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "@/view/home.vue")
    },
    {
      path: "/sub",
      name: "sub",
      component: () => import(/* webpackChunkName: "sub" */ "@/view/sub.vue")
    }
  ]
});

export default router;
