import { createContext, useContext } from "react";
import ReviewerApiService from "./reviewerApiService";

export const ReviewerServiceContext = createContext(ReviewerApiService);

export const useReviewerService = () => useContext(ReviewerServiceContext);
