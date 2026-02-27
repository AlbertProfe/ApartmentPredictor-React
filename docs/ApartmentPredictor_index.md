# ApartmentPredictor-React: project management

## Summary

> The **ApartmentPredictor** application evolves through **sprints (seven incremental versions)**, building <mark>from a minimal proof-of-concept into a full-featured real-estate platform</mark> with modern UX, security, monetization, AI, and geospatial capabilities.

**Version 1** delivers a simple read-only apartments list: React frontend fetches data via **axios** + **useEffect** from a basic Spring Boot REST endpoint (`GET /api/apartments`), starting coupled then refactored to decoupled services/hooks.

**Version 2** expands the backend into a rich domain model with full **CRUD** for apartments and relations (Schools, Property Contracts, Reviews, Owners, Reviewers), while frontend gains detailed forms and relational views.

**Version 3** brings professional polish: **Material-UI** components, persistent **Drawer** navigation, and **React Context** for shared global state (apartments list, user profile, light/dark theme).

**Version 4** achieves production readiness with **AWS Cognito** authentication, JWT tokens, protected routes, and login/register pages.

**Version 5** introduces business value via **Stripe** payments: frontend checkout flows, backend session creation, payment intents, and webhooks to manage premium access.

**Version 6** layers intelligence: an **AI Predictor** page using Java ML libraries (Smile/Weka regression, Deeplearning4j/Tribuo neural nets) to forecast rent/sale prices via `/api/predict`.

**Version 7** finalizes visualization: **Leaflet** Map page with apartment/school markers and a detailed **Property/Contract** view.

This progression mirrors mature real-estate platforms — starting with listings, maturing through management, security, monetization, smart predictions, and spatial/contractual insights — creating a scalable, <mark>user-centric solution.</mark> 

## Component tree

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/diagrams/TREE-ApartmentPredictor_v2.png)

## Vesions

Quick Evolution Summary

- **v1** → Proof of concept: just apartments list (coupled → decoupled fetch)
  - [ApartmentPredictor-React/docs/ApartmentPredictorReact_masterDoc_v1](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/ApartmentPredictorReact_masterDoc_v1.md)
- **v2** → Backend becomes rich domain model with relations
  - [ApartmentPredictor-React/docs/ApartmentPredictorReact_masterDoc_v2](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/ApartmentPredictorReact_masterDoc_v2.md)
- **v3** → UI/UX jump: professional look + shared global state
- **v4** → Production readiness: real user management & protection
- **v5** → Business model: payments / monetization
- **v6** → Intelligence layer: AI prediction (Java-based ML)
- **v7** → Spatial & contractual visualization: maps + detailed property/contract views

Here is the original 7-version evolution table **split into two** focused parts for clearer reading and comparison — especially useful when zooming in on frontend/backend progression separately from cross-cutting concerns (state, security, monetization, AI, UI polish, and specialized pages).

### Table 1 – Core Implementation Progression

| Version | Focus / Milestone                     | Frontend (React) Key Changes                                                                                                                        | Backend (Spring Boot) Key Changes                                                                                                                       |
| ------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**   | Simple read-only apartments view      | `useEffect` + **axios** fetching apartments list from REST API (coupled logic)<br>→ Later refactor: move fetch to custom hook / service (decoupled) | Minimal REST endpoint: `GET /api/apartments`                                                                                                            |
| **2**   | Full Apartment CRUD + rich relations  | List → full **CRUD** forms<br>Display relations: Schools, Property Contract, Reviews, Owners, Reviewers                                             | Full **CRUD** endpoints for Apartment + related entities<br>JPA entities & repositories for relations (OneToMany/ManyToMany)                            |
| **3**   | Professional UI + global shared state | Introduce **MUI** (Material-UI)<br>**Drawer** (navigation) for all pages<br>**useContext** for: user data, apartments list, theme (light/dark)      | No major change (still serves full data)                                                                                                                |
| **4**   | Secure user authentication            | Login / Register pages<br>Protected routes (private route wrapper)<br>Store token in context / localStorage                                         | Integrate **AWS Cognito** (via Amplify or direct SDK)<br>JWT validation filter / security config                                                        |
| **5**   | Monetization via payments             | Payment form / checkout page<br>Handle Stripe session creation & redirect                                                                           | **Stripe API** integration: create payment intent / session endpoint<br>Webhook for payment success → update DB (e.g. premium property access)          |
| **6**   | AI-powered price / demand predictor   | New page / section: **Predictor**<br>Input form → show regression / prediction result                                                               | ML service layer: Java regression (Smile, Weka), simple ANN (Deeplearning4j / Tribuo)<br>Endpoint `/api/predict` (features → predicted rent/sale price) |
| **7**   | Geospatial + contract visualization   | **Map** page with **Leaflet** → markers for apartments & schools<br>**Property** page for detailed contract view                                    | Possible geo-indexing (if Postgres+PostGIS) or simple lat/lng filtering                                                                                 |

### Table 2 – Cross-Cutting Concerns & Polish

| Version | State / Data Management                                              | Authentication & Security                                | Payments                   | AI / Advanced Features                                   | UI / Layout Additions                                                              | Mapping & Extra Pages                                |
| ------- | -------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **1**   | Local component state (`useState`)                                   | None                                                     | None                       | None                                                     | Basic list or cards (`CardApartment`)                                              | None                                                 |
| **2**   | Component state + possibly lifting state up                          | Basic optional (later replaced)                          | None                       | None                                                     | Improved layout for details / relations                                            | None                                                 |
| **3**   | **React Context** → global state for apartments, theme, user profile | None yet                                                 | None                       | None                                                     | **Drawer**, theme switcher, consistent MUI styling across **Home**, **Apartments** | None                                                 |
| **4**   | Context holds: user object, roles, isAuthenticated                   | **AWS Cognito** (JWT tokens)                             | None                       | None                                                     | Auth forms + protected layout (show/hide based on auth)                            | None                                                 |
| **5**   | Context / state for payment status                                   | **AWS Cognito**                                          | **Stripe** (card payments) | None                                                     | Payment UI (MUI dialog / page)                                                     | None                                                 |
| **6**   | Context can cache predictions                                        | **AWS Cognito** + roles (admin/user access to predictor) | **Stripe**                 | **AI Predictor** (regression / basic neural net in Java) | Predictor form + chart/result display                                              | None                                                 |
| **7**   | Context shares map-related data (apartments + schools)               | **AWS Cognito**                                          | **Stripe**                 | **AI Predictor**                                         | Enhanced **Drawer**, responsive MUI + Leaflet integration                          | **Map LeafLet** page<br>**Property** / Contract page |

### More

> This progression mirrors common real-estate / property platforms: start with listings → add full management → secure access → payments → smart features → maps/contracts.
