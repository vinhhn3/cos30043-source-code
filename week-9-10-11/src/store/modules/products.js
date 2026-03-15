// Products Module - Manages product state and operations
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "../../api/productApi";

const state = {
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 5,
};

const getters = {
  // Get all products
  allProducts: (state) => state.products,

  // Get total number of products
  productCount: (state) => state.products.length,

  // Calculate page count for pagination
  pageCount: (state) => {
    return Math.ceil(state.products.length / state.itemsPerPage);
  },

  // Get paginated products for current page
  paginatedProducts: (state) => {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    return state.products.slice(start, end);
  },

  // Get loading state
  isLoading: (state) => state.loading,

  // Get error state
  getError: (state) => state.error,

  // Get current page
  getCurrentPage: (state) => state.currentPage,
};

const mutations = {
  // Set all products
  SET_PRODUCTS(state, products) {
    state.products = products;
  },

  // Add a new product to the list
  ADD_PRODUCT(state, product) {
    state.products.push(product);
  },

  // Update an existing product
  UPDATE_PRODUCT(state, updatedProduct) {
    const index = state.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },

  // Remove a product from the list
  DELETE_PRODUCT(state, productId) {
    state.products = state.products.filter((p) => p.id !== productId);
  },

  // Set loading state
  SET_LOADING(state, status) {
    state.loading = status;
  },

  // Set error state
  SET_ERROR(state, error) {
    state.error = error;
  },

  // Clear error
  CLEAR_ERROR(state) {
    state.error = null;
  },

  // Set current page for pagination
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },
};

const actions = {
  // Fetch all products from API
  async fetchProducts({ commit }) {
    commit("SET_LOADING", true);
    commit("CLEAR_ERROR");

    try {
      const response = await getAllProducts();

      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }

      commit("SET_PRODUCTS", response.data);
      console.log("Products loaded:", response.data);
    } catch (error) {
      commit("SET_ERROR", error.message);
      console.error("Error fetching products:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  // Create a new product
  async addProduct({ commit }, productData) {
    commit("SET_LOADING", true);
    commit("CLEAR_ERROR");

    try {
      const response = await createProduct(productData);

      if (response.status !== 201) {
        throw new Error("Failed to add product");
      }

      commit("ADD_PRODUCT", response.data);
      console.log("Product added:", response.data);

      return response.data;
    } catch (error) {
      commit("SET_ERROR", error.message);
      console.error("Error adding product:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  // Delete a product
  async removeProduct({ commit }, productId) {
    commit("SET_LOADING", true);
    commit("CLEAR_ERROR");

    try {
      const response = await deleteProduct(productId);

      if (response.status !== 200) {
        throw new Error("Failed to delete product");
      }

      commit("DELETE_PRODUCT", productId);
      console.log("Product deleted:", productId);
    } catch (error) {
      commit("SET_ERROR", error.message);
      console.error("Error deleting product:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  // Change page (for pagination)
  changePage({ commit }, pageNum) {
    commit("SET_CURRENT_PAGE", pageNum);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
