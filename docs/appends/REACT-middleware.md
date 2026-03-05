# Step-by-Step Guide: Refactoring to Context-Based API Architecture

## Overview

> This guide explains how to **refactor a React application from traditional custom hooks to a modern middleware architecture** using React Context and custom hooks for API services.

## Prerequisites

- Existing React application with API calls in custom hooks
- Basic understanding of React Hooks and Context API
- Axios for HTTP requests

---

## Step 1: Create the API Service Layer

**File:** [src/middleware/apartmentApiService.js](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/middleware/apartmentApiService.js:0:0-0:0)

```javascript
import axios from "axios";

const ApartmentApiService = {
  getAllApartments: async () => {
    try {
      const response = await axios.get("/api/apartment/getAll");
      return response.data;
    } catch (error) {
      console.error("Error fetching apartments:", error);
      throw error;
    }
  },
  // Add other API methods here
};

export default ApartmentApiService;
```

**Purpose:** Extract all API calls into a pure service object. This layer should:

- Handle HTTP requests using axios
- Manage error handling
- Return data or throw errors
- Have no React dependencies

---

## Step 2: Create React Context Provider

**File:** [src/middleware/apartmentService.jsx](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/middleware/apartmentService.jsx:0:0-0:0)

```javascript
import React, { createContext, useContext } from "react";
import ApartmentApiService from "./apartmentApiService";

const ApartmentServiceContext = createContext(ApartmentApiService);

export const ApartmentServiceProvider = ({ children }) => (
  <ApartmentServiceContext.Provider value={ApartmentApiService}>
    {children}
  </ApartmentServiceContext.Provider>
);
```

**Purpose:** Create a React Context that provides the API service globally.

---

## Step 3: Create Custom Hook for Context Access

**File:** [src/middleware/apartmentServiceHooks.jsx](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/middleware/apartmentServiceHooks.jsx:0:0-0:0)

```javascript
import { useContext } from "react";
import { ApartmentServiceContext } from "./apartmentService";

export const useApartmentService = () => {
  return useContext(ApartmentServiceContext);
};
```

**Purpose:** Provide a clean hook interface for components to access the API service.

---

## Step 4: Wrap Application with Provider

**File:** [src/App.jsx](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/App.jsx:0:0-0:0)

```javascript
import ApartmentList from "./apartment/ApartmentList";
import { ApartmentServiceProvider } from "./middleware/apartmentService";
import "./App.css";

export default function App() {
  return (
    <ApartmentServiceProvider>
      <div className="App">
        <h1>Welcome to the Apartment Predictor</h1>
        <ApartmentList />
      </div>
    </ApartmentServiceProvider>
  );
}
```

**Purpose:** Make the API service available to all child components.

---

## Step 5: Refactor Components to Use New Hook

**File:** [src/apartment/ApartmentList.jsx](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/apartment/ApartmentList.jsx:0:0-0:0)

**Before:**

```javascript
import { useApartments } from "../data/useApartments";

const ApartmentList = () => {
  const { apartments, isLoading, isAxiosError } = useApartments();
  // Component logic
};
```

**After:**

```javascript
import { useEffect, useState } from "react";
import { useApartmentService } from "../middleware/apartmentServiceHooks";

const ApartmentList = () => {
  const apartmentService = useApartmentService();
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);

  useEffect(() => {
    async function fetchApartments() {
      try {
        const data = await apartmentService.getAllApartments();
        setApartments(data);
        setIsLoading(false);
      } catch (error) {
        setIsAxiosError(error.isAxiosError || false);
        setIsLoading(false);
      }
    }
    fetchApartments();
  }, [apartmentService]);

  // Component render logic
};
```

**Purpose:** Replace the old custom hook with the new context-based approach.

---

## Step 6: Clean Up Legacy Code

**Action:** Remove the old custom hook file

```bash
rm src/data/useApartments.jsx
```

**Purpose:** Eliminate unused code and maintain a clean codebase.

---

## Step 7: Update File Organization (Optional)

**Action:** Move related files together

```bash
mv src/view/ApartmentListView.jsx src/apartment/ApartmentListView.jsx
```

**Update imports:**

```javascript
// Before
import ApartmentListView from "../view/ApartmentListView";

// After  
import ApartmentListView from "./ApartmentListView";
```

**Purpose:** Improve code organization by co-locating related components.

---

## Benefits of This Architecture

1. **Separation of Concerns**: API logic isolated from UI logic
2. **Global Access**: Any component can access the service without prop drilling
3. **Easy Testing**: Services can be mocked by providing different context values
4. **Scalability**: Easy to add new API methods without modifying components
5. **Maintainability**: Clear structure makes code easier to understand and modify

## Common Pitfalls to Avoid

- <mark>Don't mix API logic with component state management</mark>
- <mark>Always handle errors in the service layer</mark>
- <mark>Keep the service layer pure</mark> (no React dependencies)
- Use `TypeScript` for better <mark>type safety</mark> if possible
- Consider adding l<mark>oading states at the service level for complex applications</mark>

> This refactoring provides a robust foundation for API-driven React applications and follows modern React best practices.
