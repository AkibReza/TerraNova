import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch properties"
    );
  }
};

export const addProperty = async (propertyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/properties`,
      propertyData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add property");
  }
};
