import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Index.vue";
import Login from "../views/login";
import NotFound from "../views/Tmp.vue";
import Tenant from '../views/basic/tenant/Tenant'

import basics from './basic' //基础管理
import Bb from '../views/basic'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title:'首页'},
    children: [
      {
        path: "/manage",
        name: "Manage",
        component: Bb,
        children:basics,
        meta: { title:'基础管理'},
      },
      {
        path: "/manage/tmp",
        name: "NotFound",
        component: NotFound,
      },
      { path: '*', redirect: '/manage/tmp', hidden: true }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  routes
});

export default router;
