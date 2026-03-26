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
import { loginUser } from "../api/authApi";
import router from "../router/index";
export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      // Implement your login logic here
      console.log({
        username: this.username,
        password: this.password,
      });
      // You can also make an API call to authenticate the user
      try {
        const response = await loginUser(this.username, this.password);
        console.log(response);
        if (response.status !== 201) {
          alert("Login failed. Please check your credentials and try again.");
          throw new Error("Login failed");
        }

        alert("Login successful!");
        this.loading = false;

        // Set authentication state (this is just a simple example, you should use a more secure method in a real application)
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", this.username);
        localStorage.setItem(
          "isAdmin",
          this.username === "kevinryan" ? "true" : "false",
        );
        router.push("/profile");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials and try again.");
        this.loading = false;
      }
    },
  },
};
</script>
