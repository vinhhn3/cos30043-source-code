---
marp: true
theme: default
paginate: true
style: |
  section {
    font-size: 24px;
  }
---

<!-- _paginate: false -->

# Week 8

## Application Programming Interface (API) 1

**COS30043 - Interface Design and Development**

---

# Introduction

Welcome to Week 8!

This week, we'll explore:

- RESTful APIs and web services
- HTTP request methods (GET, POST, PUT, DELETE)
- Fetching data with jQuery's `$.getJSON()`
- Modern `fetch()` API
- Promises and asynchronous JavaScript
- Error handling with `.catch()`

---

# Learning Outcomes

By the end of this week, you will be able to:

1. Understand RESTful API principles
2. Use HTTP methods for CRUD operations
3. Fetch data using jQuery's `$.getJSON()`
4. Use the modern `fetch()` API
5. Work with JavaScript Promises
6. Handle errors in asynchronous operations

---

# What is an API?

**API** - Application Programming Interface

**Definition:**
A set of rules and protocols that allows different software applications to communicate with each other.

**Web APIs:**
Enable communication between client (browser) and server over HTTP.

---

# What is a RESTful API?

**REST** - Representational State Transfer

**RESTful APIs** are interfaces that use HTTP requests to:

- **Read** data (GET)
- **Create** data (POST)
- **Update** data (PUT)
- **Delete** data (DELETE)

These operations are called **CRUD** operations.

---

# RESTful API Principles

1. **Stateless** - Each request is independent
2. **Client-Server** - Separation of concerns
3. **Uniform Interface** - Consistent URL structure
4. **Resource-Based** - Everything is a resource with a URL

**Example URLs:**

- `/users` - All users
- `/users/123` - Specific user
- `/posts/5/comments` - Comments for post 5

---

# HTTP Request Methods

**The four main HTTP methods:**

| Method | Purpose | CRUD | Example |
|--------|---------|------|---------|
| **GET** | Read/Retrieve | Read | Get user list |
| **POST** | Create | Create | Add new user |
| **PUT** | Update | Update | Edit user data |
| **DELETE** | Remove | Delete | Remove user |

---

# HTTP GET Request

**Purpose:** Retrieve data from server

**Characteristics:**

- Read-only operation
- No body content
- Parameters in URL (query string)
- Safe and idempotent

**Example URL:**

```
GET /api/users
GET /api/users/123
GET /api/posts?limit=10
```

---

# HTTP POST Request

**Purpose:** Send data to create a new resource

**Characteristics:**

- Creates new resources
- Data in request body
- Not idempotent
- Returns created resource

**Example:**

```
POST /api/users
Body: { "name": "Alice", "email": "alice@example.com" }
```

---

# HTTP PUT Request

**Purpose:** Update an existing resource

**Characteristics:**

- Updates entire resource
- Data in request body
- Usually requires resource ID
- Idempotent

**Example:**

```
PUT /api/users/123
Body: { "name": "Alice Updated", "email": "alice@new.com" }
```

---

# HTTP DELETE Request

**Purpose:** Remove a resource

**Characteristics:**

- Deletes specified resource
- Usually requires resource ID
- Minimal or no body
- Idempotent

**Example:**

```
DELETE /api/users/123
```

---

# API Response Format: JSON

**JSON** - JavaScript Object Notation

**Most common API response format:**

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "age": 25
}
```

**Array of objects:**

```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```

---

# Fetching Data: Two Approaches

**Week 8 covers two methods:**

1. **jQuery's `$.getJSON()`**
   - Older, jQuery-based
   - Simple syntax
   - Requires jQuery library

2. **Modern `fetch()`**
   - Built-in JavaScript
   - Promise-based
   - More powerful and flexible

---

# jQuery $.getJSON() Method

**Purpose:** Simplified AJAX call for JSON data

**Syntax:**

```javascript
$.getJSON(url, callback)
```

**Characteristics:**

- GET requests only
- Automatically parses JSON
- Uses callbacks
- Requires jQuery library

---

# $.getJSON() Basic Example

```javascript
$.getJSON('https://api.example.com/users', function(data) {
  console.log(data)
  // data is already parsed as JavaScript object
})
```

**Parameters:**

- `url` - API endpoint
- `callback` - Function to handle response

---

# $.getJSON() in Vue Component

```vue
<script>
export default {
  data() {
    return {
      users: [],
      loading: false
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      this.loading = true
      $.getJSON('https://api.example.com/users', (data) => {
        this.users = data
        this.loading = false
      })
    }
  }
}
</script>
```

---

# $.getJSON() with Query Parameters

```javascript
$.getJSON('https://api.example.com/posts', {
  limit: 10,
  page: 1,
  category: 'tech'
}, function(data) {
  console.log(data)
})
```

**Generates URL:**

```
https://api.example.com/posts?limit=10&page=1&category=tech
```

---

# $.getJSON() Error Handling

```javascript
$.getJSON('https://api.example.com/users')
  .done(function(data) {
    console.log('Success:', data)
  })
  .fail(function(jqXHR, textStatus, error) {
    console.error('Error:', error)
  })
  .always(function() {
    console.log('Request completed')
  })
```

---

# Modern fetch() API

**Purpose:** Modern way to make HTTP requests

**Characteristics:**

- Built-in to JavaScript (no library needed)
- Promise-based
- More powerful than $.getJSON()
- Supports all HTTP methods

**Basic Syntax:**

```javascript
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
```

---

# What are Promises?

**Promise** - An object representing eventual completion or failure of an asynchronous operation.

**Three states:**

1. **Pending** - Initial state
2. **Fulfilled** - Operation completed successfully
3. **Rejected** - Operation failed

**Why use Promises?**

- Avoid callback hell
- Better error handling
- Cleaner asynchronous code

---

# Promise Flow Diagram

```
┌──────────────────────────┐
│   fetch() called         │
│   Returns Promise        │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│   Promise: PENDING       │
└────────┬─────────────────┘
         │
    ┌────┴─────┐
    │          │
    ▼          ▼
FULFILLED   REJECTED
    │          │
    ▼          ▼
 .then()    .catch()
```

---

# fetch() Basic GET Request

```javascript
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
```

**Two steps:**

1. `response.json()` - Parse JSON from response
2. `data` - Use the parsed data

---

# fetch() in Vue Component: Template

```vue
<template>
  <div>
    <h1>Users</h1>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>
```

---

# fetch() in Vue Component: Script

```vue
<script>
export default {
  data() {
    return {
      users: [],
      loading: false
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      this.loading = true
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          this.users = data
          this.loading = false
        })
    }
  }
}
</script>
```

---

# Understanding .then()

**`.then()`** handles the fulfilled Promise

**Syntax:**

```javascript
fetch(url)
  .then(callback)
```

**Chaining:**

```javascript
fetch(url)
  .then(response => response.json())  // Returns another Promise
  .then(data => console.log(data))     // Handles the data
```

Each `.then()` can return a value that becomes input to the next `.then()`

---

# fetch() Error Handling with .catch()

**`.catch()`** handles rejected Promises and errors

```javascript
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error('Error:', error)
  })
```

**Catches:**

- Network errors
- Parsing errors
- Any error in the chain

---

# Complete Error Handling

```javascript
fetch('https://api.example.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
    console.log('Success:', data)
  })
  .catch(error => {
    console.error('Error:', error.message)
  })
```

**Note:** `fetch()` only rejects on network failure, not HTTP errors!

---

# fetch() with Error Handling in Vue

```vue
<script>
export default {
  data() {
    return {
      users: [],
      loading: false,
      error: null
    }
  },
  methods: {
    fetchUsers() {
      this.loading = true
      this.error = null

      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          if (!response.ok) throw new Error('Network error')
          return response.json()
        })
        .then(data => {
          this.users = data
        })
        .catch(error => {
          this.error = error.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
```

---

# fetch() POST Request

```javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Alice',
    email: 'alice@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log('Created:', data))
  .catch(error => console.error('Error:', error))
```

---

# fetch() POST in Vue Component

```vue
<script>
export default {
  data() {
    return {
      newUser: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    createUser() {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newUser)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Created user:', data)
          this.newUser = { name: '', email: '' }
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }
  }
}
</script>
```

---

# fetch() PUT Request

```javascript
fetch('https://api.example.com/users/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Alice Updated',
    email: 'alice.new@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log('Updated:', data))
```

---

# fetch() DELETE Request

```javascript
fetch('https://api.example.com/users/123', {
  method: 'DELETE'
})
  .then(response => {
    if (response.ok) {
      console.log('User deleted')
    }
  })
  .catch(error => {
    console.error('Error:', error)
  })
```

---

# Comparison: $.getJSON() vs fetch()

| Aspect | $.getJSON() | fetch() |
|--------|-------------|---------|
| **Library** | Requires jQuery | Built-in |
| **HTTP Methods** | GET only | All methods |
| **Promise** | No (callbacks) | Yes |
| **Error Handling** | `.fail()` | `.catch()` |
| **Modern** | Legacy | Current standard |
| **JSON Parsing** | Automatic | Manual `.json()` |

---

# When to Use Each Method

**Use $.getJSON() when:**

- Already using jQuery in project
- Only need simple GET requests
- Working with legacy code

**Use fetch() when:**

- Modern project (recommended)
- Need POST, PUT, DELETE
- Want Promise-based code
- No jQuery dependency

---

# Common API Testing Service

**JSONPlaceholder** - Free fake API for testing

```
https://jsonplaceholder.typicode.com/users
https://jsonplaceholder.typicode.com/posts
https://jsonplaceholder.typicode.com/comments
```

**Perfect for:**

- Learning and testing
- Prototyping
- Examples and tutorials

---

# Complete Example: User List App (Template)

```vue
<template>
  <div class="user-app">
    <h1>User Management</h1>
    <button @click="fetchUsers">Load Users</button>

    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <ul v-if="!loading && users.length">
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>
```

---

# Complete Example: User List App (Script)

```vue
<script>
export default {
  data() {
    return {
      users: [],
      loading: false,
      error: null
    }
  },
  methods: {
    fetchUsers() {
      this.loading = true
      this.error = null

      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch users')
          }
          return response.json()
        })
        .then(data => {
          this.users = data
        })
        .catch(error => {
          this.error = error.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
```

---

# Response Object Properties

**The Response object has useful properties:**

```javascript
fetch(url).then(response => {
  console.log(response.status)      // 200, 404, 500, etc.
  console.log(response.statusText)  // "OK", "Not Found", etc.
  console.log(response.ok)          // true if status 200-299
  console.log(response.headers)     // Response headers
})
```

---

# Working with Headers

**Request headers:**

```javascript
fetch(url, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
    'Accept': 'application/json'
  }
})
```

**Reading response headers:**

```javascript
fetch(url).then(response => {
  console.log(response.headers.get('Content-Type'))
})
```

---

# Loading States Pattern

```vue
<script>
export default {
  data() {
    return {
      data: null,
      loading: false,
      error: null
    }
  },
  methods: {
    async loadData() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(url)
        this.data = await response.json()
      } catch (e) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
```

---

# Best Practices: API Calls

1. **Always handle errors** - Use `.catch()` or try/catch
2. **Show loading states** - Better user experience
3. **Check response.ok** - Handle HTTP errors
4. **Use environment variables** - For API URLs
5. **Avoid calling in loops** - Batch requests when possible

---

# Best Practices: Error Messages

**User-friendly errors:**

```javascript
.catch(error => {
  if (error.message.includes('Failed to fetch')) {
    this.error = 'Network error. Please check connection.'
  } else {
    this.error = 'Something went wrong. Please try again.'
  }
})
```

**Developer errors (console):**

```javascript
.catch(error => {
  console.error('API Error:', error)
  this.error = 'Unable to load data'
})
```

---

# Common Patterns: Retry Logic

```javascript
function fetchWithRetry(url, retries = 3) {
  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('HTTP error')
      return response.json()
    })
    .catch(error => {
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`)
        return fetchWithRetry(url, retries - 1)
      }
      throw error
    })
}
```

---

# Common Patterns: Timeout

```javascript
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ])
}
```

---

# Debugging API Calls

**Browser DevTools:**

1. **Network tab** - See all requests
2. **Console** - Log responses
3. **Response preview** - View JSON

**Debugging tips:**

```javascript
fetch(url)
  .then(response => {
    console.log('Status:', response.status)
    console.log('Headers:', response.headers)
    return response.json()
  })
  .then(data => {
    console.log('Data:', data)
  })
```

---

# CORS (Cross-Origin Resource Sharing)

**What is CORS?**
Browser security that restricts cross-origin requests.

**Common error:**

```
Access to fetch at 'https://api.example.com' from origin
'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**

- API must allow your origin
- Use proxy server in development
- Configure CORS headers on server

---

# Summary: HTTP Methods

| Method | Action | Idempotent | Body |
|--------|--------|-----------|------|
| **GET** | Retrieve | Yes | No |
| **POST** | Create | No | Yes |
| **PUT** | Update | Yes | Yes |
| **DELETE** | Remove | Yes | Usually no |

---

# Summary: Fetching Data

**$.getJSON():**

- jQuery-based
- Simple for GET requests
- Callback-based

**fetch():**

- Modern JavaScript standard
- All HTTP methods
- Promise-based
- Better error handling

---

# Conclusion

**This week you learned:**

- RESTful API principles and HTTP methods
- CRUD operations (Create, Read, Update, Delete)
- jQuery's `$.getJSON()` for simple requests
- Modern `fetch()` API with Promises
- `.then()` for success and `.catch()` for errors
- Best practices for API calls and error handling

**Next week:** API 2 and Pagination

---

<!-- _paginate: false -->

# Questions?

**Practice making API calls with both methods!**

Remember:

```
fetch() → .then() → .catch()
Promises: Pending → Fulfilled/Rejected
```

**Happy coding!**
