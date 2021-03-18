import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/devis",
    name: "Devis",
    component: () =>
      import("../views/Devis.vue"),
  },
  {
    path: "/client",
    name: "Client",
    component: () =>
      import("../views/Client.vue"),
  },
  {
    path: "/client/:id",
    name: "ClientUpdate",
    component: () =>
      import("../views/ClientUpdate.vue"),
  },
  {
    path: "/clientsliste",
    name: "ClientsListe",
    component: () =>
      import("../views/ClientsListe.vue"),
  },
  {
    path: "/product",
    name: "Product",
    component: () =>
      import("../views/Product.vue"),
  },
  {
    path: "/parametres",
    name: "Parametres",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Parametres.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
