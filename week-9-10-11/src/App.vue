<template>
  <h1>Full CRUD With Vue.js</h1>
  <nav>
    <RouterLink to="/">Go to Home | </RouterLink>
    <RouterLink to="/about">Go to About | </RouterLink>
    <RouterLink v-if="isAuthenticated" to="/products"
      >Go to Products |
    </RouterLink>

    <RouterLink v-if="!isAuthenticated" to="/login">Go to Login | </RouterLink>
    <RouterLink v-if="isAuthenticated" to="/profile"
      >Go to Profile |
    </RouterLink>

    <RouterLink v-if="isAuthenticated && isAdmin" to="/admin"
      >Go to Admin</RouterLink
    >
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "App",
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    },
  },
  mounted() {
    // Initialize auth state from localStorage on app load
    this.$store.dispatch("auth/initializeAuth");
  },
};
</script>
