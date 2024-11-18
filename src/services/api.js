import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_SERVER || 'http://noapi';

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
    throw new Error('Failed to fetch data');
  } else if (error.request) {
    throw new Error('No response from the server');
  } else {
    throw new Error('Request failed');
  }
};

export const get = async (endPoint) => {
  try {
    if (!(await hasInternetConnection())) {
      throw new Error("No internet connection");
    }
    const response = await axios.get(`${baseUrl}${endPoint}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

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
