import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useReviewerService } from '../middleware/reviewer/reviewerServiceHooks';

const ReviewerDataContext = createContext();

export const ReviewerDataProvider = ({ children }) => {
  const [reviewers, setReviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);
  
  const reviewerService = useReviewerService();

  const fetchReviewers = useCallback(async () => {
    setIsLoading(true);
    try {
      const reviewersData = await reviewerService.getAllReviewers();
      setReviewers(reviewersData);
      setIsLoading(false);
      setIsAxiosError(false);
    } catch (error) {
      console.error("Error fetching reviewers:", error);
      setIsAxiosError(error.isAxiosError || false);
      setIsLoading(false);
    }
  }, [reviewerService]);

  useEffect(() => {
    fetchReviewers();
  }, [fetchReviewers]);

  const value = {
    reviewers,
    isLoading,
    isAxiosError,
    refetch: fetchReviewers
  };

  return (
    <ReviewerDataContext.Provider value={value}>
      {children}
    </ReviewerDataContext.Provider>
  );
};

export const useReviewerData = () => {
  const context = useContext(ReviewerDataContext);
  if (!context) {
    throw new Error('useReviewerData must be used within ReviewerDataProvider');
  }
  return context;
};
