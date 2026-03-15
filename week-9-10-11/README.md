# Full Stack Vue.js - Product Management Application

## Requirements

- Users can view a list of products.
- Users can add new product
- Users can edit existing product information.
- Users can delete products.
- The application should provide form validation for product data.

## API Endpoints

**Base URL:** `https://fakestoreapi.com`

| Method | Endpoint | Description | Function | Parameters | Response | Status |
|--------|----------|-------------|----------|------------|----------|--------|
| GET | `/products` | Retrieves a list of all products from the store | `getAllProducts()` | None | Array of product objects | ✅ Implemented |
| GET | `/products/{id}` | Retrieves a single product by its ID | `getProductById(id)` | `id` (number) - Product ID | Single product object | 🔄 TODO |
| POST | `/products` | Creates a new product in the store | `createProduct(productData)` | Product object (title, price, description, category, image) | Created product object with ID | ✅ Implemented |
| PUT | `/products/{id}` | Performs a full update of a product (replaces all fields) | `updateProduct(id, productData)` | `id` (number), Complete product object | Updated product object | 🔄 TODO |
| PATCH | `/products/{id}` | Performs a partial update (updates only specified fields) | `patchProduct(id, productData)` | `id` (number), Partial product object | Updated product object | 🔄 TODO |
| DELETE | `/products/{id}` | Deletes a product from the store by its ID | `deleteProduct(id)` | `id` (number) - Product ID to delete | Deleted product object | ✅ Implemented |

### Product Object Structure

```json
{
  "id": 1,
  "title": "Product Title",
  "price": 109.95,
  "description": "Product description",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/example.jpg"
}
```

## Folder Structure

| Path | Type | Description |
|------|------|-------------|
| **src/** | Folder | Main source code directory |
| `src/main.js` | File | Application entry point - initializes Vue app, Vuex store, router, and mounts to DOM |
| `src/App.vue` | File | Root Vue component - main application layout wrapper with conditional navigation based on auth state |
| `src/style.css` | File | Global CSS styles for the application |
| **src/store/** | Folder | **Vuex state management** - centralized data store |
| `src/store/index.js` | File | Main Vuex store - combines all modules (products, auth) |
| **src/store/modules/** | Folder | Vuex store modules for different features |
| `src/store/modules/products.js` | File | **Products module** - manages product state, CRUD operations, pagination (state, getters, mutations, actions) |
| `src/store/modules/auth.js` | File | **Auth module** - manages authentication state, login/logout, user data (state, getters, mutations, actions) |
| **src/api/** | Folder | API service layer for backend communication using Axios |
| `src/api/productApi.js` | File | Product API functions (getAllProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct) |
| `src/api/authApi.js` | File | Authentication API functions (loginUser) |
| **src/assets/** | Folder | Static assets (images, icons) used in components |
| **src/components/** | Folder | Reusable Vue components |
| `src/components/AddProductModal.vue` | File | Modal component for adding new products with form inputs and validation |
| **src/router/** | Folder | Vue Router configuration for navigation with route guards |
| `src/router/index.js` | File | Router setup with routes and authentication guards for protected routes |
| **src/views/** | Folder | Page-level Vue components (route views) - all connected to Vuex store |
| `src/views/HomeView.vue` | File | Home page component - landing page |
| `src/views/AboutView.vue` | File | About page component - information page |
| `src/views/LoginView.vue` | File | Login page - dispatches auth/login action to Vuex store |
| `src/views/ProfileView.vue` | File | Profile page - displays user info from Vuex auth module, logout functionality |
| `src/views/ProductView.vue` | File | Products page - uses Vuex products module for CRUD operations, pagination, and state management |
| `src/views/AdminView.vue` | File | Admin panel page - requires admin role (protected route) |

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue.js | 3.5.30 | Progressive JavaScript framework for building user interfaces |
| Vue Router | 4.6.4 | Official routing library for Vue.js single-page applications with route guards |
| **Vuex** | **4.x** | **Official state management library for Vue.js - centralized store for products and auth** |
| Axios | 1.13.6 | Promise-based HTTP client for API requests |
| Vuejs-paginate-next | 1.0.2 | Pagination component for Vue 3 |
| Vite | 8.0.0 | Fast build tool and development server |

## C4 Container Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                    User                                      │
│                              [Person]                                        │
│                                                                              │
│              Manages products and authenticates through web interface        │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │
                                │ Uses (HTTPS)
                                │
                                v
┌───────────────────────────────────────────────────────────────────────────────┐
│                     Vue.js Single Page Application                            │
│                          [Container: Web App]                                 │
│                   Technology: Vue 3, Vuex, Vue Router, Vite                   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │                     Application Bootstrap                               │  │
│  │                    [Core Initialization]                                │  │
│  │                                                                         │  │
│  │  • Initializes Vue application                                          │  │
│  │  • Registers state management store                                     │  │
│  │  • Registers routing system                                             │  │
│  └────────────────┬────────────────────────────────────────────────────────┘  │
│                   │                                                           │
│                   │                                                           │
│  ┌────────────────v─────────────────┐     ┌──────────────────────────────┐    │
│  │        Routing System            │     │     Static Assets            │    │
│  │      [Navigation Layer]          │     │     [Resources]              │    │
│  │                                  │     │                              │    │
│  │  • Route definitions             │     │  • Images                    │    │
│  │  • Navigation management         │     │  • Icons                     │    │
│  │  • Authentication guards         │     │  • Media files               │    │
│  └────┬─────────────────────────────┘     └──────────────────────────────┘    │
│       │                                                                        │
│       │ Routes to                                                              │
│       v                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │                        View Components                                   │ │
│  │                    [Presentation Layer]                                  │ │
│  │                                                                          │ │
│  │  • Home page                    • Product management page               │ │
│  │  • About page                   • User profile page                     │ │
│  │  • Login page                   • Admin panel page                      │ │
│  │                                                                          │ │
│  │  Reads state from and dispatches actions to Vuex Store                  │ │
│  └────┬────────────────────────────────────────────────┬──────────────────┘ │
│       │                                                 │                     │
│       │ Interacts with                                  │                     │
│       v                                                 v                     │
│  ┌────────────────────────────┐       ┌─────────────────────────────────┐    │
│  │    Reusable Components     │       │      Vuex Store                 │    │
│  │    [UI Components]         │       │   [State Management]            │    │
│  │                            │       │                                 │    │
│  │  • Modal dialogs           │       │  ┌──────────────────────────┐   │    │
│  │  • Forms                   │       │  │   Products Module        │   │    │
│  │  • UI widgets              │       │  │   • Product data         │   │    │
│  └────────────────────────────┘       │  │   • CRUD operations      │   │    │
│                                       │  │   • Pagination state     │   │    │
│                                       │  └──────────────────────────┘   │    │
│                                       │                                 │    │
│                                       │  ┌──────────────────────────┐   │    │
│                                       │  │   Authentication Module  │   │    │
│                                       │  │   • User data            │   │    │
│                                       │  │   • Auth state           │   │    │
│                                       │  │   • Session management   │   │    │
│                                       │  └──────────────────────────┘   │    │
│                                       └──────────┬──────────────────────┘    │
│                                                  │                            │
│                                                  │ Calls                      │
│                                                  v                            │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │                          API Services                                    │ │
│  │                       [HTTP Client Layer]                                │ │
│  │                        Technology: Axios                                 │ │
│  │                                                                          │ │
│  │  • Product API Service          • Authentication API Service            │ │
│  │    - CRUD operations               - User authentication                │ │
│  │    - Product queries               - Session validation                 │ │
│  └────────────────────────────────┬─────────────────────────────────────────┘ │
└───────────────────────────────────┴───────────────────────────────────────────┘
                                    │
                                    │ HTTP Requests (JSON)
                                    │
                                    v
┌───────────────────────────────────────────────────────────────────────────────┐
│                          External REST API                                    │
│                          [External System]                                    │
│                       https://fakestoreapi.com                                │
│                                                                               │
│              Provides product data and authentication services                │
└───────────────────────────────────────────────────────────────────────────────┘

Legend:
────────   Relationship/Data Flow
┌──────┐   Container/Component Boundary
```

### Architecture Overview

**Application Flow with Vuex:**

1. **User** interacts with the **Vue.js SPA** through a web browser
2. **Application Bootstrap** initializes Vuex store and routing system
3. **Routing System** navigates between views with authentication guards
4. **View Components** display UI and interact with Vuex Store
5. **Vuex Store** manages centralized state (products and authentication)
6. **Store Actions** call API Services for backend communication
7. **API Services** send HTTP requests to external REST API
8. **State Updates** trigger reactive UI updates across components

**Key State Management Flow:**

```
User Action → View Component → Vuex Action → API Service →
Backend API → Mutation → State Update → UI Re-render
```

3. **App.vue** displays navigation based on authentication state from **Vuex auth module**
2. **Router** directs users to different **Views** (Home, About, Login, Profile, Products, Admin)
3. **Views** dispatch actions to **Vuex store modules** (products or auth)
4. **Vuex actions** call **API Service Layer** (productApi.js, authApi.js) for data operations
5. **API Service** makes HTTP requests to **Fake Store API** using Axios
6. **API responses** are committed as **mutations** to update **Vuex state**
7. **Components** reactively update when **Vuex state** changes
8. **localStorage** syncs with auth module for session persistence

**Key State Management Flow:**

```
User Action → Component Method → Dispatch Vuex Action → API Call →
Commit Mutation → Update State → Components Auto-Update
```

## C4 Component Diagram (with Vuex State Management)

This diagram shows the high-level internal structure of the Vue.js application with Vuex centralized state management.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                        Vue.js Single Page Application                                   │
│                    [Container: JavaScript/Vue 3 Application]                            │
│                                                                                         │
│  ┌────────────────────────────────────────────────────────────────────────────────┐     │
│  │                      Application Bootstrap                                     │     │
│  │                    [Component: Entry Point]                                    │     │
│  │                     Technology: JavaScript                                     │     │
│  │                                                                                │     │
│  │  • Initializes Vue application                                                │     │
│  │  • Registers Vuex store                                                       │     │
│  │  • Registers routing system                                                   │     │
│  │  • Mounts application to DOM                                                  │     │
│  └───────────────────────┬────────────────────────┬───────────────────────────────┘     │
│                          │                        │                                     │
│                          │ Initializes            │ Initializes                         │
│                          v                        v                                     │
│  ┌──────────────────────────────────────┐  ┌─────────────────────────────────────────┐  │
│  │      Routing System                  │  │        Vuex Store                       │  │
│  │  [Component: Navigation]             │  │  [Component: State Management]          │  │
│  │   Technology: Vue Router             │  │     Technology: Vuex                    │  │
│  │                                      │  │                                         │  │
│  │  • URL-based navigation              │  │  ┌───────────────────────────────────┐  │  │
│  │  • Route mapping to views            │  │  │   Products Module                 │  │  │
│  │  • Authentication guards             │  │  │   [Sub-Component: Store Module]   │  │  │
│  │  • Role-based access control         │  │  │                                   │  │  │
│  └───────┬──────────────────────────────┘  │  │   • Product data management       │  │  │
│          │                                  │  │   • CRUD operations               │  │  │
│          │ Routes to                        │  │   • Pagination state              │  │  │
│          v                                  │  │   • Loading states               │  │  │
│  ┌──────────────────────────────────────┐  │  │                                   │  │  │
│  │      Root Component                  │  │  │   Provides:                       │  │  │
│  │  [Component: App Shell]              │  │  │   • Product queries ──────────┐   │  │  │
│  │    Technology: Vue 3                 │  │  │   • State mutations           │   │  │  │
│  │                                      │  │  │   • Async actions             │   │  │  │
│  │  • Global navigation                 │  │  └───────────────────────────────┼───┘  │  │
│  │  • Content routing                   │  │                                  │      │  │
│  │  • Auth-based UI    ─────────────────┼──┼──────────────────────────────────┘      │  │
│  │                            Reads     │  │           Reads state                   │  │
│  │                            auth      │  │                                         │  │
│  │                            state     │  │  ┌───────────────────────────────────┐  │  │
│  └───────┬──────────────────────────────┘  │  │   Auth Module                     │  │  │
│          │                                  │  │   [Sub-Component: Store Module]   │  │  │
│          │ Contains                         │  │                                   │  │  │
│          v                                  │  │   • User authentication          │  │  │
│  ┌──────────────────────────────────────┐  │  │   • Session management           │  │  │
│  │        View Components               │  │  │   • Role/permission data         │  │  │
│  │   [Component: Page Views]            │  │  │   • Loading states               │  │  │
│  │     Technology: Vue 3                │  │  │                                   │  │  │
│  │                                      │  │  │   Provides:                       │  │  │
│  │  ┌────────────────────────────────┐  │  │  │   • Auth queries ─────────────┐   │  │  │
│  │  │  Product Management View       │  │  │  │   • Login/logout operations  │   │  │  │
│  │  │  [Page: Products]              │  │  │  │   • Session persistence      │   │  │  │
│  │  │                                │  │  │  └──────────────────────────────┼───┘  │  │
│  │  │  • Product display             │  │  │                                 │      │  │
│  │  │  • Pagination UI       ────────┼──┼──┼─> Dispatches product actions   │      │  │
│  │  │  • CRUD operations             │  │  │                                 │      │  │
│  │  │  • Uses product modal          │  │  │                                 │      │  │
│  │  └────────────────────────────────┘  │  │                                 │      │  │
│  │                                      │  │                                 │      │  │
│  │  ┌────────────────────────────────┐  │  │                                 │      │  │
│  │  │  Login View                    │  │  │                                 │      │  │
│  │  │  [Page: Authentication]        │  │  │                                 │      │  │
│  │  │                                │  │  │                                 │      │  │
│  │  │  • Login form                  │  │  │                                 │      │  │
│  │  │  • Credential input    ────────┼──┼──┼─> Dispatches login ────────────┘      │  │
│  │  │  • Form validation             │  │  │                                        │  │
│  │  └────────────────────────────────┘  │  │                                        │  │
│  │                                      │  │                                        │  │
│  │  ┌────────────────────────────────┐  │  │                                        │  │
│  │  │  Profile View                  │  │  │                                        │  │
│  │  │  [Page: User Profile]          │  │  │                                        │  │
│  │  │                                │  │  │                                        │  │
│  │  │  • User information  ──────────┼──┼──┼─> Reads user data                      │  │
│  │  │  • Logout action     ──────────┼──┼──┼─> Dispatches logout                    │  │
│  │  └────────────────────────────────┘  │  │                                        │  │
│  │                                      │  │                                        │  │
│  │  ┌────────────────────────────────┐  │  │         Syncs with                     │  │
│  │  │  Home View                     │  │  │         localStorage                   │  │
│  │  │  [Page: Landing]               │  │  │                ↕                        │  │
│  │  └────────────────────────────────┘  │  │      Browser localStorage              │  │
│  │                                      │  │      • Auth session data               │  │
│  │  ┌────────────────────────────────┐  │  │                                        │  │
│  │  │  About View                    │  │  │                                        │  │
│  │  │  [Page: Information]           │  │  │                                        │  │
│  │  └────────────────────────────────┘  │  │                                        │  │
│  │                                      │  │                                        │  │
│  │  ┌────────────────────────────────┐  │  │                                        │  │
│  │  │  Admin View                    │  │  │                                        │  │
│  │  │  [Page: Administration]        │  │  │                                        │  │
│  │  └────────────────────────────────┘  │  └────────────────────────────────────────┘  │
│  └───────────────┬───────────────────────┘                                             │
│                  │                                                                     │
│                  │ Uses                                                                │
│                  v                                                                     │
│  ┌──────────────────────────────────────┐                                              │  │
│  │      Reusable Components             │                                              │  │
│  │  [Component: UI Elements]            │                                              │  │
│  │    Technology: Vue 3                 │                                              │  │
│  │                                      │                                              │  │
│  │  • Product form modal                │                                              │  │
│  │  • Form validation                   │                                              │  │
│  │  • Event emission                    │                                              │  │
│  └──────────────────────────────────────┘                                              │  │
│                                                                                         │  │
│  ┌────────────────────────────────────────────────────────────────────────────────┐    │  │
│  │                          API Service Layer                                     │    │  │
│  │                    [Component: HTTP Client Services]                           │    │  │
│  │                          Technology: Axios                                     │    │  │
│  │                                                                                │    │  │
│  │  ┌──────────────────────────────────────────────────────────────────────────┐  │    │  │
│  │  │  Product API Service                                                     │  │    │  │
│  │  │  [API Service: Product Operations]                                      │  │    │  │
│  │  │                                                                          │  │    │  │
│  │  │  • CRUD operations  ◄───────────────────────────────────────────────────────────┼──┘
│  │  │  • Data transformation       Called by Vuex product actions              │  │    │
│  │  └──────────────────────────────────────────────────────────────────────────┘  │    │
│  │                                                                                │    │
│  │  ┌──────────────────────────────────────────────────────────────────────────┐  │    │
│  │  │  Auth API Service                                                        │  │    │
│  │  │  [API Service: Authentication]                                           │  │    │
│  │  │                                                                          │  │    │
│  │  │  • Login operations  ◄──────────── Called by Vuex auth actions           │  │    │
│  │  └──────────────────────────────────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────┬───────────────────────────────────────────┘    │
│                                       │                                                │
└───────────────────────────────────────┼────────────────────────────────────────────────┘
                                        │
                                        │ HTTP Requests
                                        │ REST API calls
                                        v
                        ┌──────────────────────────────────────┐
                        │     External REST API                │
                        │  [External System: Backend Service]  │
                        │                                      │
                        │  Provides:                           │
                        │  • Product endpoints                 │
                        │  • Authentication endpoints          │
                        │  • Data persistence                  │
                        └──────────────────────────────────────┘

Legend:
──────►   Data Flow / Dependency
┌─────┐   Component Boundary
│     │
└─────┘
```

### Component Diagram Details

#### Key Architectural Patterns

**1. Centralized State Management**

```
Components → Store Actions → Store Mutations → State → Reactive Updates → Components
                    ↓
              API Service Layer
```

**2. Module Structure**

- **Products Module**: Manages product data, CRUD operations, pagination
- **Auth Module**: Manages authentication state, login/logout, session persistence

**3. Component Hierarchy**

```
Application Bootstrap
  ├── Routing System
  ├── Root Component
  │   └── View Components
  │       └── Reusable Components
  └── Vuex Store
      ├── Products Module
      └── Auth Module
```

**4. Data Flow Pattern**

```
User Interaction
        ↓
Component dispatches action
        ↓
Store action calls API service
        ↓
API request to backend
        ↓
Response received
        ↓
Store mutation updates state
        ↓
State change triggers reactive update
        ↓
UI automatically re-renders
```

**5. Authentication Flow**

```
Login view receives credentials
        ↓
Auth action dispatched
        ↓
API authentication call
        ↓
Success response
        ↓
Store mutation updates user state
        ↓
Session persisted to localStorage
        ↓
Components read new auth state
        ↓
Navigation updates based on role
        ↓
Router redirects to protected route
```

**6. Communication Patterns**

- **Props & Events**: Local component communication
- **Vuex Store**: Global state shared across components
- **Router**: URL-based navigation and route guards
- **localStorage**: Authentication session persistence

### Benefits of This Architecture

✅ **Separation of Concerns**

- Views handle UI presentation
- Store handles business logic
- API services handle HTTP communication
- Router handles navigation

✅ **Single Source of Truth**

- All application state centralized in Vuex
- No duplicate data across components
- Consistent data throughout application

✅ **Scalability**

- Easy to add new store modules
- Modular structure supports team development
- Clear boundaries between components

✅ **Maintainability**

- Organized by feature domains
- Easy to locate and debug issues
- Predictable data flow patterns

✅ **Testability**

- Store can be tested independently
- Components testable with mocked store
- API services isolated for unit testing

## Vue.js Component Communication - Emit Events Flow

### Overview

This application demonstrates **Parent-Child Communication** using Vue 3's emit event system between `ProductView.vue` (parent) and `AddProductModal.vue` (child component).

### Complete Event Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ProductView.vue (Parent)                            │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  Template:                                                         │     │
│  │  <button @click="addProduct">Add Product</button>                  │     │
│  │                                                                    │     │
│  │  <AddProductModal                                                  │     │
│  │    :visible="showAddModal"         ← Prop binding (data down)      │     │
│  │    @close="handleCloseModal"       ← Event listener (events up)    │     │
│  │    @add="handleAddProduct"         ← Event listener (events up)    │     │
│  │  />                                                                │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  data() {                                                          │     │
│  │    return { showAddModal: false, products: [] }                    │     │
│  │  }                                                                 │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  methods: {                                                        │     │
│  │    addProduct() {                                                  │     │
│  │      this.showAddModal = true  ← Opens modal                       │    │
│  │    },                                                              │    │
│  │    handleCloseModal() {                                            │    │
│  │      this.showAddModal = false ← Closes modal                     │    │
│  │    },                                                              │    │
│  │    async handleAddProduct(productData) {                           │    │
│  │      const response = await createProduct(productData)            │    │
│  │      this.products.push(response.data)                            │    │
│  │      this.showAddModal = false                                    │    │
│  │    }                                                               │    │
│  │  }                                                                 │    │
│  └────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                 Props Down ↓     │     ↑ Events Up
                                  │
┌─────────────────────────────────▼───────────────────────────────────────────┐
│                    AddProductModal.vue (Child Component)                    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  props: {                                                          │     │
│  │    visible: { type: Boolean, default: false }                      │     │
│  │  }                                                                 │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  data() {                                                          │     │
│  │    return {                                                        │     │
│  │      product: {                                                    │     │
│  │        title: "", price: 0, category: "",                          │     │
│  │        description: "", image: ""                                  │     │
│  │      }                                                             │     │
│  │    }                                                               │     │
│  │  }                                                                 │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  methods: {                                                        │     │
│  │    closeModal() {                                                  │     │
│  │      this.$emit('close')  ← Emits 'close' event to parent          │     │
│  │    },                                                              │     │
│  │    submitProduct() {                                               │     │
│  │      this.$emit('add', { ...this.product })                        │     │
│  │             ↑      ↑                                               │     │
│  │       Event Name   Payload (product data)                          │     │
│  │      this.closeModal()                                             │     │
│  │    }                                                               │     │
│  │  }                                                                 │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  Template Actions:                                                 │     │
│  │  <button @click="closeModal">Cancel</button>                       │    │
│  │  <form @submit.prevent="submitProduct">                            │    │
│  │    <input v-model="product.title" />                               │    │
│  │    <input v-model="product.price" />                               │    │
│  │    <button type="submit">Add Product</button>                      │    │
│  │  </form>                                                           │    │
│  └────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Event Flow

#### Scenario 1: User Adds a New Product

```
┌────────┐      ┌──────────────┐      ┌──────────────────┐      ┌──────────┐
│  User  │      │ ProductView  │      │AddProductModal   │      │   API    │
└───┬────┘      └──────┬───────┘      └────────┬─────────┘      └────┬─────┘
    │                  │                       │                     │
    │ 1. Clicks        │                       │                     │
    │ "Add Product"    │                       │                     │
    ├─────────────────>│                       │                     │
    │                  │                       │                     │
    │                  │ 2. Sets               │                     │
    │                  │ showAddModal = true   │                     │
    │                  │                       │                     │
    │                  │ 3. Props update       │                     │
    │                  │ :visible="true"       │                     │
    │                  ├──────────────────────>│                     │
    │                  │                       │                     │
    │                  │ 4. Modal opens        │                     │
    │                  │    displays form      │                     │
    │                  │                       │                     │
    │ 5. Fills form    │                       │                     │
    │ and submits      │                       │                     │
    ├──────────────────┼──────────────────────>│                     │
    │                  │                       │                     │
    │                  │                       │ 6. Validates data   │
    │                  │                       │    collects input   │
    │                  │                       │                     │
    │                  │ 7. Emits 'add' event  │                     │
    │                  │    with productData   │                     │
    │                  │<──────────────────────┤                     │
    │                  │                       │                     │
    │                  │ 8. handleAddProduct() │                     │
    │                  │    receives data      │                     │
    │                  │                       │                     │
    │                  │ 9. POST /products     │                     │
    │                  ├───────────────────────┼────────────────────>│
    │                  │                       │                     │
    │                  │ 10. Response (201)    │                     │
    │                  │<────────────────────────────────────────────┤
    │                  │                       │                     │
    │                  │ 11. Adds to           │                     │
    │                  │     products array    │                     │
    │                  │                       │                     │
    │                  │ 12. Sets              │                     │
    │                  │ showAddModal = false  │                     │
    │                  │                       │                     │
    │                  │ 13. Props update      │                     │
    │                  │ :visible="false"      │                     │
    │                  ├──────────────────────>│                     │
    │                  │                       │                     │
    │                  │ 14. Modal closes      │                     │
    │ 15. Sees new     │                       │                     │
    │     product in   │                       │                     │
    │     table        │                       │                     │
    │<─────────────────┤                       │                     │
```

#### Scenario 2: User Cancels Modal

```
┌────────┐      ┌──────────────┐      ┌──────────────────┐
│  User  │      │ ProductView  │      │AddProductModal   │
└───┬────┘      └──────┬───────┘      └────────┬─────────┘
    │                  │                       │
    │ 1. Opens modal   │                       │
    ├─────────────────>│──────────────────────>│
    │                  │                       │
    │ 2. Clicks        │                       │
    │    Cancel or X   │                       │
    ├──────────────────┼──────────────────────>│
    │                  │                       │
    │                  │ 3. closeModal()       │
    │                  │    this.$emit('close')│
    │                  │<──────────────────────┤
    │                  │                       │
    │                  │ 4. handleCloseModal() │
    │                  │    showAddModal=false │
    │                  │                       │
    │                  │ 5. Modal hidden       │
    │                  ├──────────────────────>│
```

### Key Concepts

#### 1. Props Down (Parent → Child)

```javascript
// ProductView.vue (Parent)
<AddProductModal :visible="showAddModal" />

// AddProductModal.vue (Child)
props: {
  visible: { type: Boolean, default: false }
}
```

**Purpose:** Pass data from parent to child (one-way data flow)

#### 2. Events Up (Child → Parent)

```javascript
// AddProductModal.vue (Child) - Emitting events
methods: {
  closeModal() {
    this.$emit('close')  // No payload
  },
  submitProduct() {
    this.$emit('add', { ...this.product })  // With payload
  }
}

// ProductView.vue (Parent) - Listening to events
<AddProductModal
  @close="handleCloseModal"
  @add="handleAddProduct"
/>

methods: {
  handleCloseModal() {
    // Handle close event
  },
  handleAddProduct(productData) {
    // Handle add event with payload
  }
}
```

**Purpose:** Child notifies parent of user actions or state changes

#### 3. Event Payload

The `add` event sends the complete product data object:

```javascript
{
  title: "Fjallraven Backpack",
  price: 109.95,
  description: "Perfect for everyday use...",
  category: "men's clothing",
  image: "http://example.com/image.jpg"
}
```

### Event Types in This Application

| Event Name | Source | Target | Payload | Purpose |
|------------|--------|--------|---------|---------|
| `close` | AddProductModal | ProductView | None | Close the modal without saving |
| `add` | AddProductModal | ProductView | Product Object | Submit new product data to parent |

## How Pagination Works in ProductView.vue

### What is Pagination?

Pagination splits a large list of products into smaller pages. Instead of showing all 100 products at once, we show 5 products per page.

**Why?** Better performance and easier to read!

### The Three Main Parts

#### 1. Data - Store the Information

```javascript
data() {
  return {
    products: [],        // All products from API
    currentPage: 1,      // Which page we're on (starts at 1)
    itemsPerPage: 5      // Show 5 products per page
  }
}
```

#### 2. Computed - Calculate What to Show

```javascript
computed: {
  // How many pages do we need?
  pageCount() {
    return Math.ceil(this.products.length / this.itemsPerPage);
    // Example: 12 products ÷ 5 per page = 2.4 → rounds up to 3 pages
  },

  // Which products should display on current page?
  paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.products.slice(start, end);
  }
}
```

#### 3. Method - Handle Page Changes

```javascript
methods: {
  handlePageChange(pageNum) {
    this.currentPage = pageNum;  // Update current page
    // Vue automatically recalculates paginatedProducts!
  }
}
```

### How It Works - Simple Example

**Scenario:** You have 12 products and show 5 per page

```text
All Products: [P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12]
Items per page: 5
Total pages needed: 12 ÷ 5 = 2.4 → 3 pages

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE 1 (currentPage = 1):
  start = (1-1) × 5 = 0
  end = 0 + 5 = 5
  Display: [P1, P2, P3, P4, P5]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE 2 (currentPage = 2):
  start = (2-1) × 5 = 5
  end = 5 + 5 = 10
  Display: [P6, P7, P8, P9, P10]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE 3 (currentPage = 3):
  start = (3-1) × 5 = 10
  end = 10 + 5 = 15
  Display: [P11, P12]  (only 2 items left)
```

### Template - Display the Pagination

```js
<!-- Show only current page products -->
<tr v-for="product in paginatedProducts" :key="product.id">
  <td>{{ product.title }}</td>
</tr>

<!-- Pagination buttons -->
<paginate
  :page-count="pageCount"
  :click-handler="handlePageChange"
  :prev-text="'Previous'"
  :next-text="'Next'"
/>
```

### What Happens When User Clicks Page 2?

```bash

1. User clicks "2" button
   ↓
2. handlePageChange(2) is called
   ↓
3. currentPage changes from 1 to 2
   ↓
4. Vue recalculates paginatedProducts automatically
   ↓
5. Table updates to show products 6-10

```

### Key Points to Remember

✅ **Store all products** in `products` array
✅ **Computed properties** automatically recalculate when data changes
✅ **Display only** `paginatedProducts` in the table, not all products
✅ **Vue's reactivity** handles all updates automatically - no manual work!

## Student Tasks (TODO)

Complete the following incomplete features:

### 1. Implement API Functions in `productApi.js`

| Function | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| `getProductById(id)` | GET | `/products/{id}` | Fetch a single product by ID |
| `getProductsByCategory(category)` | GET | `/products/category/{category}` | Fetch products by category |
| `updateProduct(id, productData)` | PUT | `/products/{id}` | Update complete product |
| `patchProduct(id, productData)` | PATCH | `/products/{id}` | Update partial product |

### 2. Implement View Functions in `ProductView.vue`

| Function | Description |
|----------|-------------|
| `editProduct(product)` | Create edit modal, update product, modify list |
| `viewProduct(product)` | Show product details in modal or new page |

### 3. Checklist

- [ ] All 4 API functions implemented
- [ ] Edit product works
- [ ] View product works
- [ ] Tested all features

## Authentication and Authorization

### Overview

This application implements a **client-side authentication system** using `localStorage` to manage user sessions. While simple for learning purposes, note that this approach is **not production-ready** as localStorage can be manually manipulated.

### Authentication Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                          Vue.js Application                                  │
│                                                                              │
│  ┌─────────────────────┐    ┌──────────────────┐    ┌────────────────────┐   │
│  │   App.vue           │    │  LoginView.vue   │    │ ProfileView.vue    │   │
│  │  [Root Component]   │    │   [Login Page]   │    │  [Profile Page]    │   │
│  │                     │    │                  │    │                    │   │
│  │  - Auth Nav Display │    │  - Login Form    │    │  - User Display    │   │
│  │  - Route Guards     │    │  - Auth API Call │    │  - Logout Button   │   │
│  └──────────┬──────────┘    └────────┬─────────┘    └─────────┬──────────┘   │
│             │                        │                        │              │
│             │                        │                        │              │
│             │        ┌───────────────┴─────────────────┐      │              │
│             └───────>│       localStorage              │<─────┘              │
│                      │   [Client-Side Storage]         │                     │
│                      │                                 │                     │
│                      │  • isAuthenticated: "true"      │                     │
│                      │  • username: "john_doe"         │                     │
│                      └─────────────────────────────────┘                     │
│                                      │                                       │
└──────────────────────────────────────┼───────────────────────────────────────┘
                                       │
                                       │ API Call
                                       v
                        ┌──────────────────────────────┐
                        │    authApi.js                │
                        │   [Auth Service]             │
                        │                              │
                        │  loginUser(username, pass)   │
                        └──────────────┬───────────────┘
                                       │
                                       │ POST /auth/login
                                       v
                        ┌──────────────────────────────┐
                        │   Backend Auth API           │
                        │   [External System]          │
                        └──────────────────────────────┘
```

### Complete Authentication Flow

#### 1. Login Flow - Sequence Diagram

```
┌────────┐     ┌─────────────┐      ┌──────────┐     ┌──────────────┐     ┌───────┐
│  User  │     │ LoginView   │      │ authApi  │     │ localStorage │     │ Router│
└───┬────┘     └──────┬──────┘      └────┬─────┘     └──────┬───────┘     └───┬───┘
    │                 │                  │                  │                 │
    │ 1. Navigate to  │                  │                  │                 │
    │    /login       │                  │                  │                 │
    ├────────────────>│                  │                  │                 │
    │                 │                  │                  │                 │
    │ 2. Displays     │                  │                  │                 │
    │    login form   │                  │                  │                 │
    │<────────────────┤                  │                  │                 │
    │                 │                  │                  │                 │
    │ 3. Enters       │                  │                  │                 │
    │    credentials  │                  │                  │                 │
    │    and submits  │                  │                  │                 │
    ├────────────────>│                  │                  │                 │
    │                 │                  │                  │                 │
    │                 │ 4. Sets loading  │                  │                 │
    │                 │    loading=true  │                  │                 │
    │                 │                  │                  │                 │
    │ Shows "Logging  │                  │                  │                 │
    │ in..." message  │                  │                  │                 │
    │<────────────────┤                  │                  │                 │
    │                 │                  │                  │                 │
    │                 │ 5. Calls         │                  │                 │
    │                 │ loginUser()      │                  │                 │
    │                 ├─────────────────>│                  │                 │
    │                 │                  │                  │                 │
    │                 │                  │ 6. POST request  │                 │
    │                 │                  │    /auth/login   │                 │
    │                 │                  ├─────────┐        │                 │
    │                 │                  │         │        │                 │
    │                 │                  │<────────┘        │                 │
    │                 │                  │                  │                 │
    │                 │ 7. Returns       │                  │                 │
    │                 │    response      │                  │                 │
    │                 │    status: 201   │                  │                 │
    │                 │<─────────────────┤                  │                 │
    │                 │                  │                  │                 │
    │                 │ 8. Check status  │                  │                 │
    │                 │    if !== 201    │                  │                 │
    │                 │    → alert error │                  │                 │
    │                 │                  │                  │                 │
    │ Alert: "Login   │                  │                  │                 │
    │ successful!"    │                  │                  │                 │
    │<────────────────┤                  │                  │                 │
    │                 │                  │                  │                 │
    │                 │ 9. Store auth    │                  │                 │
    │                 │    state         │                  │                 │
    │                 ├──────────────────┼─────────────────>│                 │
    │                 │ setItem("isAuthenticated", "true")  │                 │
    │                 ├──────────────────┼─────────────────>│                 │
    │                 │ setItem("username", this.username)  │                 │
    │                 │                  │                  │                 │
    │                 │ 10. loading=false│                  │                 │
    │                 │                  │                  │                 │
    │                 │ 11. Redirect to  │                  │                 │
    │                 │     /profile     │                  │                 │
    │                 ├──────────────────┼──────────────────┼────────────────>│
    │                 │                  │                  │                 │
    │                 │                  │                  │ 12. Navigate to │
    │                 │                  │                  │     ProfileView │
    │<────────────────┴──────────────────┴──────────────────┴─────────────────┤
```

#### 2. Authentication State Check (App.vue)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         App.vue - Navigation Bar                            │
│                                                                             │
│  When App.vue Loads:                                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  data() {                                                             │  │
│  │    return {                                                           │  │
│  │      isAuthenticated: localStorage.getItem("isAuthenticated")==="true"│  │
│  │    }                                                                  │  │
│  │  }                                                                    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Navigation Display Logic:                                                  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  <nav>                                                                │  │
│  │    <RouterLink to="/">Go to Home</RouterLink>                         │  │
│  │    <RouterLink to="/about">Go to About</RouterLink>                   │  │
│  │                                                                       │  │
│  │    <!-- Only show if authenticated -->                                │  │
│  │    <RouterLink v-if="isAuthenticated" to="/products">                │  │
│  │      Go to Products                                                   │  │
│  │    </RouterLink>                                                      │  │
│  │                                                                       │  │
│  │    <RouterLink to="/login">Go to Login</RouterLink>                   │  │
│  │                                                                       │  │
│  │    <!-- Only show if authenticated -->                                │  │
│  │    <RouterLink v-if="isAuthenticated" to="/profile">                 │  │
│  │      Go to Profile                                                    │  │
│  │    </RouterLink>                                                      │  │
│  │  </nav>                                                               │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Result Based on Authentication State:                                      │
│                                                                             │
│  ┌─ NOT AUTHENTICATED (isAuthenticated = false) ──────────────────────┐    │
│  │                                                                     │    │
│  │  Visible Links:                                                     │    │
│  │  [Home] | [About] | [Login]                                         │    │
│  │                                                                     │    │
│  │  Hidden Links:                                                      │    │
│  │  Products ❌   Profile ❌                                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─ AUTHENTICATED (isAuthenticated = true) ────────────────────────────┐    │
│  │                                                                     │    │
│  │  Visible Links:                                                     │    │
│  │  [Home] | [About] | [Products] | [Login] | [Profile]               │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3. Profile View and Logout Flow

```
┌────────┐        ┌──────────────────┐        ┌──────────────┐        ┌────────┐
│  User  │        │  ProfileView.vue │        │ localStorage │        │ Router │
└───┬────┘        └────────┬─────────┘        └──────┬───────┘        └───┬────┘
    │                      │                         │                    │
    │ 1. Navigate to       │                         │                    │
    │    /profile          │                         │                    │
    ├─────────────────────>│                         │                    │
    │                      │                         │                    │
    │                      │ 2. Load profile data    │                    │
    │                      │    from localStorage    │                    │
    │                      ├────────────────────────>│                    │
    │                      │                         │                    │
    │                      │ 3. Get username         │                    │
    │                      │<────────────────────────┤                    │
    │                      │                         │                    │
    │                      │ data() {                │                    │
    │                      │   username: localStorage│                    │
    │                      │     .getItem("username")│                    │
    │                      │ }                       │                    │
    │                      │                         │                    │
    │ 4. Display profile   │                         │                    │
    │    page with welcome │                         │                    │
    │    message           │                         │                    │
    │<─────────────────────┤                         │                    │
    │                      │                         │                    │
    │  ┌────────────────┐  │                         │                    │
    │  │ Profile Page   │  │                         │                    │
    │  │                │  │                         │                    │
    │  │ Welcome,       │  │                         │                    │
    │  │ john_doe!      │  │                         │                    │
    │  │                │  │                         │                    │
    │  │ [Logout]       │  │                         │                    │
    │  └────────────────┘  │                         │                    │
    │                      │                         │                    │
    │ 5. Click Logout      │                         │                    │
    │      button          │                         │                    │
    ├─────────────────────>│                         │                    │
    │                      │                         │                    │
    │                      │ 6. handleLogout() called│                    │
    │                      │                         │                    │
    │                      │ 7. Remove auth data     │                    │
    │                      ├────────────────────────>│                    │
    │                      │ removeItem("isAuthenticated")                │
    │                      ├────────────────────────>│                    │
    │                      │ removeItem("username")  │                    │
    │                      │                         │                    │
    │                      │ 8. Reset local state    │                    │
    │                      │    username =           │                    │
    │                      │    "Not logged in"      │                    │
    │                      │                         │                    │
    │                      │ 9. Redirect to home     │                    │
    │                      ├─────────────────────────┼───────────────────>│
    │                      │    router.push("/")     │                    │
    │                      │                         │                    │
    │ 10. Navigate to      │                         │                    │
    │     home page        │                         │                    │
    │<─────────────────────┴─────────────────────────┴────────────────────┤
```

#### 4. localStorage State Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          localStorage State                                 │
│                                                                             │
│  ┌─────────────────────────┐                ┌─────────────────────────┐     │
│  │   LOGGED OUT STATE      │                │   LOGGED IN STATE        │     │
│  │  ┌───────────────────┐  │                │  ┌───────────────────┐  │     │
│  │  │  localStorage:    │  │                │  │  localStorage:    │  │     │
│  │  │                   │  │                │  │                   │  │     │
│  │  │  (empty)          │  │   Login with   │  │  isAuthenticated: │  │     │
│  │  │    OR             │◄─┼────Successful──┼──┤  "true"           │  │     │
│  │  │  isAuthenticated: │  │   Credentials  │  │                   │  │     │
│  │  │  null/undefined   │  │                │  │  username:        │  │     │
│  │  │                   │  │                │  │  "john_doe"       │  │     │
│  │  │  username:        │  │                │  │                   │  │     │
│  │  │  null/undefined   │  │                │  └───────────────────┘  │     │
│  │  └───────────────────┘  │                │                         │     │
│  │                         │                │  Navigation Links:       │     │
│  │  Navigation Links:      │                │  ✅ Home                 │     │
│  │  ✅ Home                │   Logout       │  ✅ About                │     │
│  │  ✅ About               │   Button       │  ✅ Login                │     │
│  │  ✅ Login               │   Clicked      │  ✅ Products             │     │
│  │  ❌ Products            │                │  ✅ Profile              │     │
│  │  ❌ Profile             │◄───────────────┤                         │     │
│  │                         │                │  Available Pages:        │     │
│  │  Available Pages:       │                │  • View product list     │     │
│  │  • Home page only       │                │  • Add/edit/delete       │     │
│  │  • About page           │                │  • View profile          │     │
│  │  • Login page           │                │  • Logout                │     │
│  └─────────────────────────┘                └─────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 5. Complete Application Flow with Authentication

```
                              User Opens Application
                                       │
                                       v
                        ┌──────────────────────────────┐
                        │  App.vue Loads               │
                        │  Check localStorage          │
                        │  for "isAuthenticated"       │
                        └──────────┬───────────────────┘
                                   │
                ┌──────────────────┴──────────────────┐
                │                                     │
                v                                     v
    ┌─────────────────────┐              ┌─────────────────────┐
    │ Not Authenticated   │              │  Authenticated      │
    │ (null or "false")   │              │  ("true")           │
    └──────────┬──────────┘              └──────────┬──────────┘
               │                                    │
               │                                    │
               v                                    v
    ┌─────────────────────┐              ┌─────────────────────┐
    │ Show Limited Nav:   │              │ Show Full Nav:      │
    │ • Home              │              │ • Home              │
    │ • About             │              │ • About             │
    │ • Login             │              │ • Products X        │
    │                     │              │ • Login             │
    └──────────┬──────────┘              │ • Profile X         │
               │                         └──────────┬──────────┘
               │                                    │
               │ User clicks Login                  │ User browses app
               v                                    v
    ┌─────────────────────┐              ┌─────────────────────┐
    │  LoginView          │              │ Can access:         │
    │  • Enter username   │              │ • ProductView       │
    │  • Enter password   │              │ • ProfileView       │
    │  • Submit form      │              │ • All features      │
    └──────────┬──────────┘              └──────────┬──────────┘
               │                                    │
               │ Call loginUser()                   │
               v                                    │
    ┌─────────────────────┐                         │
    │ authApi.js          │                         │
    │ POST /auth/login    │                         │
    └──────────┬──────────┘                         │
               │                                    │
         ┌─────┴─────┐                              │
         │           │                              │
    Success      Failure                            │
    (201)      (4xx/5xx)                            │
         │           │                              │
         │           v                              │
         │    ┌────────────┐                        │
         │    │Show alert: │                        │
         │    │"Login      │                        │
         │    │ failed"    │                        │
         │    └────────────┘                        │
         │                                          │
         v                                          │
    ┌─────────────────────┐                         │
    │ Save to localStorage│                         │
    │ • isAuthenticated   │                         │
    │ • username          │                         │
    └──────────┬──────────┘                         │
               │                                    │
               │ router.push("/profile")            │
               │                                    │
               └───────────────────┬────────────────┘
                                   │
                                   v
                        ┌──────────────────────────┐
                        │  ProfileView             │
                        │  • Show welcome message  │
                        │  • Show username         │
                        │  • Show logout button    │
                        └──────────┬───────────────┘
                                   │
                                   │ User clicks Logout
                                   v
                        ┌──────────────────────────┐
                        │  handleLogout()          │
                        │  • Clear localStorage    │
                        │  • Reset state           │
                        │  • Redirect to home      │
                        └──────────┬───────────────┘
                                   │
                                   v
                        ┌──────────────────────────┐
                        │  Back to Not             │
                        │  Authenticated State     │
                        └──────────────────────────┘
```

### Data Flow Summary

```text
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│  Component  │────────>│ localStorage │────────>│  Component  │
│  (Write)    │  Store  │   (Persist)  │  Read   │   (Read)    │
│             │         │              │         │             │
│ LoginView   │         │ • isAuth     │         │ App.vue     │
│ ProfileView │         │ • username   │         │ ProfileView │
└─────────────┘         └──────────────┘         └─────────────┘
      │                                                 │
      │                                                 │
      └──────────────────── No Direct ──────────────────┘
                         Communication
```

**Important:** Components don't communicate directly. They use localStorage as a shared state store.

### Authozation and Route Guards

This guide explains how to implement **Role-Based Access Control (RBAC)** for Vue Router to protect routes based on user roles (User vs Admin).

### Requirements

- **User Role**: Can access Profile and Products pages
- **Admin Role**: Can access Profile, Products, and Admin Panel
- **Guest (Not Authenticated)**: Can only access Home, About, and Login pages

## Current System Analysis

### Current localStorage Structure

```javascript
localStorage: {
  isAuthenticated: "true" | "false",
  username: "john_doe",
  isAdmin: "true" | "false"  // Already implemented in LoginView
}
```

### User Roles

| Role | isAuthenticated | isAdmin | Access |
|------|----------------|---------|--------|
| **Guest** | false | - | Home, About, Login |
| **User** | true | false | Home, About, Login, **Profile**, **Products** |
| **Admin** | true | true | Home, About, Login, Profile, Products, **Admin Panel** |

## Implementation Plan

### Step 1: Add Route Metadata

Add `meta` fields to routes to specify access requirements.

```javascript
// router/index.js
const routes = [
  // Public routes - no authentication needed
  {
    path: "/",
    component: HomeView,
    meta: { requiresAuth: false }
  },
  {
    path: "/about",
    component: AboutView,
    meta: { requiresAuth: false }
  },
  {
    path: "/login",
    component: LoginView,
    meta: { requiresAuth: false }
  },

  // User routes - requires authentication
  {
    path: "/profile",
    component: ProfileView,
    meta: { requiresAuth: true, requiresAdmin: false }
  },
  {
    path: "/products",
    component: ProductView,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  // Admin routes - requires admin role
  {
    path: "/admin",
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
];
```

### Step 2: Create Navigation Guard

Add a `beforeEach` guard to check authentication and authorization before navigating.

```javascript
// router/index.js
router.beforeEach((to, from, next) => {
  // Get auth state from localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Check if route requires authentication
  const requiresAuth = to.meta.requiresAuth;
  const requiresAdmin = to.meta.requiresAdmin;

  // Route logic
  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    alert('Please login to access this page');
    next('/login');
  } else if (requiresAdmin && !isAdmin) {
    // Redirect if trying to access admin page without admin role
    alert('Access denied. Admin privileges required.');
    next('/');
  } else {
    // Allow navigation
    next();
  }
});
```

## Complete Flow Diagrams

### 1. Route Guard Decision Flow

```
                        User Navigates to Route
                                 |
                                 v
                    ┌────────────────────────┐
                    │ to.meta.requiresAuth?  │
                    └────────┬───────────────┘
                             |
                ┌────────────┴─────────────┐
                |                          |
               YES                        NO
                |                          |
                v                          v
    ┌──────────────────────┐    ┌─────────────────┐
    │ isAuthenticated?     │    │ Allow Access    │
    └──────┬───────────────┘    └─────────────────┘
           |
    ┌──────┴───────┐
    |              |
   YES            NO
    |              |
    v              v
┌───────────────┐  ┌─────────────────────────┐
│Check if needs │  │ Alert: "Please login"   │
│admin role     │  │ Redirect to /login      │
└───┬───────────┘  └─────────────────────────┘
    |
    v
┌─────────────────────┐
│to.meta.requiresAdmin│
└─────┬───────────────┘
      |
  ┌───┴────┐
  |        |
 YES      NO
  |        |
  v        v
┌────────┐ ┌──────────────┐
│isAdmin?│ │Allow Access  │
└───┬────┘ └──────────────┘
    |
┌───┴───┐
|       |
YES    NO
|       |
v       v
┌──────────┐ ┌────────────────────────┐
│Allow     │ │Alert: "Access denied"  │
│Access    │ │Redirect to /           │
└──────────┘ └────────────────────────┘
```

### 2. User Access Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Route Access Matrix                             │
├─────────────┬──────────┬───────────┬──────────────┬─────────────────────┤
│   Route     │  Guest   │   User    │    Admin     │   Redirect If Fail  │
├─────────────┼──────────┼───────────┼──────────────┼─────────────────────┤
│ /           │    ✅    │    ✅     │     ✅       │         -           │
│ /about      │    ✅    │    ✅     │     ✅       │         -           │
│ /login      │    ✅    │    ✅     │     ✅       │         -           │
│ /profile    │    ❌    │    ✅     │     ✅       │    → /login         │
│ /products   │    ❌    │    ✅     │     ✅       │    → /login         │
│ /admin      │    ❌    │    ❌     │     ✅       │ → /login or /       │
└─────────────┴──────────┴───────────┴──────────────┴─────────────────────┘
```

### 3. Complete Authentication & Authorization Flow

```
┌──────────┐
│  User    │
└────┬─────┘
     │
     │ 1. Navigate to /products
     v
┌─────────────────────────────────────────────────────────────┐
│              Router beforeEach Guard                        │
│                                                             │
│  Step 1: Read from localStorage                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ const isAuthenticated =                               │  │
│  │   localStorage.getItem('isAuthenticated') === 'true'  │  │
│  │ const isAdmin =                                       │  │
│  │   localStorage.getItem('isAdmin') === 'true'          │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  Step 2: Check route requirements                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ requiresAuth = to.meta.requiresAuth  // true          │  │
│  │ requiresAdmin = to.meta.requiresAdmin // false        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  Step 3: Evaluate conditions                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ if (requiresAuth && !isAuthenticated)                 │  │
│  │   → Deny + Redirect to /login                         │  │
│  │                                                       │  │
│  │ else if (requiresAdmin && !isAdmin)                   │  │
│  │   → Deny + Redirect to /                              │  │
│  │                                                       │  │
│  │ else                                                  │  │
│  │   → Allow navigation (next())                         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
     │
     v
┌─────────────────────────────────────────────────────────────┐
│                    Decision Result                          │
└─────────────────────────────────────────────────────────────┘
     │
     ┼─────────────────┬─────────────────────┬────────────────
     │                 │                     │
     v                 v                     v
┌──────────┐    ┌────────────┐      ┌──────────────┐
│ Allowed  │    │ Not Auth   │      │ Not Admin    │
│ Navigate │    │ Redirect   │      │ Redirect     │
│ to route │    │ to /login  │      │ to /         │
└──────────┘    └────────────┘      └──────────────┘
```

## Vuex State Management

### 🎓 Welcome to Vuex - Your Central Data Store

Think of Vuex as a **big treasure chest** 🗃️ that holds all your app's important data in one place. Instead of passing data between components like passing notes in class, all components can access this central chest whenever they need something!

### 📚 Why Do We Need Vuex?

#### The Problem Without Vuex

Imagine you have a shopping cart app:

```
                 App.vue (has cart data)
                    |
        ┌───────────┼───────────┐
        |           |           |
    Header       Products    Checkout
    (shows      (adds to     (displays
     count)      cart)         cart)
```

**Problems:**

1. 😫 Cart data lives in App.vue, but 3 components need it
2. 😫 Need to pass props down multiple levels
3. 😫 Need to emit events up multiple levels
4. 😫 Components can't easily "talk" to each other

#### The Solution With Vuex

```
         ┌─────────────────────────┐
         │   VUEX STORE (Center)   │
         │   cart: []              │
         │   user: {}              │
         │   products: []          │
         └────────┬────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
  Header      Products      Checkout
  (reads      (adds to      (reads
   count)      cart)         cart)
```

**Benefits:**

1. ✅ One central place for data
2. ✅ Any component can access data directly
3. ✅ No more "prop drilling" (passing props through many levels)
4. ✅ Data changes automatically update everywhere

---

## 🏗️ The Four Core Concepts of Vuex

Think of Vuex like a **bank system**:

```
┌─────────────────────────────────────────────────────────────────┐
│                         VUEX STORE                              │
│                      (The Bank Building)                        │
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌─────────────────┐    │
│  │   STATE      │    │   GETTERS    │    │    MUTATIONS    │    │
│  │  (Vault)     │    │ (Teller)     │    │  (Deposit Slip) │    │
│  │              │    │              │    │                 │    │
│  │ The actual   │    │ Read & calc  │    │ Change the      │    │
│  │ data storage │    │ data for you │    │ vault (sync)    │    │
│  └──────────────┘    └──────────────┘    └─────────────────┘    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    ACTIONS                               │   │
│  │                  (Bank Manager)                          │   │
│  │                                                          │   │
│  │  Handle complex operations, API calls (async)            │   │
│  │  Then commits mutations to change state                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 1️⃣ State - The Data Warehouse

**State** is where all your data lives. It's like variables but shared across your entire app.

```javascript
// store/index.js
const store = createStore({
  state() {
    return {
      // Think of these as global variables
      products: [],
      cart: [],
      user: {
        username: '',
        isAuthenticated: false
      },
      loading: false
    }
  }
})
```

**Real-Life Analogy:**
State is like your bank vault 🏦 - it stores all the money (data).

**Key Rules:**

- ❌ NEVER modify state directly: `store.state.cart = []` ❌
- ✅ ALWAYS use mutations: `store.commit('clearCart')` ✅

---

### 2️⃣ Getters - The Smart Calculators

**Getters** are like computed properties for your store. They read state and calculate something from it.

```javascript
const store = createStore({
  state() {
    return {
      cart: [
        { id: 1, name: 'Shirt', price: 20 },
        { id: 2, name: 'Pants', price: 40 }
      ]
    }
  },

  getters: {
    // Get cart total price
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price, 0)
      // Returns: 60
    },

    // Get number of items in cart
    cartItemCount(state) {
      return state.cart.length
      // Returns: 2
    },

    // Get expensive items (over $30)
    expensiveItems(state) {
      return state.cart.filter(item => item.price > 30)
      // Returns: [{ id: 2, name: 'Pants', price: 40 }]
    },

    // Getter that returns a function (with parameters)
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id)
    }
  }
})
```

**Real-Life Analogy:**
Getters are like a **bank teller** 💁 - they look at your account and tell you your balance, calculate interest, etc. They don't change your money, just read and calculate.

**When to Use Getters:**

- ✅ Calculate totals, counts, averages
- ✅ Filter data (show only active users)
- ✅ Format data (convert prices to currency)
- ✅ Derive new data from existing state

---

### 3️⃣ Mutations - The Only Way to Change State

**Mutations** are the ONLY way to modify state. They must be **synchronous** (instant, no waiting).

```javascript
const store = createStore({
  state() {
    return {
      cart: [],
      products: []
    }
  },

  mutations: {
    // Add item to cart
    ADD_TO_CART(state, product) {
      //    ↑       ↑        ↑
      //  name    state    payload
      state.cart.push(product)
    },

    // Remove item from cart
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },

    // Clear entire cart
    CLEAR_CART(state) {
      state.cart = []
    },

    // Set products (replace entire array)
    SET_PRODUCTS(state, products) {
      state.products = products
    },

    // Update single product
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        state.products[index] = updatedProduct
      }
    }
  }
})
```

**Real-Life Analogy:**
Mutations are like **deposit/withdrawal slips** 📝 at a bank - they're the official forms to change your balance. Every change must use a form (mutation).

**Naming Convention:**

- Use UPPERCASE_SNAKE_CASE: `ADD_PRODUCT`, `SET_USER`, `CLEAR_CART`
- This helps identify mutations at a glance

**How to Call Mutations:**

```javascript
// In a component
methods: {
  addProduct() {
    // Commit a mutation
    this.$store.commit('ADD_TO_CART', product)
    //              ↑                    ↑
    //          mutation name        payload (data)
  }
}
```

**⚠️ Important Rules:**

- ✅ Must be synchronous (no `await`, no `setTimeout`)
- ✅ Only mutations can change state
- ✅ Keep them simple - just change state, no complex logic

---

### 4️⃣ Actions - The Smart Workers

**Actions** handle complex operations and API calls. They can be **asynchronous** (can wait for things).

```javascript
const store = createStore({
  state() {
    return {
      products: [],
      loading: false,
      error: null
    }
  },

  mutations: {
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },

  actions: {
    // Fetch products from API
    async fetchProducts({ commit }) {
      //                    ↑
      //                 context object (has commit, state, etc.)

      try {
        // 1. Show loading
        commit('SET_LOADING', true)

        // 2. Make API call (ASYNC - can use await!)
        const response = await axios.get('https://fakestoreapi.com/products')

        // 3. Save data using mutation
        commit('SET_PRODUCTS', response.data)

        // 4. Hide loading
        commit('SET_LOADING', false)

      } catch (error) {
        // Handle errors
        commit('SET_ERROR', error.message)
        commit('SET_LOADING', false)
      }
    },

    // Add product (with API call)
    async addProduct({ commit }, productData) {
      //                          ↑
      //                      payload

      const response = await axios.post('/api/products', productData)
      commit('ADD_PRODUCT', response.data)
    },

    // Action can call other actions
    async loadAllData({ dispatch }) {
      //                   ↑
      //               use dispatch for actions
      await dispatch('fetchProducts')
      await dispatch('fetchCategories')
      await dispatch('fetchUser')
    }
  }
})
```

**Real-Life Analogy:**
Actions are like **bank managers** 👔 - they handle complex tasks (loan applications, transferring money between accounts), work with other departments (API calls), and then update records using official forms (commit mutations).

**How to Call Actions:**

```javascript
// In a component
methods: {
  async loadProducts() {
    // Dispatch an action
    await this.$store.dispatch('fetchProducts')
    //                   ↑
    //              action name
  },

  async addNewProduct() {
    await this.$store.dispatch('addProduct', this.productData)
    //                                        ↑
    //                                     payload
  }
}
```

**Actions vs Mutations:**

| Feature | Mutations | Actions |
|---------|-----------|---------|
| **Can be async?** | ❌ No (must be instant) | ✅ Yes (can use `await`) |
| **API calls?** | ❌ No | ✅ Yes |
| **Change state?** | ✅ Yes (directly) | ❌ No (must commit mutations) |
| **Complex logic?** | ❌ No (keep simple) | ✅ Yes |
| **Call with** | `commit()` | `dispatch()` |

---

## 🎯 Complete Vuex Flow Diagram

Here's how everything works together:

```
┌──────────────────────────────────────────────────────────────────────┐
│                          COMPONENT                                   │
│                      (Vue Component File)                            │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  <template>                                                    │  │
│  │    <div>                                                       │  │
│  │      <h2>Cart Total: {{ cartTotal }}</h2>  ←─── 1. READ       │  │
│  │      <button @click="fetchProducts">Load</button>              │  │
│  │    </div>                                                      │  │
│  │  </template>                                                   │  │
│  │                                                                │  │
│  │  <script>                                                      │  │
│  │  export default {                                              │  │
│  │    computed: {                                                 │  │
│  │      cartTotal() {                                             │  │
│  │        return this.$store.getters.cartTotal ←─── 1. READ      │  │
│  │      }                                                         │  │
│  │    },                                                          │  │
│  │    methods: {                                                  │  │
│  │      async fetchProducts() {                                   │  │
│  │        await this.$store.dispatch('fetchProducts') ←── 2. CALL│  │
│  │      }                                                         │  │
│  │    }                                                           │  │
│  │  }                                                             │  │
│  │  </script>                                                     │  │
│  └────────────────────────────────────────────────────────────────┘  │
└────────────────────────┬──────────────────┬──────────────────────────┘
                         │                  │
                1. Read State/Getters   2. Dispatch Action
                         │                  │
                         ↓                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                          VUEX STORE                                 │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  STATE (The Data)                                            │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │  {                                                      │  │   │
│  │  │    products: [...],                                    │  │   │
│  │  │    cart: [...],                                        │  │   │
│  │  │    user: {...}                                         │  │   │
│  │  │  }                                                      │  │   │
│  │  └────────────────────────────────────────────────────────┘  │   │
│  └──────────────────────┬───────────────────────────────────────┘   │
│                         │                                           │
│                         │ 1. Components read from here              │
│                         │                                           │
│  ┌──────────────────────┴───────────────────────────────────────┐   │
│  │  GETTERS (Computed State)                                    │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │  cartTotal(state) {                                    │  │   │
│  │  │    return state.cart.reduce(...)                       │  │   │
│  │  │  }                                                      │  │   │
│  │  └────────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  ACTIONS (Async Operations)                    2. Called     │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │  async fetchProducts({ commit }) {                     │  │   │
│  │  │    const data = await api.getProducts() ───┐           │  │   │
│  │  │                                             │ API call  │  │   │
│  │  │    commit('SET_PRODUCTS', data) ─┐          │           │  │   │
│  │  │  }                                └────┐    │           │  │   │
│  │  └───────────────────────────────────────┼────┼─────────┘  │   │
│  └────────────────────────────────────────────┼────┼──────────┘   │
│                                               │    │              │
│                                      3. Commits│    │              │
│                                           Mutation  │              │
│                                               ↓    ↓              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  MUTATIONS (Synchronous State Changes)                       │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │  SET_PRODUCTS(state, products) {                       │  │   │
│  │  │    state.products = products ──┐                       │  │   │
│  │  │  }                              │ 4. Updates state     │  │   │
│  │  └─────────────────────────────────┼──────────────────────┘  │   │
│  └──────────────────────────────────────┼─────────────────────────│   │
│                                         │                         │
│                                         ↓                         │
│                            State is now updated!                  │
│                                         │                         │
└─────────────────────────────────────────┼─────────────────────────┘
                                          │
                            5. Vue reactivity notifies
                                          │
                                          ↓
                        ┌─────────────────────────────────┐
                        │    COMPONENT AUTO-UPDATES       │
                        │    (UI refreshes automatically) │
                        └─────────────────────────────────┘
```

**The Complete Flow:**

1. **Component** dispatches an action: `dispatch('fetchProducts')`
2. **Action** calls API (async) and gets data
3. **Action** commits a mutation: `commit('SET_PRODUCTS', data)`
4. **Mutation** updates the state
5. **State change** triggers Vue's reactivity
6. **Component** automatically re-renders with new data!

---

## 🛠️ Setting Up Vuex in Your Project

### Step 1: Install Vuex

```bash
npm install vuex@next --save
```

The `@next` tag installs Vuex 4, which works with Vue 3.

### Step 2: Create Store File

Create `src/store/index.js`:

```javascript
// src/store/index.js
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      // Your data goes here
      products: [],
      cart: [],
      user: {
        username: '',
        isAuthenticated: false,
        isAdmin: false
      }
    }
  },

  getters: {
    // Your computed properties go here
  },

  mutations: {
    // Your state changes go here
  },

  actions: {
    // Your async operations go here
  }
})

export default store
```

### Step 3: Connect Store to App

Update `src/main.js`:

```javascript
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'  // ← Import store

const app = createApp(App)

app.use(router)
app.use(store)  // ← Add this line

app.mount('#app')
```

### Step 4: Use Store in Components

Now you can access the store in any component:

```vue
<template>
  <div>
    <!-- Read from state -->
    <h1>Welcome, {{ username }}</h1>
    <p>Cart Items: {{ cartItemCount }}</p>

    <button @click="loadProducts">Load Products</button>
  </div>
</template>

<script>
export default {
  computed: {
    // Access state directly
    username() {
      return this.$store.state.user.username
    },

    // Access getters
    cartItemCount() {
      return this.$store.getters.cartItemCount
    }
  },

  methods: {
    // Dispatch actions
    async loadProducts() {
      await this.$store.dispatch('fetchProducts')
    },

    // Commit mutations (rarely done directly)
    clearCart() {
      this.$store.commit('CLEAR_CART')
    }
  }
}
</script>
```

---

## 📝 Real Example: Product Management with Vuex

Let's build a complete product management system using Vuex!

### Complete Store Implementation

```javascript
// src/store/index.js
import { createStore } from 'vuex'
import axios from 'axios'

const API_BASE = 'https://fakestoreapi.com'

const store = createStore({
  //─────────────────────────────────────────────────────
  // STATE - The single source of truth
  //─────────────────────────────────────────────────────
  state() {
    return {
      products: [],
      loading: false,
      error: null,
      user: {
        username: localStorage.getItem('username') || '',
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
        isAdmin: localStorage.getItem('isAdmin') === 'true'
      }
    }
  },

  //─────────────────────────────────────────────────────
  // GETTERS - Computed state
  //─────────────────────────────────────────────────────
  getters: {
    // Get all products
    allProducts(state) {
      return state.products
    },

    // Get number of products
    productCount(state) {
      return state.products.length
    },

    // Get products by category
    productsByCategory: (state) => (category) => {
      return state.products.filter(p => p.category === category)
    },

    // Get expensive products (over $50)
    expensiveProducts(state) {
      return state.products.filter(p => p.price > 50)
    },

    // Check if loading
    isLoading(state) {
      return state.loading
    },

    // Check if authenticated
    isAuthenticated(state) {
      return state.user.isAuthenticated
    },

    // Get username
    username(state) {
      return state.user.username
    }
  },

  //─────────────────────────────────────────────────────
  // MUTATIONS - Synchronous state changes
  //─────────────────────────────────────────────────────
  mutations: {
    // Set all products
    SET_PRODUCTS(state, products) {
      state.products = products
    },

    // Add a new product
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },

    // Update a product
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        // Replace old product with updated one
        state.products.splice(index, 1, updatedProduct)
      }
    },

    // Delete a product
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter(p => p.id !== productId)
    },

    // Set loading status
    SET_LOADING(state, status) {
      state.loading = status
    },

    // Set error
    SET_ERROR(state, error) {
      state.error = error
    },

    // Clear error
    CLEAR_ERROR(state) {
      state.error = null
    },

    // Set user (login)
    SET_USER(state, userData) {
      state.user.username = userData.username
      state.user.isAuthenticated = true
      state.user.isAdmin = userData.isAdmin || false

      // Also save to localStorage
      localStorage.setItem('username', userData.username)
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('isAdmin', userData.isAdmin || 'false')
    },

    // Clear user (logout)
    CLEAR_USER(state) {
      state.user.username = ''
      state.user.isAuthenticated = false
      state.user.isAdmin = false

      // Remove from localStorage
      localStorage.removeItem('username')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('isAdmin')
    }
  },

  //─────────────────────────────────────────────────────
  // ACTIONS - Asynchronous operations
  //─────────────────────────────────────────────────────
  actions: {
    // Fetch all products from API
    async fetchProducts({ commit }) {
      try {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')

        const response = await axios.get(`${API_BASE}/products`)
        commit('SET_PRODUCTS', response.data)

      } catch (error) {
        commit('SET_ERROR', error.message)
        console.error('Error fetching products:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Create a new product
    async createProduct({ commit }, productData) {
      try {
        commit('SET_LOADING', true)

        const response = await axios.post(`${API_BASE}/products`, productData)
        commit('ADD_PRODUCT', response.data)

        return response.data // Return for component to use

      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error // Re-throw so component can handle
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Update a product
    async updateProduct({ commit }, { id, productData }) {
      try {
        commit('SET_LOADING', true)

        const response = await axios.put(`${API_BASE}/products/${id}`, productData)
        commit('UPDATE_PRODUCT', response.data)

        return response.data

      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Delete a product
    async deleteProduct({ commit }, productId) {
      try {
        commit('SET_LOADING', true)

        await axios.delete(`${API_BASE}/products/${productId}`)
        commit('DELETE_PRODUCT', productId)

      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Login user
    async loginUser({ commit }, credentials) {
      try {
        commit('SET_LOADING', true)

        // Replace with your actual auth endpoint
        const response = await axios.post(`${API_BASE}/auth/login`, credentials)

        commit('SET_USER', {
          username: credentials.username,
          isAdmin: credentials.username === 'admin' // Example logic
        })

        return response.data

      } catch (error) {
        commit('SET_ERROR', 'Login failed')
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Logout user
    logoutUser({ commit }) {
      commit('CLEAR_USER')
    }
  }
})

export default store
```

### Using the Store in ProductView.vue

```vue
<template>
  <div class="product-view">
    <h1>Product Management</h1>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="loading">
      Loading products...
    </div>

    <!-- Error message -->
    <div v-if="error" class="error">
      Error: {{ error }}
    </div>

    <!-- Product count -->
    <p>Total Products: {{ productCount }}</p>

    <!-- Add Product Button -->
    <button @click="showAddModal = true">Add Product</button>

    <!-- Products Table -->
    <table v-if="!isLoading">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in allProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.category }}</td>
          <td>
            <button @click="handleDelete(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Product Modal -->
    <AddProductModal
      v-if="showAddModal"
      @close="showAddModal = false"
      @add="handleAddProduct"
    />
  </div>
</template>

<script>
import AddProductModal from '@/components/AddProductModal.vue'

export default {
  name: 'ProductView',
  components: {
    AddProductModal
  },

  data() {
    return {
      showAddModal: false
    }
  },

  //─────────────────────────────────────────────────────
  // COMPUTED - Connect to Vuex getters and state
  //─────────────────────────────────────────────────────
  computed: {
    // Access getters
    allProducts() {
      return this.$store.getters.allProducts
    },

    productCount() {
      return this.$store.getters.productCount
    },

    isLoading() {
      return this.$store.getters.isLoading
    },

    // Access state directly
    error() {
      return this.$store.state.error
    }
  },

  //─────────────────────────────────────────────────────
  // METHODS - Dispatch actions to Vuex
  //─────────────────────────────────────────────────────
  methods: {
    async handleAddProduct(productData) {
      try {
        // Dispatch action to add product
        await this.$store.dispatch('createProduct', productData)

        alert('Product added successfully!')
        this.showAddModal = false

      } catch (error) {
        alert('Failed to add product: ' + error.message)
      }
    },

    async handleDelete(productId) {
      if (!confirm('Delete this product?')) return

      try {
        // Dispatch action to delete product
        await this.$store.dispatch('deleteProduct', productId)

        alert('Product deleted successfully!')

      } catch (error) {
        alert('Failed to delete product: ' + error.message)
      }
    }
  },

  //─────────────────────────────────────────────────────
  // LIFECYCLE - Load data when component mounts
  //─────────────────────────────────────────────────────
  mounted() {
    // Dispatch action to fetch products
    this.$store.dispatch('fetchProducts')
  }
}
</script>
```

---

## 🔄 Vuex vs Component State - When to Use Each?

### Use Component State (data()) When

```vue
<script>
export default {
  data() {
    return {
      // ✅ Good for component state
      showModal: false,        // UI toggle
      searchQuery: '',         // Temporary input
      currentPage: 1,          // Pagination
      isHovered: false         // UI interaction
    }
  }
}
</script>
```

**Use for:**

- ✅ UI state (modals, toggles, hover states)
- ✅ Form inputs
- ✅ Temporary data
- ✅ Data only one component needs

### Use Vuex State When

```javascript
// store/index.js
state() {
  return {
    // ✅ Good for global state
    products: [],         // Shared data
    user: {},            // Auth state
    cart: [],            // Shopping cart
    theme: 'dark'        // App-wide settings
  }
}
```

**Use for:**

- ✅ Data shared by multiple components
- ✅ Authentication state
- ✅ API data
- ✅ Shopping carts, wishlists
- ✅ App-wide settings

---

## 🎓 Quick Reference Cheat Sheet

### Accessing Vuex in Components

```javascript
// ┌─────────────────────────────────────────────────────┐
// │  READ STATE & GETTERS (in computed properties)      │
// └─────────────────────────────────────────────────────┘
computed: {
  // Direct state access
  products() {
    return this.$store.state.products
  },

  // Using getters
  productCount() {
    return this.$store.getters.productCount
  }
}

// ┌─────────────────────────────────────────────────────┐
// │  CALL MUTATIONS (synchronous changes)               │
// └─────────────────────────────────────────────────────┘
methods: {
  clearCart() {
    this.$store.commit('CLEAR_CART')
  },

  addItem(item) {
    this.$store.commit('ADD_ITEM', item)
    //                      ↑        ↑
    //                   mutation  payload
  }
}

// ┌─────────────────────────────────────────────────────┐
// │  CALL ACTIONS (asynchronous operations)             │
// └─────────────────────────────────────────────────────┘
methods: {
  async loadData() {
    await this.$store.dispatch('fetchProducts')
  },

  async addProduct(data) {
    await this.$store.dispatch('createProduct', data)
    //                             ↑             ↑
    //                          action        payload
  }
}
```

### Store Structure Template

```javascript
import { createStore } from 'vuex'

export default createStore({
  // 📦 STATE - Your data
  state() {
    return {
      // Add your data here
    }
  },

  // 🔍 GETTERS - Computed values
  getters: {
    // Add computed properties here
  },

  // ✏️ MUTATIONS - Sync changes (commit)
  mutations: {
    // Add state changes here
    // USE UPPERCASE_NAMES
  },

  // ⚡ ACTIONS - Async operations (dispatch)
  actions: {
    // Add API calls and complex logic here
  }
})
```

---

## 🚀 Migration Guide: localStorage → Vuex

Let's convert your existing authentication system from localStorage to Vuex!

### Before (localStorage in components)

```vue
<!-- LoginView.vue - OLD WAY -->
<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    async handleLogin() {
      const response = await loginUser(this.username, this.password)

      if (response.status === 201) {
        // ❌ Setting localStorage directly in component
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('username', this.username)

        this.$router.push('/profile')
      }
    }
  }
}
</script>
```

### After (Vuex centralized state)

```javascript
// store/index.js - NEW WAY
import { createStore } from 'vuex'
import { loginUser } from '@/api/authApi'

export default createStore({
  state() {
    return {
      user: {
        username: localStorage.getItem('username') || '',
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true'
      }
    }
  },

  getters: {
    isAuthenticated(state) {
      return state.user.isAuthenticated
    },
    username(state) {
      return state.user.username
    }
  },

  mutations: {
    SET_USER(state, username) {
      state.user.username = username
      state.user.isAuthenticated = true
      localStorage.setItem('username', username)
      localStorage.setItem('isAuthenticated', 'true')
    },

    CLEAR_USER(state) {
      state.user.username = ''
      state.user.isAuthenticated = false
      localStorage.removeItem('username')
      localStorage.removeItem('isAuthenticated')
    }
  },

  actions: {
    async login({ commit }, { username, password }) {
      const response = await loginUser(username, password)

      if (response.status === 201) {
        commit('SET_USER', username)
        return true
      }
      return false
    },

    logout({ commit }) {
      commit('CLEAR_USER')
    }
  }
})
```

```vue
<!-- LoginView.vue - NEW WAY -->
<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {
    async handleLogin() {
      try {
        // ✅ Use Vuex action
        const success = await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })

        if (success) {
          this.$router.push('/profile')
        } else {
          alert('Login failed')
        }
      } catch (error) {
        alert('Login error: ' + error.message)
      }
    }
  }
}
</script>
```

```vue
<!-- App.vue - NEW WAY -->
<script>
export default {
  computed: {
    // ✅ Use Vuex getter instead of reading localStorage
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>

    <!-- Show if authenticated -->
    <RouterLink v-if="isAuthenticated" to="/products">
      Products
    </RouterLink>
    <RouterLink v-if="isAuthenticated" to="/profile">
      Profile
    </RouterLink>
  </nav>
</template>
```

---

## 📊 Comparison: Before vs After Vuex

| Aspect | Without Vuex | With Vuex |
|--------|-------------|-----------|
| **Data Location** | Scattered across components | Centralized in store |
| **Complexity** | Props & events everywhere | Clean access pattern |
| **API Calls** | Repeated in many components | Once in actions |
| **Debugging** | Hard to track data changes | Vue DevTools shows all changes |
| **Testing** | Need to mock many things | Test store independently |
| **Code Reuse** | Copy-paste logic | Reuse actions/getters |

---

## 🎯 Practice Exercises

### Exercise 1: Basic Setup

1. Install Vuex in your project
2. Create a store with a products array
3. Add a getter to count products
4. Display the count in a component

### Exercise 2: Add CRUD Actions

1. Create actions for: fetchProducts, createProduct, updateProduct, deleteProduct
2. Add corresponding mutations
3. Use these actions in your ProductView component

### Exercise 3: User Authentication

1. Move your localStorage auth logic to Vuex
2. Create login and logout actions
3. Update all components to use Vuex instead of localStorage directly

### Exercise 4: Loading States

1. Add loading state to store
2. Show loading indicator during API calls
3. Handle and display errors from API

---

## 🎓 Summary

**Remember the Vuex Flow:**

1. **Component** needs data → access `$store.state` or `$store.getters`
2. **Component** needs to change data → `dispatch` an **action**
3. **Action** does async work (API call) → `commit` a **mutation**
4. **Mutation** changes the **state**
5. **State** changes → Vue automatically updates **components**!

**Key Rules:**

- ✅ State = single source of truth
- ✅ Getters = computed properties for state
- ✅ Mutations = ONLY way to change state (synchronous)
- ✅ Actions = async operations (use mutations to change state)
- ✅ Never modify state directly!

Now you're ready to build scalable Vue applications with Vuex! 🎉
