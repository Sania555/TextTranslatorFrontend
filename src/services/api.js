import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error; 
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data; 
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const translateText = async (text, token) => {
  try {
    const response = await fetch(`${API_URL}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Translation failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Translate API Error:", error.message);
    throw error;
  }
};

export const getTranslationHistory = async (token) => {
  try {
    const response = await fetch(`${API_URL}/translate/history`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch history");
    }

    return await response.json();
  } catch (error) {
    console.error("History API Error:", error.message);
    throw error;
  }
};