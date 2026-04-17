import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSchoolService } from '../middleware/school/schoolServiceHooks';

const SchoolDataContext = createContext();

export const SchoolDataProvider = ({ children }) => {
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);
  
  const schoolService = useSchoolService();

  const fetchSchools = useCallback(async () => {
    setIsLoading(true);
    try {
      const schoolsData = await schoolService.getAllSchools();
      setSchools(schoolsData);
      setIsLoading(false);
      setIsAxiosError(false);
    } catch (error) {
      console.error("Error fetching schools:", error);
      setIsAxiosError(error.isAxiosError || false);
      setIsLoading(false);
    }
  }, [schoolService]);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  const value = {
    schools,
    isLoading,
    isAxiosError,
    refetch: fetchSchools
  };

  return (
    <SchoolDataContext.Provider value={value}>
      {children}
    </SchoolDataContext.Provider>
  );
};

export const useSchoolData = () => {
  const context = useContext(SchoolDataContext);
  if (!context) {
    throw new Error('useSchoolData must be used within SchoolDataProvider');
  }
  return context;
};
