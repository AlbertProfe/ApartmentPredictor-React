// src/apartment/ApartmentList.jsx
import { useState } from "react";
import { useApartments } from "../data/useApartments";
import ApartmentUpdate from "./ApartmentUpdate";
import ApartmentListContainer from "./ApartmentListContainer";
import ApartmentDetail from "./ApartmentDetail";

const ApartmentList = ({ refreshTrigger, onUpdateSubmit, onDelete, isDeleting }) => {
  // Use the custom hook to get apartments data and states
  const { apartments, isLoading, isAxiosError } = useApartments(refreshTrigger);
  
  // View state management
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Render loading state
  if (isLoading) {
    return (
      <>
        <h1>Apartments</h1>
        <p>This is an exercise to test react render</p>
        <p>Loading...</p>
      </>
    );
  }

  // Render error state
  if (isAxiosError) {
    return (
      <>
        <h1>Apartments</h1>
        <p>This is an exercise to test react render</p>
        <p>Error loading apartments. Please try again later.</p>
      </>
    );
  }


  const handleDetail = (apartment) => {
    setSelectedApartment(apartment);
    setShowDetail(true);
    setShowUpdateForm(false);
  };

  const handleUpdate = (apartment) => {
    setSelectedApartment(apartment);
    setShowUpdateForm(true);
    setShowDetail(false);
  };

  const handleFormSuccess = () => {
    setShowUpdateForm(false);
    setSelectedApartment(null);
  };

  const handleCancel = () => {
    setShowUpdateForm(false);
    setShowDetail(false);
    setSelectedApartment(null);
  };

  // Render apartments list
  return (
    <>
      <h1>Apartments</h1>
      <p>This is an exercise to test react render</p>
      
      {showUpdateForm && selectedApartment && (
        <div className="card update-form-container">
          <h2>Update Apartment</h2>
          <ApartmentUpdate
            apartment={selectedApartment}
            onSubmit={onUpdateSubmit}
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
          />
        </div>
      )}

      {showDetail && selectedApartment && (
        <ApartmentDetail 
          apartment={selectedApartment} 
          onClose={handleCancel}
          onUpdateSubmit={onUpdateSubmit}
        />
      )}

      <ApartmentListContainer 
        apartments={apartments}
        onDetail={handleDetail}
        onUpdate={handleUpdate}
        onDelete={onDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ApartmentList;
