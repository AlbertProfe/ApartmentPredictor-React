import { createContext, useContext } from "react";
import ApartmentApiService from "./apartmentApiService";

export const ApartmentServiceContext = createContext(ApartmentApiService);

export const useApartmentService = () => useContext(ApartmentServiceContext);
