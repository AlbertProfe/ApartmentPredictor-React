import Apartment from "./apartment/Apartment";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <h1>Welcome to the Apartment Predictor</h1>
      <p>Use the navigation to explore available apartments.</p>
      <Apartment />
    </div>
  );
}
