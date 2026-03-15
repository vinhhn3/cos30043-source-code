// Main Vuex Store - Combines all modules
import { createStore } from "vuex";
import auth from "./modules/auth";
import products from "./modules/products";

const store = createStore({
  modules: {
    products,
    auth,
  },

  // Enable strict mode in development (warns about state mutations outside mutations)
  strict: process.env.NODE_ENV !== "production",
});

export default store;
