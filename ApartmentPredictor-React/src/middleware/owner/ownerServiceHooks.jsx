import { createContext, useContext } from "react";
import OwnerApiService from "./ownerApiService";

export const OwnerServiceContext = createContext(OwnerApiService);

export const useOwnerService = () => useContext(OwnerServiceContext);
