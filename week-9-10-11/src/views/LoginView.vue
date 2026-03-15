<template>
  <h1>Login</h1>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit">Login</button>
  </form>
  <p v-if="loading">Logging in...</p>
</template>

<script>
import router from "../router/index";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    loading() {
      return this.$store.getters["auth/isLoading"];
    },
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store.dispatch("auth/login", {
          username: this.username,
          password: this.password,
        });

        alert("Login successful!");
        router.push("/profile");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials and try again.");
      }
    },
  },
};
</script>
