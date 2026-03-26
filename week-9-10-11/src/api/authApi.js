import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

// User Login

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export { loginUser };
