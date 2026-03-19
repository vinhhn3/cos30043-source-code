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

    <EditProductModal
      :visible="showEditModal"
      :product="selectedProduct"
      @close="handleCloseEditModal"
      @update="handleEditProduct"
    />
  </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../api/productApi";
import AddProductModal from "../components/AddProductModal.vue";
import EditProductModal from "../components/EditProductModal.vue";
import router from "../router";

export default {
  components: {
    Paginate,
    AddProductModal,
    EditProductModal,
  },
  data() {
    return {
      products: [],
      loading: false,
      currentPage: 1,
      itemsPerPage: 5,
      showAddModal: false,
      showEditModal: false,
      selectedProduct: null,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.products.length / this.itemsPerPage);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    },
  },
  
  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await getAllProducts();
        if (response.status !== 200) {
          alert("Failed to fetch products. Please try again.");
          throw new Error("Failed to fetch products");
        }

        this.products = response.data;
        console.log("Products:", response.data);

        localStorage.setItem("products", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },
    handlePageChange(pageNum) {
      this.currentPage = pageNum;
    },
    async addProduct() {
      this.showAddModal = true;
    },
    handleCloseModal() {
      this.showAddModal = false;
    },

    handleCloseEditModal() {
      this.showEditModal = false;
      this.selectedProduct = null;
    },

    async handleAddProduct(productData) {
      console.log("Adding product:", productData);
      const response = await createProduct(productData);
      console.log("Create response:", response);
      if (response.status !== 201) {
        alert("Failed to add product. Please try again.");
        throw new Error("Failed to add product");
      }
      const newProduct = response.data;
      this.products.push(newProduct);
      this.showAddModal = false;
    },
    editProduct(product) {
      // Implementation for editing a product
      // TODO: Show a form pre-filled with product details, allow user to edit, then call API to update product and amend it in the products array
      this.selectedProduct = product;
      this.showEditModal = true;
    },

    async handleEditProduct(updatedProduct) {
      // Implementation for handling the edited product data
      console.log("Updating product:", updatedProduct);
      const response = await updateProduct(updatedProduct.id, updatedProduct);
      console.log("Update response:", response);
      if (response.status !== 200) {
        alert("Failed to update product. Please try again.");
        throw new Error(
          `Failed to update product with ID ${updatedProduct.id}`,
        );
      }
      // Update the product in the products array
      const index = this.products.findIndex(
        (product) => product.id === updatedProduct.id,
      );
      if (index !== -1) {
        this.products.splice(index, 1, response.data);
      }
      this.showEditModal = false;
      this.selectedProduct = null;
    },

    async viewProduct(product) {
      // Implementation for viewing product details
      // TODO
      // Show a modal or navigate to a new page with detailed product information
      router.push(`/products/${product.id}`);
    },

    async handleDeleteProduct(productId) {
      // Implementation for deleting a product
      if (confirm("Are you sure you want to delete this product?")) {
        try {
          const response = await deleteProduct(productId);
          console.log("Delete response:", response);
          if (response.status !== 200) {
            alert("Failed to delete product. Please try again.");
            throw new Error(`Failed to delete product with ID ${productId}`);
          }
          // Remove the deleted product from the products array
          this.products = this.products.filter(
            (product) => product.id !== productId,
          );
        } catch (error) {
          console.error("Error deleting product:", error);
          alert("Failed to delete product. Please try again.");
        }
      }
    },
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
