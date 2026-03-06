
import Init from "./Init";
import "./App.css";
import { ApartmentServiceProvider } from "./middleware/apartmentService";

export default function App() {
  return (
      <ApartmentServiceProvider>
        <Init />
      </ApartmentServiceProvider>
  );
}
