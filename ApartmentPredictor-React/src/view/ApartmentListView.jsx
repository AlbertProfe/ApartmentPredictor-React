import { useState } from "react";
import axios from "axios";
import ApartmentForm from "../components/ApartmentForm";
import ApartmentListContainer from "./ApartmentListContainer";
import ApartmentDetail from "./ApartmentDetail";

const ApartmentListView = ({ apartments, isLoading, isAxiosError, onRefresh }) => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async (apartmentId) => {
    if (!window.confirm("Are you sure you want to delete this apartment?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(`/api/apartment/${apartmentId}`);
      onRefresh && onRefresh();
    } catch (error) {
      console.error("Error deleting apartment:", error);
      alert("Failed to delete apartment");
    } finally {
      setIsDeleting(false);
    }
  };

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
    onRefresh && onRefresh();
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
        <div className="update-form-container">
          <h2>Update Apartment</h2>
          <ApartmentForm
            apartment={selectedApartment}
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
          />
        </div>
      )}

      {showDetail && selectedApartment && (
        <ApartmentDetail 
          apartment={selectedApartment} 
          onClose={handleCancel}
        />
      )}

      <ApartmentListContainer 
        apartments={apartments}
        onDetail={handleDetail}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ApartmentListView;
