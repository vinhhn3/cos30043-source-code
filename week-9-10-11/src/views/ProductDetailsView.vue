<template>
  <div class="container">
    <div class="header">
      <h1>Product Details</h1>
    </div>

    <div v-if="productDetails.id" class="product-details">
      <div class="product-image-section">
        <div class="image-wrapper">
          <img :src="productDetails.image" :alt="productDetails.title" />
        </div>
      </div>

      <div class="product-info-section">
        <div class="category-badge">{{ productDetails.category }}</div>
        <h2>{{ productDetails.title }}</h2>

        <div class="price-card">
          <span class="price-label">Price</span>
          <span class="price-value">${{ productDetails.price }}</span>
        </div>

        <div v-if="productDetails.rating" class="rating-card">
          <div class="rating-stars">
            <span class="star">⭐</span>
            <span class="rating-value"
              >{{ productDetails.rating.rate }} / 5</span
            >
          </div>
          <span class="rating-count"
            >{{ productDetails.rating.count }} reviews</span
          >
        </div>

        <div class="description-card">
          <h3>Description</h3>
          <p>{{ productDetails.description }}</p>
        </div>
      </div>
    </div>

    <div v-else class="loading-container">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>
  </div>
</template>

<script>
import { getProductById } from "../api/productApi";
import router from "../router";

export default {
  name: "ProductDetailsView",
  data() {
    return {
      productDetails: {},
    };
  },

  mounted() {
    const productId = this.$route.params.id;
    this.fetchProductDetails(productId);
  },

  methods: {
    async fetchProductDetails(productId) {
      try {
        const response = await getProductById(productId);
        console.log(response);
        if (response.status !== 200 || !response.data || response.data === "") {
          alert("Failed to fetch product details. Please try again.");
          throw new Error(`Failed to fetch product with ID ${productId}`);
        }
        this.productDetails = response.data;
      } catch (error) {
        console.error("Error fetching product details:", error);
        router.push("/not-found");
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeInDown 0.6s ease-out;
}

.header h1 {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0;
}

.product-details {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.8s ease-out;
}

/* Image Section */
.product-image-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper {
  width: 100%;
  max-width: 450px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-wrapper:hover {
  transform: scale(1.05);
}

.product-details img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  display: block;
}

/* Info Section */
.product-info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.category-badge {
  display: inline-block;
  align-self: flex-start;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4);
}

.product-info-section h2 {
  color: #2d3748;
  font-size: 2rem;
  line-height: 1.3;
  margin: 0;
  font-weight: 700;
}

/* Price Card */
.price-card {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 20px rgba(67, 233, 123, 0.3);
}

.price-label {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.price-value {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Rating Card */
.rating-card {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 20px rgba(250, 112, 154, 0.3);
}

.rating-stars {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.star {
  font-size: 1.5rem;
}

.rating-value {
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 700;
}

.rating-count {
  color: #2d3748;
  font-size: 0.95rem;
  font-weight: 500;
}

/* Description Card */
.description-card {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.description-card h3 {
  color: #667eea;
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.description-card p {
  color: #4a5568;
  line-height: 1.8;
  margin: 0;
  font-size: 1rem;
}

/* Add to Cart Button */
.add-to-cart-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.add-to-cart-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

.add-to-cart-btn:active {
  transform: translateY(-1px);
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1.5rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-container p {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 500;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 968px) {
  .product-details {
    grid-template-columns: 1fr;
    padding: 2rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .product-info-section h2 {
    font-size: 1.6rem;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 1rem 0.5rem;
  }

  .product-details {
    padding: 1.5rem;
  }

  .header h1 {
    font-size: 1.6rem;
  }

  .product-info-section h2 {
    font-size: 1.3rem;
  }

  .price-value {
    font-size: 2rem;
  }

  .image-wrapper {
    padding: 1.5rem;
  }
}
</style>
