import React, { createContext, useContext } from "react";
import ApartmentApiService from "./apartmentApiService";

// Create a context with ApartmentApiService as the default value
export const ApartmentServiceContext = createContext(ApartmentApiService);

// Custom hook to use the ApartmentApiService
export const useApartmentService = () => useContext(ApartmentServiceContext);
