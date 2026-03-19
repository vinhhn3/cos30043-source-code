import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (id) => {
  // TODO: Implement the getProductById function using axios.get
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response;
  } catch (error) {
    alert(`Error fetching product with ID ${id}: ${error.message}`);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData);
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Update a product (PUT - full update)
export const updateProduct = async (id, productData) => {
  // TODO: Implement the updateProduct function using axios.put
  try {
    const response = await axios.put(
      `${API_BASE_URL}/products/${id}`,
      productData,
    );
    return response;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }

  return response;
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
