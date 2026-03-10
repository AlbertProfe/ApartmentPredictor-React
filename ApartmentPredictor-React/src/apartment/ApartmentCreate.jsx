import { useState } from "react";
import { useApartmentService } from "../middleware/apartmentServiceHooks";
import ApartmentForm from "../components/ApartmentForm";

const ApartmentCreate = ({ onSuccess, onCancel }) => {
  const apartmentService = useApartmentService();
  const [formData, setFormData] = useState({
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    stories: "",
    mainroad: false,
    parking: false,
    guestroom: false,
    basement: false,
    hotwaterheating: false,
    airconditioning: false,
    prefarea: false,
    furnishingstatus: "unfurnished"
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

  const transformFormData = (data) => {
    return {
      ...data,
      // Convert parking from boolean to integer (0 or 1)
      parking: data.parking ? 1 : 0,
      // Convert other boolean fields to "yes"/"no" strings
      mainroad: data.mainroad ? "yes" : "no",
      guestroom: data.guestroom ? "yes" : "no",
      basement: data.basement ? "yes" : "no",
      hotwaterheating: data.hotwaterheating ? "yes" : "no",
      airconditioning: data.airconditioning ? "yes" : "no",
      prefarea: data.prefarea ? "yes" : "no"
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const transformedData = transformFormData(formData);
      await apartmentService.createApartment(transformedData);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create apartment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ApartmentForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      onCancel={onCancel}
      submitText="Create Apartment"
    />
  );
};

export default ApartmentCreate;
