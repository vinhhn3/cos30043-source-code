import { createRouter, createWebHistory } from "vue-router";

import AboutView from "../views/AboutView.vue";
import AdminView from "../views/AdminView.vue";
import HomeView from "../views/HomeView.vue";
import ProductView from "../views/ProductView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  { path: "/products", component: ProductView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
