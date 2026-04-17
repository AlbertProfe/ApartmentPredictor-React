import React from 'react';
import { ApartmentServiceProvider } from "../middleware/apartment/apartmentService";
import { SchoolServiceProvider } from "../middleware/school/schoolService";
import { ReviewerServiceProvider } from "../middleware/reviewer/reviewerService";
import { OwnerServiceProvider } from "../middleware/owner/ownerService";

import { ApartmentDataProvider } from "../data/ApartmentDataContext";
import { SchoolDataProvider } from "../data/SchoolDataContext";
import { ReviewerDataProvider } from "../data/ReviewerDataContext";
import { OwnerDataProvider } from "../data/OwnerDataContext";

const composeProviders = (...providers) => {
  return providers.reduce(
    (Prev, Curr) => ({ children }) => (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    ),
    ({ children }) => <>{children}</>
  );
};

const ServiceProviders = composeProviders(
  ApartmentServiceProvider,
  SchoolServiceProvider,
  ReviewerServiceProvider,
  OwnerServiceProvider
);

const DataProviders = composeProviders(
  ApartmentDataProvider,
  SchoolDataProvider,
  ReviewerDataProvider,
  OwnerDataProvider
);

export const AppProviders = ({ children }) => (
  <ServiceProviders>
    <DataProviders>
      {children}
    </DataProviders>
  </ServiceProviders>
);
