# ApartmentPredictor-React masterDoc v1

## Summary

### Goal

> The goal of this phase is to build a **React front-end** that consumes our existing Apartment Predictor **REST API as documented in Postman**. 

The backend will run locally as a packaged Spring Boot application executed with `java -jar <server>.jar`, and the React application will communicate with it via **Axios** HTTP calls. 

The `React UI` will provide a clean, responsive view focused on apartment browsing and management: 

- it will display `apartments` as a list of <mark>cards</mark> (showing key fields such as price, area, bedrooms, bathrooms, and status attributes), 

- and it will support **full CRUD operations** (create new apartments, edit existing ones, view details, and delete). 

- In addition, the UI will enable `review` management per apartment: users will be able to open an apartment detail view and post reviews linked to that specific apartment, as well as read existing reviews. 

The result should be an<mark> end-to-end working flow from UI to REST endpoints</mark> (and from there Spring Boot and H2 will implement the BackEnd).

### References

- Server (BackEnd):
  
  - [GitHub - AlbertProfe/ApartmentPredictor](https://github.com/AlbertProfe/ApartmentPredictor)
  - [Create JAR from backend Spring Boot](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/appends/DATA-create-JAR.md)

- CodeSandbox:
  
  - [Traffic Lights](https://codesandbox.io/p/sandbox/7f8ffd)
  - [Scientists Gallery 5](https://codesandbox.io/p/devbox/scientistsgallery4-forked-94z8k7)

- React:
  
  - [Describing the UI](https://react.dev/learn/describing-the-ui) / [Adding Interactivity](https://react.dev/learn/adding-interactivity)
  - [Custom Hooks](https://albertprofe.dev/reactjs/reactjs-hook-custom.html) / [useEffect](https://albertprofe.dev/reactjs/reactjs-hook-effect.html) / [useState](https://albertprofe.dev/reactjs/reactjs-hook-state.html)

- Labs:
  
  - [Lab#RE07-1: traffic lights simulation – albertprofe wiki](https://albertprofe.dev/reactjs/rjslab7-1.html)
  - [Lab#RE01-1: API Rest Axios – albertprofe wiki](https://albertprofe.dev/reactjs/rjslab1.html)
  - [Lab#RE06-1: healthyFood Restaurant – albertprofe wiki](https://albertprofe.dev/reactjs/rjslab6-1.html)

## Project Structure

```textile
dictorProject-React/ApartmentPredictor-React (master)
$ tree -L 3
.
├── eslint.config.js
├── index.html
├── node_modules
│   ├── acorn
│   ....
│   ├── zod
│   └── zod-validation-error
├── package.json
├── package-lock.json
├── public
│   └── vite.svg
├── README.md
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```

After decoupling

```textile
[Fri Jan 30 08:26:09] albert@albert-VirtualBox:~/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src (master)
$ tree
.
├── apartment
│   └── ApartmentList.jsx
├── App.css
├── App.jsx
├── assets
│   └── react.svg
├── data
│   └── useApartments.jsx
├── index.css
├── main.jsx
└── view
    └── ApartmentListView.jsx

5 directories, 8 files
```

## DATA REST endpoint

- [apartmentPredictorCRUD](https://documenter.getpostman.com/view/7473960/2sBXVeFs8L)

Data model:

```json
[
  {
    "id": "2aacac51-4eea-4f7d-8a03-227751c23ba2",
    "price": null,
    "area": 5,
    "bedrooms": null,
    "bathrooms": null,
    "stories": null,
    "mainroad": null,
    "guestroom": null,
    "basement": null,
    "hotwaterheating": null,
    "airconditioning": null,
    "parking": null,
    "prefarea": null,
    "furnishingstatus": null,
    "reviews": [{...}, {...}, {...}]
  },
  {..}
]
```

## Code

### Axios

- https://axios-http.com/

> Axios is a <mark>simple promise based HTTP client for the browser and node.js</mark>. Axios provides a simple to use library in a small package with a very extensible interface.

Installing

Using npm:

```
$ npm install axios
```

### ApartmentList

The `ApartmentLis`t component <mark>fetches apartment data from an API endpoint</mark> (`/api/apartment/getAll`) using `axios`.

It manages three state variables: 

- apartments (stores the fetched data), 

- isLoading (tracks loading status), 

- and isAxiosError (for error handling). 

> On component mount, a `useEffect` hook triggers an `async` fetch request. While loading, it displays "Loading...". Once data arrives, it **maps** through the apartments array and **renders** each apartment as a list item, displaying all properties like price, area, bedrooms, bathrooms, and amenities. 

The component excludes the reviews field from the display.

```jsx
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
        const apartmentsData = response.data;
        setApartments(apartmentsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching apartments:", error);
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
              <strong>Hot Water Heating:</strong> {apartment.hotwaterheating} <br />
              <strong>Air Conditioning:</strong> {apartment.airconditioning} <br />
              <strong>Parking:</strong> {apartment.parking} <br />
              <strong>Preferred Area:</strong> {apartment.prefarea} <br />
              <strong>Furnishing Status:</strong> {apartment.furnishingstatus}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ApartmentList;
```

## Decoupling

Decoupling this component separates **concerns**, making the code easier to reason about, test, and reuse. 

> In the original version, the component both fetched data and rendered the UI, so any change in one concern risked affecting the other. 

By extracting the fetch logic into `useApartments`, we isolate all API, loading, and error management in a single, dedicated place. This <mark>hook</mark> can now be reused by other components that might need the same apartment data, without duplicating axios calls or state handling.

`ApartmentListView` becomes <mark>purely presentational:</mark> it receives props and focuses only on how to display them. This makes it simpler to test with mock data and easier to tweak the layout, styles, or structure without touching any async logic. 

The container `ApartmentList` acts as the glue: it calls `useApartments` and passes the resulting state down to the view.

> This pattern (hook + view + container) scales well as the app grows, encourages clear boundaries between logic and UI, and keeps components small, focused, and maintainable over time.

3-Step Decoupling

**1. Extract logic → Custom Hook**

```jsx
// Before: fetch INSIDE component
useEffect(() => { axios.get(...) })

// After: useApartments.js
export const useApartments = () => {
  const [data, loading, error] = useFetch("/api/apartments");
  return { data, loading, error };
};
```

**2. Pure View → Props Only**

```jsx
// Before: fetches + renders
const ApartmentList = () => { ... }

// After: ApartmentListView.jsx
const ApartmentListView = ({ apartments, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  return <ul>{apartments.map(...)}</ul>;
};
```

**3. Container Wires Them** (this is the glue-container)

```jsx
// ApartmentList.jsx
const ApartmentList = () => {
  const { apartments, loading, error } = useApartments();
  return <ApartmentListView {...{ apartments, loading, error }} />;
};
```

**Result**: Logic reusable, View testable with props, Container minimal.

## Button refresh

- [Button refresh](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/appends/REACT-reaload.md)

## package.json

### Dependencies Overview

**Runtime Dependencies:**

- axios (^1.13.2): HTTP client for making API requests to fetch apartment data
- `react` (^19.2.0): Core React library for building UI components
- `react-dom` (^19.2.0): Renders React components to the DOM

**Development Dependencies:**

- `@vitejs/plugin-react`: Enables React support in Vite bundler
- `babel-plugin-react-compiler`: Optimizes React component compilation
- `eslint` & plugins: Code linting for quality and style enforcement
- `@types/react`: TypeScript type definitions for React
- `vite`: Fast development server and build tool replacing Create React App

### Code .json

```json
{
  "name": "apartmentpredictor-react",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.13.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "babel-plugin-react-compiler": "^1.0.0",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
```

## Tech Stack

- IDE: Visual Code Studio
- `nvm` Node Version Manager 0.39.7: [GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions](https://github.com/nvm-sh/nvm)
- `NodeJS 22.2.0`
- Create project by **VITE**
  - https://vite.dev/ / [Getting Started | Vite](https://vite.dev/guide/)
  - `npm create vite@latest`
- `axios` library
