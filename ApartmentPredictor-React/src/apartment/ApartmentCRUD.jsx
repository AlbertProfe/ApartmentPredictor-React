import { useState } from "react";
import { useApartmentService } from "../middleware/apartmentServiceHooks";
import ApartmentCreate from "./ApartmentCreate";
import ApartmentList from "./ApartmentList";

const ApartmentCRUD = () => {
  const apartmentService = useApartmentService();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    setRefreshTrigger(prev => prev + 1);
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

  const handleCreateSubmit = async (formData) => {
    setIsLoading(true);
    setError("");

    try {
      const transformedData = transformFormData(formData);
      await apartmentService.createApartment(transformedData);
      handleCreateSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create apartment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSubmit = async (formData, apartmentId) => {
    setIsLoading(true);
    setError("");

    try {
      const transformedData = transformFormData(formData);
      await apartmentService.updateApartment({ ...transformedData, id: apartmentId });
      setRefreshTrigger(prev => prev + 1);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update apartment");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (apartmentId) => {
    if (!window.confirm("Are you sure you want to delete this apartment?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await apartmentService.deleteApartment(apartmentId);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error deleting apartment:", error);
      if (error.response?.status === 500) {
        alert("Failed to delete apartment: Database constraint violation. Please contact administrator.");
      } else if (error.response?.status === 404) {
        alert("Apartment not found or already deleted.");
      } else {
        alert("Failed to delete apartment. Please try again later.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="apartment-container">
      <div className="apartment-header">
        <h1>Apartments Management</h1>
        <button 
          className="create-btn"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "Create Apartment"}
        </button>
      </div>
      
      {showCreateForm && (
        <div className="card create-form-container">
          <h2>Create New Apartment</h2>
          <ApartmentCreate 
            onSubmit={handleCreateSubmit}
            isLoading={isLoading}
            error={error}
            onSuccess={handleCreateSuccess}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}
      
      <ApartmentList refreshTrigger={refreshTrigger} onUpdateSubmit={handleUpdateSubmit} onDelete={handleDelete} isDeleting={isDeleting} />
    </div>
  );
};

export default ApartmentCRUD;
