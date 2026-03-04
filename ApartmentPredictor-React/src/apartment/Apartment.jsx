import { useState } from "react";
import ApartmentForm from "../components/ApartmentForm";
import ApartmentList from "./ApartmentList";

const Apartment = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
    setRefreshTrigger(prev => prev + 1);
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
        <div className="create-form-container">
          <h2>Create New Apartment</h2>
          <ApartmentForm 
            onSuccess={handleCreateSuccess}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}
      
      <ApartmentList refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default Apartment;
