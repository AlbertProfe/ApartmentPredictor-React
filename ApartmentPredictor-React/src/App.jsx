import ApartmentList from "./apartment/ApartmentList";
import { ApartmentServiceProvider } from "./middleware/apartmentService";
import "./App.css";

export default function App() {
  return (
    <ApartmentServiceProvider>
      <div className="App">
        <h1>Welcome to the Apartment Predictor</h1>
        <p>Use the navigation to explore available apartments.</p>
        <ApartmentList />
      </div>
    </ApartmentServiceProvider>
  );
}
