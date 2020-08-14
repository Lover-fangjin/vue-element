import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login";
import Displace from "../views/alarm/Displace.vue";
import WallVertical from "../views/alarm/WallVertical.vue";
import WallHertical from "../views/alarm/WallHertical.vue";
import SurfaceDis from "../views/alarm/SurfaceDis.vue";
import Buildings from "../views/alarm/Buildings.vue";
import Tmp from "../views/alarm/Tmp.vue";

import Dendrogram from '../views/antv/Dendrogram.vue'
import DragNodeTree from '../views/antv/DragNodeTree.vue' 

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/home/displace",
        name: "Displace",
        component: Dendrogram,
      },
      {
        path: "/home/wallVertical",
        name: "wallVertical",
        component: DragNodeTree,
      },
      {
        path: "/home/wallHertical",
        name: "wallHertical",
        component: Tmp,
      },
      {
        path: "/home/surfaceDis",
        name: "surfaceDis",
        component: Tmp,
      },
      {
        path: "/home/buildings",
        name: "buildings",
        component: Tmp,
      },
      {
        path: "/home/tmp",
        name: "tmp",
        component: Tmp ,
      },
      { path: '*', redirect: '/home/tmp', hidden: true }
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
