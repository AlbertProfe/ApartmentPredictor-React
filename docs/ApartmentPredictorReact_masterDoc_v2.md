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

## Version Goal

todo

### References

- Server (BackEnd):
  
  - [GitHub - AlbertProfe/ApartmentPredictor](https://github.com/AlbertProfe/ApartmentPredictor)
  - [Create JAR from backend Spring Boot](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/appends/DATA-create-JAR.md)

- CodeSandbox:
  
  - [Traffic Lights](https://codesandbox.io/p/sandbox/7f8ffd) / [Scientists Gallery 5](https://codesandbox.io/p/devbox/scientistsgallery4-forked-94z8k7)

- React:
  
  - [Describing the UI](https://react.dev/learn/describing-the-ui) / [Adding Interactivity](https://react.dev/learn/adding-interactivity)
  - [Custom Hooks](https://albertprofe.dev/reactjs/reactjs-hook-custom.html) / [useEffect](https://albertprofe.dev/reactjs/reactjs-hook-effect.html) / [useState](https://albertprofe.dev/reactjs/reactjs-hook-state.html)

- Labs:
  
  - [Lab#RE07-1: traffic lights simulation – albertprofe wiki](https://albertprofe.dev/reactjs/rjslab7-1.html)
  - [Lab#RE01-1: API Rest Axios – albertprofe wiki](https://albertprofe.dev/reactjs/rjslab1.html)
  - [Lab#RE06-1: healthyFood Restaurant – albertprofe wiki](https://albertprofe.dev/reactjs/rjslab6-1.html)

## Project Structure

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

## Data model

Apartment JSON:

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



![](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/diagrams/TREE-ApartmentPredictor_v2.png)

## Code

TODO

### Axios

- https://axios-http.com/

> Axios is a <mark>simple promise based HTTP client for the browser and node.js</mark>. Axios provides a simple to use library in a small package with a very extensible interface.

Installing

Using npm:

```
$ npm install axios
```

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
