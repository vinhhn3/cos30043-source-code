import { createRouter, createWebHistory } from "vue-router";

import AboutView from "../views/AboutView.vue";
import AdminView from "../views/AdminView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProductView from "../views/ProductView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
  { path: "/", component: HomeView, meta: { requiresAuth: false } },
  { path: "/about", component: AboutView, meta: { requiresAuth: false } },
  {
    path: "/products",
    component: ProductView,
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  {
    path: "/profile",
    component: ProfileView,
    meta: { requiresAuth: true, requiresAdmin: false },
  },
  { path: "/login", component: LoginView, meta: { requiresAuth: false } },
  {
    path: "/admin",
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Get auth state from localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Check if route requires authentication
  const requiresAuth = to.meta.requiresAuth;
  const requiresAdmin = to.meta.requiresAdmin;

  // Route logic
  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    alert("Please login to access this page");
    next("/login");
  } else if (requiresAdmin && !isAdmin) {
    // Redirect if trying to access admin page without admin role
    alert("Access denied. Admin privileges required.");
    next("/");
  } else {
    // Allow navigation
    next();
  }
});

export default router;
