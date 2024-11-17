import axios from 'axios';

const baseUrl = process.env.API_SERVER || 'http://noapi';

// Check for internet connection
const hasInternetConnection = async () => {
  try {
    const response = await axios.head(baseUrl);
    return response.status === 200;
  } catch (e) {
    throw new Error('Check your internet connection');
  }
};

const handleError = (error) => {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    throw new Error('Failed to fetch data');
  } else if (error.request) {
    // Request was made, but no response was received
    throw new Error('No response from the server');
  } else {
    // Something else happened in setting up the request
    throw new Error('Request failed');
  }
};

// GET Request
export const get = async (endPoint) => {
  try {
    if (!(await hasInternetConnection())) {
      throw new Error("No internet connection");
    }
    console.log(baseUrl,endPoint)
    const response = await axios.get(`${baseUrl}${endPoint}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// POST Request
export const post = async (endPoint, data) => {
  try {
    if (!(await hasInternetConnection())) {
      throw new Error("No internet connection");
    }

    const response = await axios.post(`${baseUrl}${endPoint}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// PUT Request
export const put = async (endPoint, data) => {
  try {
    if (!(await hasInternetConnection())) {
      throw new Error("No internet connection");
    }

    const response = await axios.put(`${baseUrl}${endPoint}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// DELETE Request
export const deleteRequest = async (endPoint) => {
  try {
    if (!(await hasInternetConnection())) {
      throw new Error("No internet connection");
    }

    const response = await axios.delete(`${baseUrl}${endPoint}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
