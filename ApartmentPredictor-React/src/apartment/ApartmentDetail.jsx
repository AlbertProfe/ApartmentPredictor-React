import React, { useState } from 'react';
import ApartmentUpdate from "./ApartmentUpdate";

const ApartmentDetail = ({ apartment, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!apartment) return null;

  const handleEditSuccess = () => {
    setIsEditing(false);
    if (onUpdate) onUpdate();
  };

  return (
    <div className="apartment-detail-overlay">
      <div className="apartment-detail-modal">
        <div className="apartment-detail-header">
          <h2>Apartment Details</h2>
          <div className="header-actions">
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)} 
                className="edit-btn"
              >
                Edit
              </button>
            )}
            <button onClick={onClose} className="close-btn">&times;</button>
          </div>
        </div>
        
        <div className="card apartment-detail-content">
          {isEditing ? (
            <div className="edit-form-container">
              <h3>Edit Apartment</h3>
              <ApartmentUpdate 
                apartment={apartment}
                onSuccess={handleEditSuccess}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          ) : (
            <>
              <div className="detail-section">
                <h3>Basic Information</h3>
                <div className="detail-grid">
                  <div><strong>ID:</strong> {apartment.id}</div>
                  <div><strong>Price:</strong> ${apartment.price}</div>
                  <div><strong>Area:</strong> {apartment.area} sq ft</div>
                  <div><strong>Bedrooms:</strong> {apartment.bedrooms}</div>
                  <div><strong>Bathrooms:</strong> {apartment.bathrooms}</div>
                  <div><strong>Stories:</strong> {apartment.stories}</div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Features</h3>
                <div className="feature-list">
                  <div className={`feature-item ${apartment.mainroad ? 'available' : 'unavailable'}`}>
                    Main Road: {apartment.mainroad ? 'Yes' : 'No'}
                  </div>
                  <div className={`feature-item ${apartment.parking ? 'available' : 'unavailable'}`}>
                    Parking: {apartment.parking ? 'Yes' : 'No'}
                  </div>
                  <div className={`feature-item ${apartment.guestroom ? 'available' : 'unavailable'}`}>
                    Guestroom: {apartment.guestroom ? 'Yes' : 'No'}
                  </div>
                  <div className={`feature-item ${apartment.basement ? 'available' : 'unavailable'}`}>
                    Basement: {apartment.basement ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Amenities</h3>
                <div className="amenity-list">
                  <div className={`amenity-item ${apartment.hotwaterheating ? 'available' : 'unavailable'}`}>
                    Hot Water Heating: {apartment.hotwaterheating ? 'Yes' : 'No'}
                  </div>
                  <div className={`amenity-item ${apartment.airconditioning ? 'available' : 'unavailable'}`}>
                    Air Conditioning: {apartment.airconditioning ? 'Yes' : 'No'}
                  </div>
                  <div className={`amenity-item ${apartment.prefarea ? 'available' : 'unavailable'}`}>
                    Preferred Area: {apartment.prefarea ? 'Yes' : 'No'}
                  </div>
                  <div className="amenity-item">
                    <strong>Furnishing Status:</strong> {apartment.furnishingstatus}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetail;
