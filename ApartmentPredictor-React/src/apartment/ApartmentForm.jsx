import { useState } from "react";
import axios from "axios";

const ApartmentForm = ({ apartment = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    price: apartment?.price || "",
    area: apartment?.area || "",
    bedrooms: apartment?.bedrooms || "",
    bathrooms: apartment?.bathrooms || "",
    stories: apartment?.stories || "",
    mainroad: apartment?.mainroad || false,
    parking: apartment?.parking || false,
    guestroom: apartment?.guestroom || false,
    basement: apartment?.basement || false,
    hotwaterheating: apartment?.hotwaterheating || false,
    airconditioning: apartment?.airconditioning || false,
    prefarea: apartment?.prefarea || false,
    furnishingstatus: apartment?.furnishingstatus || "unfurnished"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (apartment) {
        // Update existing apartment
        await axios.put(`/api/apartment/${apartment.id}`, formData);
      } else {
        // Create new apartment
        await axios.post("/api/apartment/create", formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save apartment");
    } finally {
      setIsLoading(false);
    }
  };

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
          {isLoading ? "Saving..." : apartment ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ApartmentForm;
