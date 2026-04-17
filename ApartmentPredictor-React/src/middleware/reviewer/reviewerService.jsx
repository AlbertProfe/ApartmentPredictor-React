import React from "react";
import ReviewerApiService from "./reviewerApiService";
import { ReviewerServiceContext } from "./reviewerServiceHooks";

export const ReviewerServiceProvider = ({ children }) => (
  <ReviewerServiceContext.Provider value={ReviewerApiService}>
    {children}
  </ReviewerServiceContext.Provider>
);
