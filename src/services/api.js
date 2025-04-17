import axios from 'axios';
import { toast } from 'react-toastify';

// Base URL from environment variable or default to local development
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.singidablackstars.com';

// Create axios instance with default configs
const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  config => {
    // You can add auth tokens here if needed in the future
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const message = 
      error.response?.data?.message || 
      "Network error. Please check your connection.";
    
    console.error("API Error:", error);
    toast.error(message);
    
    return Promise.reject(error);
  }
);

/**
 * Make a GET request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} params - URL parameters
 */
export const get = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`GET ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Make a POST request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request payload
 */
export const post = async (endpoint, data = {}) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`POST ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Make a PUT request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request payload
 */
export const put = async (endpoint, data = {}) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`PUT ${endpoint} failed:`, error);
    throw error;
  }
};

/**
 * Make a DELETE request to the API
 * @param {string} endpoint - API endpoint
 */
export const deleteRequest = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error(`DELETE ${endpoint} failed:`, error);
    throw error;
  }
};