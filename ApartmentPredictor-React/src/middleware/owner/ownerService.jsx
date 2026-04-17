import React from "react";
import OwnerApiService from "./ownerApiService";
import { OwnerServiceContext } from "./ownerServiceHooks";

export const OwnerServiceProvider = ({ children }) => (
  <OwnerServiceContext.Provider value={OwnerApiService}>
    {children}
  </OwnerServiceContext.Provider>
);
