# ApartmentPredictor-React masterDoc v3

## Summary

### Version Goal

In this version we are going to implement a modern <mark>Material-UI navigation architecture</mark> featuring a **responsive sidebar drawer** with collapsible **menu items**, integrated `React Router DOM` for client-side routing between apartment management, dashboard, and several `pages`. 

Apply consistent <mark>theming</mark> using MUI's `sx` props for rapid styling with design tokens, ensuring dark/light mode support and responsive breakpoints. 

The `drawer` will slide in/out with smooth animations, include active route highlighting, and maintain accessibility standards. 

> This foundation will provide scalable navigation patterns for future feature expansion while maintaining clean separation between routing logic and UI components.

### Product Goal

> The **ApartmentPredictor** project aims to build a modern, intelligent real-estate platform that evolves from a simple apartment listings viewer into a comprehensive property management and prediction system. I

Its goal is to provide users with a seamless experience to browse, manage, and analyze real-estate data through a polished `React` frontend and a robust `Spring Boot` backend. 

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
[Thu Mar 12 08:33:33] albert@albert-VirtualBox:~/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src (master)
$ tree
.
├── apartment
│   ├── ApartmentCreate.jsx
│   ├── ApartmentCRUD.jsx
│   ├── ApartmentDetail.jsx
│   ├── ApartmentItem.jsx
│   ├── ApartmentListContainer.jsx
│   ├── ApartmentList.jsx
│   └── ApartmentUpdate.jsx
├── App.css
├── App.jsx
├── assets
│   └── apartmentNewYork.jpg
├── auth
├── components
│   └── ApartmentForm.jsx
├── data
│   └── useApartments.jsx
├── hooks
├── index.css
├── Init.jsx
├── layout
├── main.jsx
├── middleware
│   ├── apartmentApiService.js
│   ├── apartmentServiceHooks.jsx
│   └── apartmentService.jsx
├── navigation
└── pages
    └── ApartmentPage.jsx
```

**Node/Component tree**: product goal

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/diagrams/TREE-ApartmentPredictor_v3-nav.png)

**Project structure**

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/screenshots/PROJECT_apartmentPredictorReact-v3.png)

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

## React MUI

todo (how TO install MUI)

## MUI Drawer Navigation

Let's create a Material-UI drawer navigation system with <mark>React Router</mark> for the Apartment Predictor application.

> The implementation provides a modern, user-friendly navigation experience while maintaining clean, maintainable code structure.

**Step-by-Step Implementation**

**1. Navigation Structure Setup**

- Create [src/navigation/](cci:9://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/navigation:0:0-0:0) directory
- Build [SideBar.jsx](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/navigation/SideBar.jsx:0:0-0:0) - MUI Drawer component with navigation list
- Build [NavigationList.jsx](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/navigation/NavigationList.jsx:0:0-0:0) - Menu items with React Router links

**2. Page Components**

- Create [src/pages/HomePage.jsx](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/pages/HomePage.jsx:0:0-0:0) - <mark>Landing</mark> page with apartment image and welcome content
- Use existing [src/pages/ApartmentPage.jsx](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/pages/ApartmentPage.jsx:0:0-0:0) - `Apartment` management interface

**3. React Router Integration**

- Update [src/App.jsx](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/App.jsx:0:0-0:0) with `BrowserRouter`, `Routes`, and `Route` components
- Configure two main routes:
  - `/` → `HomePage`
  - `/apartments` → `ApartmentPage`

**4. Drawer Functionality**

- Add <mark>hamburger</mark> menu button with fixed positioning (top-left corner)
  - <mark>toggle</mark> functionality for opening/closing drawer
  - Integrate drawer close when `navigation` item is selected

**5. Navigation Menu Items**

- `Home` - Links to `/` with HomeIcon
- `Apartments` - Links to `/apartments` with ApartmentIcon

## Theming

to do (not in this version)

## Code

**NavigationList.jsx**

```jsx
function NavigationList({ toggleDrawer }) {
  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Apartments", icon: <ApartmentIcon />, path: "/apartments" },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={Link}
            to={item.path}
            onClick={toggleDrawer(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default NavigationList;
```

**SideBar.jsx**

```jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import NavigationList from "./NavigationList";

function SideBar({ open, toggleDrawer }) {
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
      <div style={{ padding: '16px' }}>
        <Typography variant="h6">
          Navigation
        </Typography>
        <Divider />

        <NavigationList toggleDrawer={toggleDrawer} />

        <Divider />
      </div>
    </Drawer>
  );
}

export default SideBar;
```

**App.jsx Structure**

```jsx
<BrowserRouter>
  <ApartmentServiceProvider>
    <div style={containerStyle}>
      <IconButton style={buttonStyle}> // Fixed hamburger
      <SideBar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apartments" element={<ApartmentPage />} />
        </Routes>
      </main>
    </div>
  </ApartmentServiceProvider>
</BrowserRouter>
```

### Navigation Flow

1. User clicks <mark>hamburger</mark> menu (top-left corner)
2. <mark>Drawer</mark> slides open from left
3. User selects navigation item
4. <mark>Drawer</mark> closes and route changes
5. <mark>New page renders</mark> in main content area

## package.json

### Dependencies Overview

**Runtime Dependencies:**

- axios (^1.13.2): HTTP client for making API requests to fetch apartment data
- `react` (^19.2.0): Core React library for building UI components
- `react-dom` (^19.2.0): Renders React components to the DOM
- `@mui` dependendencies

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
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^7.3.9",
    "@mui/material": "^7.3.9",
    "axios": "^1.13.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.1"
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
- <mark>MUI</mark> components library
