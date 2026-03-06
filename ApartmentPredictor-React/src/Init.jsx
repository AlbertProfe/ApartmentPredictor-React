import ApartmentPage from "./pages/ApartmentPage";
import apartmentNewYork from "./assets/apartmentNewYork.jpg";
import "./App.css";

export default function Init() {
  return (
    <div className="App">
        <h1>Welcome to the Apartment Predictor</h1>
      <div className="header-image">
        <img src={apartmentNewYork} alt="New York Apartment" />
      </div>
      <p>Use the navigation to explore available apartments.</p>
      <ApartmentPage />
    </div>
  );
}
