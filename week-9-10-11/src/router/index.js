import { createRouter, createWebHistory } from "vue-router";

import AboutView from "../views/AboutView.vue";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";
import ProductDetailsView from "../views/ProductDetailsView.vue";
import ProductView from "../views/ProductView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  { path: "/products", component: ProductView },
  { path: "/products/:id", component: ProductDetailsView },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
