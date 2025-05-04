const API_URL = "https://terranova.onrender.com/api";

export const propertyService = {
  async getAllProperties() {
    try {
      const response = await fetch(`${API_URL}/properties`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error;
    }
  },
};
