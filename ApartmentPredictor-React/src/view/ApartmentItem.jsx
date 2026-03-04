const ApartmentItem = ({ apartment, onDetail, onUpdate, onDelete, isDeleting }) => {
  return (
    <li className="apartment-item">
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

      <div className="apartment-actions">
        <button 
          onClick={() => onDetail(apartment)} 
          className="detail-btn"
          disabled={isDeleting}
        >
          Detail
        </button>
        <button 
          onClick={() => onUpdate(apartment)} 
          className="update-btn"
          disabled={isDeleting}
        >
          Update
        </button>
        <button 
          onClick={() => onDelete(apartment.id)} 
          className="delete-btn"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </li>
  );
};

export default ApartmentItem;
