const ApartmentForm = ({ 
  formData, 
  handleChange, 
  handleSubmit, 
  isLoading, 
  error, 
  onCancel, 
  submitText 
}) => {
  return (
    <form onSubmit={handleSubmit} className="apartment-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-grid">
        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Area (sq ft)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stories</label>
          <input
            type="number"
            name="stories"
            value={formData.stories}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Furnishing Status</label>
          <select
            name="furnishingstatus"
            value={formData.furnishingstatus}
            onChange={handleChange}
          >
            <option value="unfurnished">Unfurnished</option>
            <option value="semi-furnished">Semi-furnished</option>
            <option value="furnished">Furnished</option>
          </select>
        </div>
      </div>

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="mainroad"
            checked={formData.mainroad}
            onChange={handleChange}
          />
          Main Road Access
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="parking"
            checked={formData.parking}
            onChange={handleChange}
          />
          Parking Available
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="guestroom"
            checked={formData.guestroom}
            onChange={handleChange}
          />
          Guest Room
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="basement"
            checked={formData.basement}
            onChange={handleChange}
          />
          Basement
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="hotwaterheating"
            checked={formData.hotwaterheating}
            onChange={handleChange}
          />
          Hot Water Heating
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="airconditioning"
            checked={formData.airconditioning}
            onChange={handleChange}
          />
          Air Conditioning
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="prefarea"
            checked={formData.prefarea}
            onChange={handleChange}
          />
          Preferred Area
        </label>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
};

export default ApartmentForm;
