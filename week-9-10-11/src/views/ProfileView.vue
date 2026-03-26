<template>
  <h1>Profile Page</h1>
  <p>Welcome, {{ username }}!</p>
  <button @click="handleLogout">Logout</button>
</template>

<script>
import router from "../router/index";
export default {
  name: "ProfileView",
  data() {
    return {
      username: localStorage.getItem("username") || "Not logged in",
    };
  },

  methods: {
    handleLogout() {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
      this.username = "Not logged in";
      router.push("/");
    },
  },
};
</script>
