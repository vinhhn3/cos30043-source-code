<template>
  <div>
    <h1>Product Page</h1>
    <button @click="fetchProducts">Get All Products</button> |
    <button @click="addProduct">Add Product</button>

    <div v-if="products.length > 0" style="margin-top: 20px">
      <table
        border="1"
        cellpadding="10"
        cellspacing="0"
        style="width: 100%; border-collapse: collapse"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in paginatedProducts" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.title }}</td>
            <td>${{ product.price }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.category }}</td>
            <td>
              <img
                :src="product.image"
                :alt="product.title"
                style="width: 50px; height: 50px; object-fit: cover"
              />
            </td>
            <td>
              <button @click="editProduct(product)">Edit</button>
              <button @click="handleDeleteProduct(product.id)">Delete</button>
              <button @click="viewProduct(product)">View</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Component -->
      <div style="margin-top: 20px; display: flex; justify-content: center">
        <paginate
          :page-count="pageCount"
          :page-range="3"
          :margin-pages="2"
          :click-handler="handlePageChange"
          :prev-text="'Previous'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-class="'page-item'"
          :next-link-class="'page-link'"
          :active-class="'active'"
        >
        </paginate>
      </div>
    </div>
    <div v-if="loading">Loading...</div>

    <!-- Add Product Modal -->
    <AddProductModal
      :visible="showAddModal"
      @close="handleCloseModal"
      @add="handleAddProduct"
    />
  </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";
import AddProductModal from "../components/AddProductModal.vue";

export default {
  components: {
    Paginate,
    AddProductModal,
  },
  data() {
    return {
      showAddModal: false,
    };
  },
  computed: {
    // Get data from Vuex store
    products() {
      return this.$store.getters["products/allProducts"];
    },
    loading() {
      return this.$store.getters["products/isLoading"];
    },
    pageCount() {
      return this.$store.getters["products/pageCount"];
    },
    paginatedProducts() {
      return this.$store.getters["products/paginatedProducts"];
    },
    currentPage() {
      return this.$store.getters["products/getCurrentPage"];
    },
  },
  methods: {
    async fetchProducts() {
      try {
        await this.$store.dispatch("products/fetchProducts");
      } catch (error) {
        alert("Failed to fetch products. Please try again.");
      }
    },
    handlePageChange(pageNum) {
      this.$store.dispatch("products/changePage", pageNum);
    },
    async addProduct() {
      this.showAddModal = true;
    },
    handleCloseModal() {
      this.showAddModal = false;
    },
    async handleAddProduct(productData) {
      try {
        await this.$store.dispatch("products/addProduct", productData);
        this.showAddModal = false;
        alert("Product added successfully!");
      } catch (error) {
        alert("Failed to add product. Please try again.");
      }
    },
    async editProduct(product) {
      // Implementation for editing a product
      // TODO: Show a form pre-filled with product details, allow user to edit, then call API to update product and amend it in the products array
    },

    async viewProduct(product) {
      // Implementation for viewing product details
      // TODO
      // Show a modal or navigate to a new page with detailed product information
      console.log(product);
    },

    async handleDeleteProduct(productId) {
      // Implementation for deleting a product
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          await this.$store.dispatch("products/removeProduct", productId);
          alert("Product deleted successfully!");
        } catch (error) {
          alert("Failed to delete product. Please try again.");
        }
      }
    },
  },
  mounted() {
    // Load products when component mounts
    this.fetchProducts();
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  gap: 5px;
}

.page-item {
  display: inline-block;
}

.page-link {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.page-link:hover {
  background-color: #007bff;
  color: white;
}

.page-item.active .page-link {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.page-item.disabled .page-link {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
