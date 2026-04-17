import axios from "axios";
import ENDPOINTS from "../config/endpoints";

const ReviewerApiService = {
  getAllReviewers: async () => {
    try {
      const response = await axios.get(ENDPOINTS.reviewer.getAll);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviewers:", error);
      throw error;
    }
  },

  getReviewerById: async (reviewerId) => {
    try {
      const response = await axios.get(ENDPOINTS.reviewer.getById(reviewerId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviewer ${reviewerId}:`, error);
      throw error;
    }
  },

  createReviewer: async (reviewer) => {
    try {
      const response = await axios.post(ENDPOINTS.reviewer.create, reviewer);
      return response.data;
    } catch (error) {
      console.error("Error creating reviewer:", error);
      throw error;
    }
  },

  updateReviewer: async (reviewer) => {
    try {
      const response = await axios.post(ENDPOINTS.reviewer.update, reviewer);
      return response.data;
    } catch (error) {
      console.error(`Error updating reviewer ${reviewer.id}:`, error);
      throw error;
    }
  },

  deleteReviewer: async (reviewerId) => {
    try {
      const response = await axios.delete(ENDPOINTS.reviewer.deleteById(reviewerId));
      return response.data;
    } catch (error) {
      console.error(`Error deleting reviewer ${reviewerId}:`, error);
      throw error;
    }
  },
};

export default ReviewerApiService;
