import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useApartmentService } from '../middleware/apartment/apartmentServiceHooks';

const ApartmentDataContext = createContext();

export const ApartmentDataProvider = ({ children }) => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);
  
  const apartmentService = useApartmentService();

  const fetchApartments = useCallback(async () => {
    setIsLoading(true);
    try {
      const apartmentsData = await apartmentService.getAllApartments();
      setApartments(apartmentsData);
      setIsLoading(false);
      setIsAxiosError(false);
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setIsAxiosError(error.isAxiosError || false);
      setIsLoading(false);
    }
  }, [apartmentService]);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  const value = {
    apartments,
    isLoading,
    isAxiosError,
    refetch: fetchApartments
  };

  return (
    <ApartmentDataContext.Provider value={value}>
      {children}
    </ApartmentDataContext.Provider>
  );
};

export const useApartmentData = () => {
  const context = useContext(ApartmentDataContext);
  if (!context) {
    throw new Error('useApartmentData must be used within ApartmentDataProvider');
  }
  return context;
};
