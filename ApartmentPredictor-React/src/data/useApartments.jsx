import axios from "axios";
import { useEffect, useState } from "react";

export const useApartments = () => {
  // State to hold apartments data, loading status, and error status
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);

  // Fetch apartments data from the API
  // and handle loading and error states
  useEffect(() => {
    // Define an async function to fetch data
    const fetchApartments = async () => {
      try {
        // Make GET request to the API endpoint
        const response = await axios.get("/api/v1/apartment/getAll");
        console.log("API Response:", response);
        console.log("Apartments Data:", response.data);
        console.log("First Apartment:", response.data[0]);
        console.log("Headers", response.headers);
        console.log("Headers date", response.headers.date);
        console.log("Status", response.status);
        const apartmentsData = response.data;
        setApartments(apartmentsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching apartments:", error);
        setIsAxiosError(error.isAxiosError || false);
        setIsLoading(false);
      }
    };
    // Call the function to
    fetchApartments();
  }, []);

  // Return the apartments data, loading status, and error status
  return { apartments, isLoading, isAxiosError };
};
