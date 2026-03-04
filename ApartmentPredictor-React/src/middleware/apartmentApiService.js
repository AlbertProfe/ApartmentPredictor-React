import axios from "axios";

const API_BASE_URL = ""; // Your API base URL, currently using relative paths

const ApartmentApiService = {
  getAllApartments: async () => {
    try {
      const response = await axios.get("/api/apartment/getAll");
      console.log("API Response:", response);
      console.log("Apartments Data:", response.data);
      console.log("First Apartment:", response.data[0]);
      console.log("Headers", response.headers);
      console.log("Headers date", response.headers.date);
      console.log("Status", response.status);
      return response.data;
    } catch (error) {
      console.error("Error fetching apartments:", error);
      throw error;
    }
  },

  // Add other apartment-related API methods here as needed
  // createApartment: async (apartment) => { ... },
  // updateApartment: async (apartment) => { ... },
  // deleteApartment: async (apartmentId) => { ... },
};

export default ApartmentApiService;