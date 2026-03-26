import { createRouter, createWebHistory } from "vue-router";

import AboutView from "../views/AboutView.vue";
import AdminView from "../views/AdminView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProductView from "../views/ProductView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  { path: "/products", component: ProductView },
  { path: "/profile", component: ProfileView },
  { path: "/login", component: LoginView },
  { path: "/admin", component: AdminView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
