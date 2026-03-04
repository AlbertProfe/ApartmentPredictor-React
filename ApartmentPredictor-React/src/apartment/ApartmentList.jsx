// src/apartment/ApartmentList.jsx
import { useEffect, useState } from "react";
import { useApartmentService } from "../middleware/apartmentServiceHooks";
import ApartmentListView from "../view/ApartmentListView";

const ApartmentList = () => {
  const apartmentService = useApartmentService();
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);

  useEffect(() => {
    async function fetchApartments() {
      try {
        const data = await apartmentService.getAllApartments();
        setApartments(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch apartments:", error);
        setIsAxiosError(error.isAxiosError || false);
        setIsLoading(false);
      }
    }

    fetchApartments();
  }, [apartmentService]);

  return (
    <ApartmentListView
      apartments={apartments}
      isLoading={isLoading}
      isAxiosError={isAxiosError}
    />
  );
};

export default ApartmentList;
