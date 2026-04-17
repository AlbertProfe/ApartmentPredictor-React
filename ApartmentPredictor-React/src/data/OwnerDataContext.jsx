import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useOwnerService } from '../middleware/owner/ownerServiceHooks';

const OwnerDataContext = createContext();

export const OwnerDataProvider = ({ children }) => {
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);
  
  const ownerService = useOwnerService();

  const fetchOwners = useCallback(async () => {
    setIsLoading(true);
    try {
      const ownersData = await ownerService.getAllOwners();
      setOwners(ownersData);
      setIsLoading(false);
      setIsAxiosError(false);
    } catch (error) {
      console.error("Error fetching owners:", error);
      setIsAxiosError(error.isAxiosError || false);
      setIsLoading(false);
    }
  }, [ownerService]);

  useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

  const value = {
    owners,
    isLoading,
    isAxiosError,
    refetch: fetchOwners
  };

  return (
    <OwnerDataContext.Provider value={value}>
      {children}
    </OwnerDataContext.Provider>
  );
};

export const useOwnerData = () => {
  const context = useContext(OwnerDataContext);
  if (!context) {
    throw new Error('useOwnerData must be used within OwnerDataProvider');
  }
  return context;
};
