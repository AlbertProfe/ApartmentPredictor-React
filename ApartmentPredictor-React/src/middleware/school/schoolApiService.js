import axios from "axios";
import ENDPOINTS from "../config/endpoints";

const SchoolApiService = {
  getAllSchools: async () => {
    try {
      const response = await axios.get(ENDPOINTS.school.getAll);
      return response.data;
    } catch (error) {
      console.error("Error fetching schools:", error);
      throw error;
    }
  },

  getSchoolById: async (schoolId) => {
    try {
      const response = await axios.get(ENDPOINTS.school.getById(schoolId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching school ${schoolId}:`, error);
      throw error;
    }
  },

  createSchool: async (school) => {
    try {
      const response = await axios.post(ENDPOINTS.school.create, school);
      return response.data;
    } catch (error) {
      console.error("Error creating school:", error);
      throw error;
    }
  },

  updateSchool: async (school) => {
    try {
      const response = await axios.post(ENDPOINTS.school.update, school);
      return response.data;
    } catch (error) {
      console.error(`Error updating school ${school.id}:`, error);
      throw error;
    }
  },

  deleteSchool: async (schoolId) => {
    try {
      const response = await axios.delete(ENDPOINTS.school.deleteById(schoolId));
      return response.data;
    } catch (error) {
      console.error(`Error deleting school ${schoolId}:`, error);
      throw error;
    }
  },

  filterSchools: async (filters) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => Boolean(value))
      );
      const response = await axios.get(ENDPOINTS.school.filter, { params: cleanParams });
      return response.data;
    } catch (error) {
      console.error("Error filtering schools:", error);
      throw error;
    }
  },
};

export default SchoolApiService;
