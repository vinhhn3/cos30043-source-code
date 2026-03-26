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
| `src/main.js` | File | Application entry point - initializes Vue app, router, and mounts to DOM |
| `src/App.vue` | File | Root Vue component - main application layout wrapper |
| `src/style.css` | File | Global CSS styles for the application |
| **src/api/** | Folder | API service layer for backend communication |
| `src/api/productApi.js` | File | Product API functions using Axios (getAllProducts, createProduct, deleteProduct, etc.) |
| **src/assets/** | Folder | Static assets (images, icons) used in components |
| **src/components/** | Folder | Reusable Vue components |
| `src/components/AddProductModal.vue` | File | Modal component for adding new products with form inputs (title, price, category, description, image) |
| **src/router/** | Folder | Vue Router configuration for navigation |
| `src/router/index.js` | File | Router setup with routes: Home (/), About (/about), Products (/products) |
| **src/views/** | Folder | Page-level Vue components (route views) |
| `src/views/HomeView.vue` | File | Home page component |
| `src/views/AboutView.vue` | File | About page component |
| `src/views/ProductView.vue` | File | Products page with CRUD operations, table display, pagination, and product management |

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue.js | 3.5.30 | Progressive JavaScript framework for building user interfaces |
| Vue Router | 4.6.4 | Official routing library for Vue.js single-page applications |
| Axios | 1.13.6 | Promise-based HTTP client for API requests |
| Vuejs-paginate-next | 1.0.2 | Pagination component for Vue 3 |
| Vite | 8.0.0 | Fast build tool and development server |

## C4 Container Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                    User                                      │
│                              [Person]                                        │
│                                                                              │
│              A user managing products through the web interface              │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │
                                │ Uses
                                │ [HTTPS]
                                v
┌───────────────────────────────────────────────────────────────────────────────┐
│                     Vue.js Single Page Application                            │
│                          [Container: Web App]                                 │
│                   Technology: Vue 3, Vue Router, Vite                         │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │  main.js + App.vue                                                      │  │
│  │  [Application Bootstrap]                                                │  │
│  │  - Initializes Vue app                                                  │  │
│  │  - Mounts router                                                        │  │
│  └────────────────┬────────────────────────────────────────────────────────┘  │
│                   │                                                           │
│                   │                                                           │
│  ┌────────────────v─────────────────┐     ┌──────────────────────────────┐    │
│  │      router/ (index.js)          │     │     assets/                  │    │
│  │   [Routing Layer]                │     │  [Static Resources]          │    │
│  │   - Route definitions            │     │  - Images (hero.png)         │    │
│  │   - Navigation logic             │     │  - Icons (vite.svg, vue.svg) │    │
│  └────┬─────┬──────────┬────────────┘     └──────────────────────────────┘    │
│       │     │          │                                                      │
│       │     │          │                                                      │
│  ┌────v─────v──────────v────────────────────────────────────────────────────┐ │
│  │                     views/                                               │ │
│  │                  [Page Views]                                            │ │
│  │  ┌──────────────┐  ┌───────────────┐  ┌───────────────────────────┐      │ │
│  │  │ HomeView.vue │  │AboutView.vue  │  │   ProductView.vue         │      │ │
│  │  │   [/]        │  │  [/about]     │  │     [/products]           │      │ │
│  │  └──────────────┘  └───────────────┘  └────────┬──────────────────┘      │ │
│  │                                                │                         │ │
│  │                                                │ Uses                    │ │
│  └────────────────────────────────────────────────┼─────────────────────────┘ │
│                                                   │                           │
│  ┌────────────────────────────────────────────────v─────────────────────────┐ │
│  │                      components/                                         │ │
│  │                 [Reusable Components]                                    │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐    │ │
│  │  │            AddProductModal.vue                                   │    │ │
│  │  │  - Product form (title, price, category, description, image)     │    │ │
│  │  │  - Form validation                                               │    │ │
│  │  │  - Emit events to parent                                         │    │ │
│  │  └──────────────────────────────────────────────────────────────────┘    │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │                          api/ (productApi.js)                            │ │
│  │                         [API Service Layer]                              │ │
│  │                        Technology: Axios                                 │ │
│  │  - getAllProducts()         - createProduct()                            │ │
│  │  - getProductById()         - updateProduct()                            │ │
│  │  - getProductsByCategory()  - patchProduct()                             │ │
│  │  - deleteProduct()                                                       │ │
│  └────────────────────────────────┬─────────────────────────────────────────┘ │
└───────────────────────────────────┴───────────────────────────────────────────┘
                                    │
                                    │ Makes API calls to
                                    │ [HTTPS/JSON]
                                    v
┌───────────────────────────────────────────────────────────────────────────────┐
│                      Fake Store API                                           │
│                   [External System]                                           │
│              https://fakestoreapi.com                                         │
│                                                                               │
│  Provides RESTful API for product data (GET, POST, PUT, PATCH, DELETE)        │
└───────────────────────────────────────────────────────────────────────────────┘

Legend:
────────   Relationship/Data Flow
┌──────┐   Container/Component Boundary
```

### Architecture Overview

**Application Flow:**

1. **User** interacts with the **Vue.js SPA** through a web browser
2. **main.js + App.vue** initializes the application and Vue Router
3. **Router** directs users to different **Views** (Home, About, Products)
4. **ProductView** uses **AddProductModal** component for creating products
5. **Views** call **API Service Layer** (productApi.js) for data operations
6. **API Service** makes HTTP requests to **Fake Store API** using Axios
7. **Fake Store API** returns JSON data back through the chain

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
