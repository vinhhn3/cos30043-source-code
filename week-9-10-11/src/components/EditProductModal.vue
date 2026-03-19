<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edit Product</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitProduct">
          <div class="form-group">
            <label for="edit-title">Title:</label>
            <input
              id="edit-title"
              v-model="editedProduct.title"
              type="text"
              required
              placeholder="Enter product title"
            />
          </div>
          <div class="form-group">
            <label for="edit-price">Price:</label>
            <input
              id="edit-price"
              v-model.number="editedProduct.price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="Enter price"
            />
          </div>
          <div class="form-group">
            <label for="edit-category">Category:</label>
            <select
              id="edit-category"
              v-model="editedProduct.category"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="jewelery">jewelery</option>
              <option value="electronics">electronics</option>
              <option value="men's clothing">men's clothing</option>
              <option value="women's clothing">women's clothing</option>
            </select>
          </div>
          <div class="form-group">
            <label for="edit-description">Description:</label>
            <textarea
              id="edit-description"
              v-model="editedProduct.description"
              rows="4"
              required
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="edit-image">Image URL:</label>
            <input
              id="edit-image"
              v-model="editedProduct.image"
              type="url"
              required
              placeholder="Enter image URL"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn-submit">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditProductModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
      default: () => ({
        id: null,
        title: "",
        price: 0,
        category: "",
        description: "",
        image: "",
      }),
    },
  },
  data() {
    return {
      editedProduct: {
        id: null,
        title: "",
        price: 0,
        category: "",
        description: "",
        image: "",
      },
    };
  },
  watch: {
    product: {
      handler(newProduct) {
        if (newProduct && newProduct.id) {
          this.editedProduct = { ...newProduct };
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    submitProduct() {
      console.log("Submitting updated product:", this.editedProduct);
      this.$emit("update", { ...this.editedProduct });
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  width: 90%;
  max-width: 550px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px 16px 0 0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.75rem;
  color: #ffffff;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #ffffff;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.875rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: #ffffff;
  color: #2d3748;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23667eea' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-cancel,
.btn-submit {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: linear-gradient(135deg, #718096 0%, #4a5568 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(113, 128, 150, 0.3);
}

.btn-cancel:hover {
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(113, 128, 150, 0.4);
}

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-submit:hover {
  background: linear-gradient(135deg, #5568d3 0%, #6a3f91 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn-cancel:active,
.btn-submit:active {
  transform: translateY(0);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scrollbar Styling */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5568d3 0%, #6a3f91 100%);
}

/* Responsive Design */
@media (max-width: 640px) {
  .modal-content {
    width: 95%;
    max-width: none;
  }

  .modal-header {
    padding: 1.25rem 1.5rem;
  }

  .modal-header h2 {
    font-size: 1.4rem;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-footer {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-submit {
    width: 100%;
  }
}
</style>
