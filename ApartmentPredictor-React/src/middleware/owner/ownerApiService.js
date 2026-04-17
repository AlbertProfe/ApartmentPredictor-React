import axios from "axios";
import ENDPOINTS from "../config/endpoints";

const OwnerApiService = {
  getAllOwners: async () => {
    try {
      const response = await axios.get(ENDPOINTS.owner.getAll);
      return response.data;
    } catch (error) {
      console.error("Error fetching owners:", error);
      throw error;
    }
  },

  getOwnerById: async (ownerId) => {
    try {
      const response = await axios.get(ENDPOINTS.owner.getById(ownerId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching owner ${ownerId}:`, error);
      throw error;
    }
  },

  createOwner: async (owner) => {
    try {
      const response = await axios.post(ENDPOINTS.owner.create, owner);
      return response.data;
    } catch (error) {
      console.error("Error creating owner:", error);
      throw error;
    }
  },

  updateOwner: async (owner) => {
    try {
      const response = await axios.post(ENDPOINTS.owner.update, owner);
      return response.data;
    } catch (error) {
      console.error(`Error updating owner ${owner.id}:`, error);
      throw error;
    }
  },

  deleteOwner: async (ownerId) => {
    try {
      const response = await axios.delete(ENDPOINTS.owner.deleteById(ownerId));
      return response.data;
    } catch (error) {
      console.error(`Error deleting owner ${ownerId}:`, error);
      throw error;
    }
  },
};

export default OwnerApiService;
