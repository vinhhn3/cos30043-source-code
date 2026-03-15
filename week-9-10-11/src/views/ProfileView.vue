<template>
  <h1>Profile Page</h1>
  <p>Welcome, {{ username }}!</p>
  <button @click="handleLogout">Logout</button>
</template>

<script>
import router from "../router/index";

export default {
  name: "ProfileView",
  computed: {
    username() {
      return this.$store.getters["auth/username"] || "Not logged in";
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout");
      router.push("/");
    },
  },
};
</script>
