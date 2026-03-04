# ApartmentPredictor-React masterDoc v2

## Summary

### Version Goal

> The goal of this phase is to build a **React front-end** that consumes our existing Apartment Predictor **REST API as documented in Postman**, implement CRUD operations and a modern **middleware api**. 

The backend will run locally as a packaged Spring Boot application executed with `java -jar <server>.jar`, and the React application will communicate with it via **Axios** HTTP calls. 

The `React UI` will provide a clean, responsive view focused on apartment browsing and management: 

- it will display `apartments` as a list of <mark>cards</mark> (showing key fields such as price, area, bedrooms, bathrooms, and status attributes), 

- and it will support **full CRUD operations** (create new apartments, edit existing ones, view details, and delete). 

- In addition, the UI will enable `review` management per apartment: users will be able to open an apartment detail view and post reviews linked to that specific apartment, as well as read existing reviews. 

The result should be an<mark> end-to-end working flow from UI to REST endpoints</mark> (and from there Spring Boot and H2 will implement the BackEnd).

We will also create a **modern middleware**:  

- a <mark>single service object containing all Axios-based methods</mark> (get, post, put, delete, etc.) importing sensitive data from an `.env` file (where we will store `beseURL` enpoint data).

- shared via a <mark>context and custom hooks</mark> to decouple API from components and allow componets to consume **data**  when is needed.

### Product Goal

> The **ApartmentPredictor** project aims to build a modern, intelligent real-estate platform that evolves from a simple apartment listings viewer into a comprehensive property management and prediction system. I

ts goal is to provide users with a seamless experience to browse, manage, and analyze real-estate data through a polished `React` frontend and a robust `Spring Boot` backend. 

As the platform grows, it introduces secure `AWS Cognito authentication`, `Stripe`-powered monetization, and AI-driven predictive analytics for rent and sale pricing. 

The final product integrates geospatial visualization with interactive maps, contract insights, and school proximity data, creating a rich, data-informed marketplace for both buyers and property managers. 

> Designed with scalability, usability, and cloud readiness in mind, 

**ApartmentPredictor** combines modern web design, cloud integration, and machine learning to deliver a complete, user-centric solution for exploring, valuing, and managing apartments intelligently.

### References

- Server (BackEnd):
  
  - [GitHub - AlbertProfe/ApartmentPredictor](https://github.com/AlbertProfe/ApartmentPredictor)
  - [Create JAR from backend Spring Boot](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/appends/DATA-create-JAR.md)

- CodeSandbox:
  
  - [Traffic Lights](https://codesandbox.io/p/sandbox/7f8ffd) / [Scientists Gallery 5](https://codesandbox.io/p/devbox/scientistsgallery4-forked-94z8k7)
  - Praga-CRUD: [1](https://codesandbox.io/p/devbox/react-dev-forked-cmrdn2) - [2](https://codesandbox.io/p/devbox/task-crud-forked-9dxyd5?workspaceId=ws_UM9jK6QFKQoLTL71feVrD1) - [3](https://codesandbox.io/p/devbox/task-crud-2-forked-l72dzj?workspaceId=ws_UM9jK6QFKQoLTL71feVrD1) - [4](https://codesandbox.io/p/sandbox/imagelarge-context-1-46rlf4)  / [imageSizeContext](https://codesandbox.io/p/sandbox/wjylz5)

- React:
  
  - [Describing the UI](https://react.dev/learn/describing-the-ui) / [Adding Interactivity](https://react.dev/learn/adding-interactivity) / [Managing the state](https://react.dev/learn/managing-state)
  - [Custom Hooks](https://albertprofe.dev/reactjs/reactjs-hook-custom.html) / [useEffect](https://albertprofe.dev/reactjs/reactjs-hook-effect.html) / [useState](https://albertprofe.dev/reactjs/reactjs-hook-state.html) / [useReducer](https://albertprofe.dev/reactjs/reactjs-hook-reducer.html) / [useContext](https://albertprofe.dev/reactjs/reactjs-hook-context.html)

- Labs:
  
  - [Lab#RE07-1: traffic lights simulation](https://albertprofe.dev/reactjs/rjslab7-1.html)
  - [Lab#RE01-1: API Rest Axios](https://albertprofe.dev/reactjs/rjslab1.html)
  - [Lab#RE06-1: healthyFood Restaurant](https://albertprofe.dev/reactjs/rjslab6-1.html)
  - Middleware & Navigation:
    - **mathsWeb**: [mathsWeb: repo](https://github.com/AlbertProfe/mathsWeb) /  [mathsWeb: deployed](https://mathswebspace.netlify.app/)
    - **userBorrowBook**: [GitHub - AlbertProfe/userBorrowBookFront](https://github.com/AlbertProfe/userBorrowBookFront/tree/master)

## Project Structure

```textile
[Tue Mar 03 12:51:48] albert@albert-VirtualBox:~/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src (master)
$ tree
.
├── apartment
│   └── ApartmentList.jsx
├── App.css
├── App.jsx
├── assets
│   └── react.svg
├── data
│   └── useApartments.jsx
├── index.css
├── main.jsx
└── view
    └── ApartmentListView.jsx

5 directories, 8 files
**Node/Component tree**: product goal
```

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/diagrams/TREE-ApartmentPredictor_v2-2.png)

## Data model

DATA REST <mark>endpoint</mark>

- [apartmentPredictorCRUD](https://documenter.getpostman.com/view/7473960/2sBXVeFs8L)

`Apartment` JSON:

```json
{
    "id": "5ca600bb-6071-4974-aaec-d854aa70aafc",
    "price": null,
    "area": 5,
    "bedrooms": 1,
    "bathrooms": 1,
    "stories": 1,
    "mainroad": "yes",
    "guestroom": "yes",
    "basement": "yes",
    "hotwaterheating": "yes",
    "airconditioning": "yes",
    "parking": 1,
    "prefarea": "yes",
    "furnishingstatus": "none",
    "reviews": [
        {
            "id": "a31a9482-3e47-4ec9-b8c9-9f3d3884c487",
            "title": "Nice Apartment in Fifth Avenue",
            "content": "This apartment exceeded my expectations. The location is perfect and the amenities are top-notch. Highly recommended for anyone looking for a comfortable stay.",
            "rating": 5,
            "reviewDate": "2025-12-12",
            "reviewer": null
        }
    ],
    "schools": [
        {
            "id": "87ffb224-a053-4c3d-b593-cab8cf2f457e",
            "name": "Sunrise School",
            "type": "religious",
            "location": "East Side",
            "rating": 4,
            "public": false
        },
        {
            "id": "a2afa2f1-bab1-4fa6-816e-b77b8f3e31cd",
            "name": "Sunrise High School",
            "type": "religious",
            "location": "Downtown",
            "rating": 4,
            "public": false
        },
        {
            "id": "d217c2be-5079-43c8-9ffb-631ea8642bba",
            "name": "Hill Institute",
            "type": "private",
            "location": "East Side",
            "rating": 1,
            "public": false
        }
    ],
    "contracts": [
        {
            "id": "51ac3c07-4dc9-4d30-81dc-11973aaa4191",
            "propertyContractCode": "PROP-001-123456",
            "urlContractPropertyDocument": "https://docs.example.com/contracts/PROP-001-123456.pdf",
            "contractDate": "2023-06-15",
            "valuePropertyContract": 250000,
            "typeProperty": "APARTMENT",
            "address": "123 Main Street, Apt 4B, New York, NY 10001",
            "owner": {
                "id": "00567d6b-d4d4-486b-b12b-73e50dcd524d",
                "fullName": "David Miller",
                "birthDate": "1982-02-24",
                "email": "david.miller@hotmail.com",
                "password": "password123",
                "idLegalOwner": "RLT-154743",
                "registrationDate": "2016-03-09",
                "qtyDaysAsOwner": 3639,
                "business": false,
                "active": false
            },
            "active": false
        }
    ]
}
```

## Data Provider: middleware

### Axios

> Axios is a <mark>simple promise based HTTP client for the browser and node.js</mark>. Axios provides a simple to use library in a small package with a very extensible interface.

Installing, using npm:

```
$ npm install axios
```

### useContext vs. custom hook

`useContext` (with a <mark>Context</mark> provider) and a `custom hook` solve different problems:

- **useContext/Context**: shares one *instance* of state/data down a subtree so all consumers see the same value and updates.

- **Custom hook**: shares *logic*, not instances; each component that calls the hook gets its own independent state unless the hook itself reads from some shared store (like Context).

#### What useContext is for

We typically use `Context` when:

- We have data that <mark>must be shared by many components</mark> (auth user, theme, current organization, router-like data).

- We want that data to be “**the same**” for all components under a provider.

- We want **React** to handle subscription and re‑rendering when that shared value changes.

With `Axios` data, that usually means:

1. A `provider` does the fetching once (with `useState`/`useEffect`).

2. The value (data, loading, error, refetch) is stored in `Context`.

3. Any child uses `useContext` to read that value and they all see the same cache.

Very simplified:

```jsx
const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/user").then(res => setUser(res.data));
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

function Profile() {
  const user = useContext(UserContext);
  return <div>{user?.name}</div>;
}
```

#### What a custom hook is for

A `custom hook` is just a function that uses hooks to encapsulate reusable logic:

- It’s great for hiding Axios + error handling + retries.

- But every call to the hook creates its **own state** (like calling `useState` twice in two components).

For example:

```jsx
function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/user").then(res => setUser(res.data));
  }, []);

  return user;
}

function Profile() {
  const user = useUser(); // one instance
}

function Sidebar() {
  const user = useUser(); // another, separate instance
}
```

Here, `Profile` and `Sidebar` will fetch independently; they do **not** share the same user state. If you want them to share, you must introduce a shared store: 

- Context, 

- a global store (Redux, Zustand, etc.), 

- or some in‑memory cache you manage.

### How they work together in practice

The common pattern is:

- Use **Context** to hold the shared data/store.

- Use a **custom hook** as a nice API over that context.

Example:

```jsx
const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/user").then(res => setUser(res.data));
  }, []);

  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within <UserProvider>");
  return ctx;
}

// Usage
function Profile() {
  const { user } = useUser(); // shared instance
}
```

Now `useUser` is a custom hook, but it reads from `Context`, so every component that uses `useUser` shares the same Axios‑backed data.

#### Rules of thumb for axios case

- If we just need reusable **fetch logic** and each component can have its own request/lifecycle → <mark>custom hook only.</mark>

- If you need **one shared cache/state** (e.g., fetched once, read many places, stays in sync) → <mark>Context for storage</mark> + custom hook as the access helper.

- Avoid using a `custom hook` with internal `useState` for “shared” data unless you back it with `Context` or some other global store; otherwise you’ll get multiple independent fetches and inconsistent views.

### Middleware: Axios-Service/Context-customs hooks

- [Axios/context api](https://github.com/AlbertProfe/userBorrowBookFront/blob/master/docs/axios-async/axios-context-book.md)

> **The Context + Axios Service Middleware pattern** is a clean, scalable way to manage API calls in React applications.

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/diagrams/UML-ApartmentPredictor_v2-Middleware.png)

We create a <mark>single service object</mark> containing all `Axios-based` methods (`get`, `post`, `put`, `delete`, etc.), often with shared configuration such as baseURL, headers, interceptors for authentication (JWT), global error handling, request logging, or retry logic.

This service object is then provided via **React Context** at the top of the component tree using a `Provider` component. <mark>Components consume it</mark> through a custom hook (e.g. `useApi()`), gaining access to the same centralized, configured `Axios` instance without prop drilling or repeated imports.

**Key benefits**:

- Single place for auth tokens, interceptors, and error/toast handling
- Consistent API behavior across the entire app
- Easy testing (mock the service via Provider)
- Simple to evolve later (swap Axios → fetch, TanStack Query, etc.)
- Avoids duplication and keeps components focused on UI logic

> Ideal for medium to large React apps needing reliable, maintainable HTTP communication.

![](https://raw.githubusercontent.com/AlbertProfe/userBorrowBookFront/refs/heads/master/docs/axios-async/axios_context%20api%20-%20visual%20selection%20(copy).png)

Here is a clean **summary of the 4 steps** to use **React Context** with an **API service** (axios-based) to buid a middleware:

1. **Create the API service object**  
   
   Define a plain JavaScript object (e.g. `BookService` or `ApiService`) that contains all our API methods using **axios** (`getAllBooks`, `createBook`, `updateBook`, `deleteBook`, etc.).  
   Export this object as the default export.  
   → This is our reusable service layer, independent of React.

2. **Create Context + Provider + Custom Hook**  
   
   - Use `React.createContext()` and pass our service object (API service objec) as the **default value**.  
   - Create a **custom hook** (`useBookService` / `useApiService`) that calls `useContext()`.  
   - Create a **Provider component** (`BookServiceProvider`) that wraps children and provides the service object via `<Context.Provider value={BookService}>`.  
     → All three (`Context`, `hook`, `provider`) usually live in the same file as the `service`, and it is a [good practice](https://github.com/facebook/react/issues/17912)
     Example:
   
   ```jsx
    // BookServiceProvider component
    export const BookServiceProvider = ({ children }) => {
          return (
            <BookServiceContext.Provider value={BookService}>
                  {children}
            </BookServiceContext.Provider>
          );
    };
   ```

3. **Wrap your application (or relevant subtree) with the Provider**  
   
   Place `<BookServiceProvider>` (or `ApiServiceProvider`) high in the component tree — most commonly around `<App>` or the main content.  
   Example:
   
   ```jsx
   <BookServiceProvider>
     <div className="App">
       <h1>My App</h1>
       <BookList />
     </div>
   </BookServiceProvider>
   ```
   
   → This makes the service available to all descendant components.

4. **Consume the service in any component using the custom hook**  
   
   Inside any component that needs API calls:  
   
   - Call the custom hook: `const bookService = useBookService()`  
   - cUse the methods directly: `await bookService.getAllBooks()`, etc.  
   - Typically combined with `useState` + `useEffect` for data fetching.  
     → No prop drilling, clean access anywhere below the provider.

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/diagrams/UML-ApartmentPredictor_v2-Middleware-2.png)

> **Quick mental checklist**: 
> 
> Service → Context + Hook + Provider → Wrap app → Use hook in components.

## Apartment Middleware Data provider

todo

## CRUD Apartment

todo

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
