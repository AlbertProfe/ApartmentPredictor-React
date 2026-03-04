// src/apartment/ApartmentList.jsx
import { useApartments } from "../data/useApartments";
import ApartmentListView from "../view/ApartmentListView";

const ApartmentList = ({ refreshTrigger }) => {
  // Use the custom hook to get apartments data and states
  // we use destructuring assignment to extract the values
  const { apartments, isLoading, isAxiosError, refetch } = useApartments(refreshTrigger);

  // Render the ApartmentListView with the fetched data and states
  return (
    <ApartmentListView
      apartments={apartments}
      isLoading={isLoading}
      isAxiosError={isAxiosError}
      onRefresh={refetch}
    />
  );
};

export default ApartmentList;
