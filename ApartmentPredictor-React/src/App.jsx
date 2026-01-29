import axios from "axios";
import { useEffect, useState } from "react";

const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(
          "/api/apartment/getAll"
        );
        console.log("API Response:", response);
        console.log("Apartments Data:", response.data);
        console.log("First Apartment:", response.data[0]);
        console.log("Headers", response.headers);
        console.log("Headers date", response.headers.date);
        console.log("Status", response.status);
        const apartmentsData = response.data;
        setApartments(apartmentsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching apartments:", error);
        setIsAxiosError(error.isAxiosError || false);
        setIsLoading(false);
      }
    };
    fetchApartments();
}, []);

  return (
    <>
      <h1>Apartments</h1>
      <p>This is an exercise to test react render</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        isAxiosError ? (
          <p>Error loading apartments. Please try again later.</p>
        ) : (
          <ul>
            {apartments.map((apartment) => (
              <li key={apartment.id}>
                <strong>ID:</strong> {apartment.id} <br />
                <strong>Price:</strong> {apartment.price} <br />
                <strong>Area:</strong> {apartment.area} <br />
                <strong>Bedrooms:</strong> {apartment.bedrooms} <br />
                <strong>Bathrooms:</strong> {apartment.bathrooms} <br />
                <strong>Stories:</strong> {apartment.stories} <br />
                <strong>Main Road:</strong> {apartment.mainroad} <br />
                <strong>Guest Room:</strong> {apartment.guestroom} <br />
                <strong>Basement:</strong> {apartment.basement} <br />
                <strong>Hot Water Heating:</strong> {apartment.hotwaterheating}{" "}
                <br />
                <strong>Air Conditioning:</strong> {apartment.airconditioning}{" "}
                <br />
                <strong>Parking:</strong> {apartment.parking} <br />
                <strong>Preferred Area:</strong> {apartment.prefarea} <br />
                <strong>Furnishing Status:</strong> {apartment.furnishingstatus}
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default ApartmentList;
