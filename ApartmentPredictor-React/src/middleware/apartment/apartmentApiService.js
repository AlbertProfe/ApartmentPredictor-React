import axios from "axios";
import ENDPOINTS from "../config/endpoints";

const ApartmentApiService = {
  getAllApartments: async () => {
    try {
      const response = await axios.get(ENDPOINTS.apartment.getAll);
      return response.data;
    } catch (error) {
      console.error("Error fetching apartments:", error);
      throw error;
    }
  },

  getApartmentById: async (apartmentId) => {
    try {
      const response = await axios.get(ENDPOINTS.apartment.getById(apartmentId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching apartment ${apartmentId}:`, error);
      throw error;
    }
  },

  createApartment: async (apartment) => {
    try {
      const response = await axios.post(ENDPOINTS.apartment.create, apartment);
      return response.data;
    } catch (error) {
      console.error("Error creating apartment:", error);
      throw error;
    }
  },

  updateApartment: async (apartment) => {
    try {
      const response = await axios.post(ENDPOINTS.apartment.update, apartment);
      return response.data;
    } catch (error) {
      console.error(`Error updating apartment ${apartment.id}:`, error);
      throw error;
    }
  },

  deleteApartment: async (apartmentId) => {
    try {
      const response = await axios.delete(ENDPOINTS.apartment.deleteById(apartmentId));
      return response.data;
    } catch (error) {
      console.error(`Error deleting apartment ${apartmentId}:`, error);
      throw error;
    }
  },

  filterApartments: async (filters) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => Boolean(value))
      );
      const response = await axios.get(ENDPOINTS.apartment.filter, { params: cleanParams });
      return response.data;
    } catch (error) {
      console.error("Error filtering apartments:", error);
      throw error;
    }
  },
};

export default ApartmentApiService;
