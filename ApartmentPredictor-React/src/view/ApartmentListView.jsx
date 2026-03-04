import { useState } from "react";
import axios from "axios";
import ApartmentForm from "../apartment/ApartmentForm";

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
        <div className="detail-container">
          <h2>Apartment Details</h2>
          <div className="apartment-detail">
            <p><strong>ID:</strong> {selectedApartment.id}</p>
            <p><strong>Price:</strong> ${selectedApartment.price}</p>
            <p><strong>Area:</strong> {selectedApartment.area} sq ft</p>
            <p><strong>Bedrooms:</strong> {selectedApartment.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {selectedApartment.bathrooms}</p>
            <p><strong>Stories:</strong> {selectedApartment.stories}</p>
            <p><strong>Main Road:</strong> {selectedApartment.mainroad ? "Yes" : "No"}</p>
            <p><strong>Parking:</strong> {selectedApartment.parking ? "Yes" : "No"}</p>
            <p><strong>Guest Room:</strong> {selectedApartment.guestroom ? "Yes" : "No"}</p>
            <p><strong>Basement:</strong> {selectedApartment.basement ? "Yes" : "No"}</p>
            <p><strong>Hot Water Heating:</strong> {selectedApartment.hotwaterheating ? "Yes" : "No"}</p>
            <p><strong>Air Conditioning:</strong> {selectedApartment.airconditioning ? "Yes" : "No"}</p>
            <p><strong>Preferred Area:</strong> {selectedApartment.prefarea ? "Yes" : "No"}</p>
            <p><strong>Furnishing Status:</strong> {selectedApartment.furnishingstatus}</p>
          </div>
          <button onClick={handleCancel} className="close-btn">Close</button>
        </div>
      )}

      <ul className="apartment-list">
        {// Map through apartments and display their details
        // Each apartment is rendered as a list item with key as apartment.id
        // The details include price, area, bedrooms, bathrooms, stories, and features
        }
        {apartments.map((apartment) => (
          <li key={apartment.id} className="apartment-item">
            <div className="apartment-header">
              ID: {apartment.id} | ${apartment.price}
            </div>

            <div className="apartment-grid">
              <div>
                <strong>Area:</strong> {apartment.area} sq ft
              </div>
              <div>
                <strong>Bedrooms:</strong> {apartment.bedrooms}
              </div>
              <div>
                <strong>Bathrooms:</strong> {apartment.bathrooms}
              </div>
              <div>
                <strong>Stories:</strong> {apartment.stories}
              </div>
            </div>

            <div className="apartment-features">
              <span>Main Road: {apartment.mainroad}</span>
              <span>Parking: {apartment.parking}</span>
              <span>Guestroom: {apartment.guestroom}</span>
              <span>Basement: {apartment.basement}</span>
            </div>

            <div className="apartment-meta">
              Hot Water: {apartment.hotwaterheating} | AC:{" "}
              {apartment.airconditioning} | Pref Area: {apartment.prefarea} |
              Furnishing: {apartment.furnishingstatus}
            </div>

            <div className="apartment-actions">
              <button 
                onClick={() => handleDetail(apartment)} 
                className="detail-btn"
                disabled={isDeleting}
              >
                Detail
              </button>
              <button 
                onClick={() => handleUpdate(apartment)} 
                className="update-btn"
                disabled={isDeleting}
              >
                Update
              </button>
              <button 
                onClick={() => handleDelete(apartment.id)} 
                className="delete-btn"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ApartmentListView;
