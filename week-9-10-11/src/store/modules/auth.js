// Auth Module - Manages authentication state and operations
import { loginUser } from "../../api/authApi";

const state = {
  user: {
    username: localStorage.getItem("username") || "",
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    isAdmin: localStorage.getItem("isAdmin") === "true",
  },
  loading: false,
  error: null,
};

const getters = {
  // Get current user
  currentUser: (state) => state.user,

  // Check if user is authenticated
  isAuthenticated: (state) => state.user.isAuthenticated,

  // Get username
  username: (state) => state.user.username,

  // Check if user is admin
  isAdmin: (state) => state.user.isAdmin,

  // Get loading state
  isLoading: (state) => state.loading,

  // Get error
  getError: (state) => state.error,
};

const mutations = {
  // Set user data (login)
  SET_USER(state, userData) {
    state.user.username = userData.username;
    state.user.isAuthenticated = true;
    state.user.isAdmin = userData.isAdmin;

    // Persist to localStorage
    localStorage.setItem("username", userData.username);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("isAdmin", userData.isAdmin ? "true" : "false");
  },

  // Clear user data (logout)
  CLEAR_USER(state) {
    state.user.username = "";
    state.user.isAuthenticated = false;
    state.user.isAdmin = false;

    // Remove from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isAdmin");
  },

  // Set loading state
  SET_LOADING(state, status) {
    state.loading = status;
  },

  // Set error
  SET_ERROR(state, error) {
    state.error = error;
  },

  // Clear error
  CLEAR_ERROR(state) {
    state.error = null;
  },
};

const actions = {
  // Login user
  async login({ commit }, credentials) {
    commit("SET_LOADING", true);
    commit("CLEAR_ERROR");

    try {
      const response = await loginUser(
        credentials.username,
        credentials.password,
      );

      if (response.status !== 201) {
        throw new Error("Login failed. Please check your credentials.");
      }

      // Determine if user is admin (you can modify this logic)
      const isAdmin = credentials.username === "kevinryan";

      commit("SET_USER", {
        username: credentials.username,
        isAdmin: isAdmin,
      });

      console.log("Login successful:", credentials.username);
      return true;
    } catch (error) {
      commit("SET_ERROR", error.message);
      console.error("Login error:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  // Logout user
  logout({ commit }) {
    commit("CLEAR_USER");
    console.log("User logged out");
  },

  // Initialize auth state from localStorage (on app load)
  initializeAuth({ commit }) {
    const username = localStorage.getItem("username");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (isAuthenticated && username) {
      commit("SET_USER", {
        username: username,
        isAdmin: isAdmin,
      });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
