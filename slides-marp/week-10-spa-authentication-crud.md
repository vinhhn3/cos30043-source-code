---
marp: true
theme: default
paginate: true
style: |
  section {
    font-size: 24px;
  }
---

# Week 10: Single Page Applications (SPA) Deep Dive

**COS30043 - Interface Design and Development**

---

## Learning Outcomes

By the end of this week, you will be able to:

- Understand authentication mechanisms in Vue SPAs
- Implement POST requests for user login
- Use $emit to pass authentication events up the component tree
- Perform CRUD operations (Create, Read, Update, Delete)
- Build complete data management interfaces
- Handle HTTP methods: GET, POST, PUT, DELETE

---

## Topics Covered

1. Authentication in SPAs
2. Login Components
3. Event Communication with $emit
4. CRUD Operations Overview
5. POST Requests (Create)
6. PUT Requests (Update)
7. DELETE Requests (Delete)
8. Complete CRUD Example

---

## Authentication in Single Page Applications

**Definition:** Authentication is the process of verifying user identity before granting access to protected resources.

**Why Authentication Matters:**
- Protects sensitive data
- Personalizes user experience
- Controls access to specific features
- Tracks user activity

---

## Authentication Flow

```
┌─────────────┐
│   User      │
│ (Browser)   │
└──────┬──────┘
       │ 1. Enter credentials
       ▼
┌─────────────┐
│   Login     │
│ Component   │
└──────┬──────┘
       │ 2. POST /api/login
       ▼
┌─────────────┐
│   Server    │
│   (API)     │
└──────┬──────┘
       │ 3. Verify credentials
       │ 4. Return token/status
       ▼
┌─────────────┐
│   App.vue   │
│ (Authenticated)
└─────────────┘
```

---

## Login Component Structure

**HTML Structure:**

```html
<template>
  <div class="login-container">
    <h2>Login</h2>    
    <form @submit.prevent="login">
      <input v-model="username" 
             placeholder="Username" 
             required>
      <input v-model="password" 
             type="password" 
             placeholder="Password" 
             required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
```

---

## Login Component Logic

```javascript
export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  }
}
```

---

## Login Method with POST Request

```javascript
methods: {
  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };
    
    fetch('https://api.example.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
  }
}
```

---

## Handling Login Response

```javascript
.then(response => response.json())
.then(data => {
  if (data.success) {
    // Emit event to parent
    this.$emit('authenticated', true);
    // Store token if needed
    localStorage.setItem('token', data.token);
  } else {
    this.error = 'Invalid credentials';
  }
})
.catch(err => {
  this.error = 'Login failed';
  console.error(err);
});
```

---

## Understanding $emit

**Definition:** `$emit` is a method used by child components to send events to their parent components.

**Syntax:**
```javascript
this.$emit('eventName', payload)
```

**Benefits:**
- Enables upward communication in component tree
- Keeps components decoupled
- Follows Vue's unidirectional data flow

---

## Using $emit for Authentication

**In LoginComponent.vue:**
```javascript
methods: {
  login() {
    // ... perform authentication ...
    if (authenticated) {
      this.$emit('authenticated', true);
    }
  }
}
```

---

## Listening to Authentication Event

**In App.vue:**

```html
<template>
  <div id="app">
    <LoginComponent 
      v-if="!isAuthenticated"
      @authenticated="handleAuth">
    </LoginComponent>
    <Dashboard v-else></Dashboard>
  </div>
</template>
```

---

## Handling Authentication in Parent

```javascript
export default {
  data() {
    return {
      isAuthenticated: false
    }
  },
  methods: {
    handleAuth(status) {
      this.isAuthenticated = status;
    }
  }
}
```

---

## CRUD Operations Overview

**CRUD** stands for the four basic operations for persistent storage:

- **C**reate: Add new records (POST)
- **R**ead: Retrieve existing records (GET)
- **U**pdate: Modify existing records (PUT)
- **D**elete: Remove records (DELETE)

These operations form the foundation of most web applications.

---

## CRUD and HTTP Methods

```
┌──────────┬─────────────┬─────────────────┐
│ Operation│ HTTP Method │ Purpose         │
├──────────┼─────────────┼─────────────────┤
│ Create   │ POST        │ Insert new data │
│ Read     │ GET         │ Retrieve data   │
│ Update   │ PUT/PATCH   │ Modify data     │
│ Delete   │ DELETE      │ Remove data     │
└──────────┴─────────────┴─────────────────┘
```

---

## POST Request - Creating Records

**Purpose:** Send data to the server to create a new record in the database.

**Characteristics:**
- Uses `method: 'POST'`
- Includes data in the request body
- Returns the created resource (often with new ID)
- Changes server state

---

## POST Request Example - Add User

```javascript
methods: {
  addUser() {
    const newUser = {
      name: this.newName,
      email: this.newEmail,
      role: this.newRole
    };
    
    fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
  }
}
```

---

## Handling POST Response

```javascript
.then(response => response.json())
.then(data => {
  // Add to local array
  this.users.push(data);
  // Clear form
  this.newName = '';
  this.newEmail = '';
  this.newRole = '';
  // Show success message
  alert('User added successfully');
})
.catch(err => {
  console.error('Error adding user:', err);
});
```

---

## PUT Request - Updating Records

**Purpose:** Send data to update an existing record on the server.

**Characteristics:**
- Uses `method: 'PUT'` or `'PATCH'`
- Targets a specific resource ID in the URL
- Includes updated data in request body
- Returns the updated resource

**URL Pattern:** `/api/resource/:id`

---

## PUT Request Example - Update User

```javascript
methods: {
  updateUser(userId) {
    const updatedUser = {
      name: this.editName,
      email: this.editEmail,
      role: this.editRole
    };
    
    fetch(`https://api.example.com/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
  }
}
```

---

## Handling PUT Response

```javascript
.then(response => response.json())
.then(data => {
  // Find and update in local array
  const index = this.users.findIndex(
    u => u.id === userId
  );
  if (index !== -1) {
    this.users[index] = data;
  }
  alert('User updated successfully');
})
.catch(err => {
  console.error('Error updating user:', err);
});
```

---

## DELETE Request - Removing Records

**Purpose:** Remove a specific record from the server database.

**Characteristics:**
- Uses `method: 'DELETE'`
- Targets a specific resource ID in the URL
- Usually no request body needed
- Returns confirmation or deleted resource

---

## DELETE Request Example

```javascript
methods: {
  deleteUser(userId) {
    if (!confirm('Delete this user?')) {
      return;
    }
    
    fetch(`https://api.example.com/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
```

---

## Handling DELETE Response

```javascript
.then(response => {
  if (response.ok) {
    // Remove from local array
    this.users = this.users.filter(
      u => u.id !== userId
    );
    alert('User deleted successfully');
  }
})
.catch(err => {
  console.error('Error deleting user:', err);
});
```

---

## Complete CRUD Component Template

```html
<template>
  <div class="user-management">
    <h2>User Management</h2>
    
    <!-- Create Form -->
    <form @submit.prevent="addUser">
      <input v-model="newName" 
             placeholder="Name" required>
      <input v-model="newEmail" 
             placeholder="Email" required>
      <button type="submit">Add User</button>
    </form>
  </div>
</template>
```

---

## CRUD Component - User List Display

```html
<!-- User List -->
<div v-for="user in users" 
     :key="user.id" 
     class="user-card">
  <div v-if="editingId !== user.id">
    <p>{{ user.name }}</p>
    <p>{{ user.email }}</p>
    <button @click="startEdit(user)">
      Edit
    </button>
    <button @click="deleteUser(user.id)">
      Delete
    </button>
  </div>
</div>
```

---

## CRUD Component - Edit Form

```html
<div v-else>
  <input v-model="editName">
  <input v-model="editEmail">
  <button @click="updateUser(user.id)">
    Save
  </button>
  <button @click="cancelEdit">
    Cancel
  </button>
</div>
```

---

## CRUD Component - Data Structure

```javascript
export default {
  data() {
    return {
      users: [],
      newName: '',
      newEmail: '',
      editingId: null,
      editName: '',
      editEmail: ''
    }
  }
}
```

---

## CRUD Component - Mounted Hook

```javascript
mounted() {
  // Load users on component mount
  this.loadUsers();
},
methods: {
  loadUsers() {
    fetch('https://api.example.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });
  }
}
```

---

## CRUD Component - Create Method

```javascript
addUser() {
  const newUser = {
    name: this.newName,
    email: this.newEmail
  };
  
  fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  .then(response => response.json())
  .then(data => {
    this.users.push(data);
    this.newName = '';
    this.newEmail = '';
  });
}
```

---

## CRUD Component - Edit Helpers

```javascript
startEdit(user) {
  this.editingId = user.id;
  this.editName = user.name;
  this.editEmail = user.email;
},

cancelEdit() {
  this.editingId = null;
  this.editName = '';
  this.editEmail = '';
}
```

---

## CRUD Component - Update Method

```javascript
updateUser(userId) {
  const updatedUser = {
    name: this.editName,
    email: this.editEmail
  };
  
  fetch(`https://api.example.com/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedUser)
  })
  .then(response => response.json())
  .then(data => {
    const index = this.users.findIndex(
      u => u.id === userId
    );
    this.users[index] = data;
    this.cancelEdit();
  });
}
```

---

## CRUD Component - Delete Method

```javascript
deleteUser(userId) {
  if (!confirm('Are you sure?')) {
    return;
  }
  
  fetch(`https://api.example.com/users/${userId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      this.users = this.users.filter(
        u => u.id !== userId
      );
    }
  });
}
```

---

## Authorization Headers

**Why Needed:** Many APIs require authentication tokens to authorize requests.

```javascript
methods: {
  fetchProtectedData() {
    const token = localStorage.getItem('token');
    
    fetch('https://api.example.com/protected', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }
}
```

---

## Adding Authorization to CRUD

```javascript
addUser() {
  const token = localStorage.getItem('token');
  
  fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.newUser)
  })
  .then(response => response.json())
  .then(data => this.users.push(data));
}
```

---

## Error Handling Best Practices

```javascript
deleteUser(userId) {
  fetch(`https://api.example.com/users/${userId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Delete failed');
    }
    return response.json();
  })
  .then(() => {
    this.users = this.users.filter(
      u => u.id !== userId
    );
  })
  .catch(err => {
    alert(`Error: ${err.message}`);
  });
}
```

---

## Loading States

```javascript
data() {
  return {
    users: [],
    isLoading: false,
    error: null
  }
},
methods: {
  loadUsers() {
    this.isLoading = true;
    this.error = null;
    
    fetch('https://api.example.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
        this.isLoading = false;
      })
      .catch(err => {
        this.error = err.message;
        this.isLoading = false;
      });
  }
}
```

---

## Loading State Template

```html
<div v-if="isLoading">
  Loading users...
</div>

<div v-else-if="error">
  Error: {{ error }}
</div>

<div v-else>
  <div v-for="user in users" :key="user.id">
    {{ user.name }}
  </div>
</div>
```

---

## Form Validation Before Submit

```javascript
methods: {
  addUser() {
    // Validate before sending
    if (!this.newName.trim()) {
      alert('Name is required');
      return;
    }
    
    if (!this.isValidEmail(this.newEmail)) {
      alert('Invalid email format');
      return;
    }
    
    // Proceed with POST request
    this.createUser();
  }
}
```

---

## Email Validation Helper

```javascript
methods: {
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  createUser() {
    // POST request code here
  }
}
```

---

## Optimistic UI Updates

**Concept:** Update the UI immediately, then sync with server.

```javascript
deleteUser(userId) {
  // Remove from UI immediately
  const originalUsers = [...this.users];
  this.users = this.users.filter(
    u => u.id !== userId
  );
  
  fetch(`https://api.example.com/users/${userId}`, {
    method: 'DELETE'
  })
  .catch(err => {
    // Restore on error
    this.users = originalUsers;
    alert('Delete failed');
  });
}
```

---

## Search and Filter with CRUD

```javascript
data() {
  return {
    users: [],
    searchQuery: ''
  }
},
computed: {
  filteredUsers() {
    return this.users.filter(user => {
      return user.name.toLowerCase()
        .includes(this.searchQuery.toLowerCase());
    });
  }
}
```

---

## Search Template

```html
<input v-model="searchQuery" 
       placeholder="Search users...">

<div v-for="user in filteredUsers" 
     :key="user.id">
  <p>{{ user.name }}</p>
  <p>{{ user.email }}</p>
  <button @click="deleteUser(user.id)">
    Delete
  </button>
</div>
```

---

## Pagination with CRUD

```javascript
data() {
  return {
    users: [],
    currentPage: 1,
    perPage: 10
  }
},
computed: {
  paginatedUsers() {
    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;
    return this.users.slice(start, end);
  }
}
```

---

## Complete User Management Flow

```
┌──────────────────────────────────┐
│  1. User loads page              │
│     mounted() → loadUsers()      │
└───────────┬──────────────────────┘
            │
┌───────────▼──────────────────────┐
│  2. Display user list            │
│     v-for over users array       │
└───────────┬──────────────────────┘
            │
┌───────────▼──────────────────────┐
│  3. User actions:                │
│     - Add → POST request         │
│     - Edit → PUT request         │
│     - Delete → DELETE request    │
└───────────┬──────────────────────┘
            │
┌───────────▼──────────────────────┐
│  4. Update local array           │
│     Sync UI with server response │
└──────────────────────────────────┘
```

---

## RESTful API Conventions

**Resource-based URLs:**
```
GET    /api/users       → Get all users
POST   /api/users       → Create user
GET    /api/users/:id   → Get one user
PUT    /api/users/:id   → Update user
DELETE /api/users/:id   → Delete user
```

**Status Codes:**
- 200: Success
- 201: Created
- 204: No Content (delete success)
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found

---

## Async/Await Alternative Syntax

```javascript
async addUser() {
  try {
    const response = await fetch(
      'https://api.example.com/users', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newUser)
      }
    );
    
    const data = await response.json();
    this.users.push(data);
  } catch (err) {
    console.error('Error:', err);
  }
}
```

---

## Reusable API Service

**Create `api.js`:**

```javascript
const BASE_URL = 'https://api.example.com';

export default {
  getUsers() {
    return fetch(`${BASE_URL}/users`)
      .then(res => res.json());
  },
  
  createUser(user) {
    return fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json());
  }
}
```

---

## Using API Service

**In component:**

```javascript
import api from './api.js';

export default {
  methods: {
    loadUsers() {
      api.getUsers()
        .then(data => {
          this.users = data;
        });
    },
    
    addUser() {
      api.createUser(this.newUser)
        .then(data => {
          this.users.push(data);
        });
    }
  }
}
```

---

## Best Practices Summary

1. **Always validate** input before sending requests
2. **Handle errors** gracefully with try/catch or .catch()
3. **Show loading states** during async operations
4. **Use authorization tokens** for protected endpoints
5. **Update local state** after successful server responses
6. **Provide user feedback** with success/error messages
7. **Confirm destructive actions** like delete
8. **Keep URLs RESTful** and consistent

---

## Common Mistakes to Avoid

❌ Not checking response status
❌ Forgetting Content-Type header
❌ Not handling network errors
❌ Mutating state before server confirmation
❌ Exposing sensitive tokens in code
❌ Not validating user input
❌ Missing authorization headers
❌ Hardcoding API URLs

---

## Testing CRUD Operations

**Use browser DevTools:**

1. **Network tab:** Monitor requests/responses
2. **Console:** Check for errors
3. **Application tab:** View localStorage tokens

**Test each operation:**
- Create: Verify POST with correct data
- Read: Check GET returns expected data
- Update: Confirm PUT updates correct record
- Delete: Ensure DELETE removes record

---

## Security Considerations

**Never store sensitive data in:**
- Vue component data
- URL query parameters
- Client-side code (visible to users)

**Always:**
- Use HTTPS for API requests
- Validate on both client and server
- Sanitize user input
- Use secure token storage (httpOnly cookies preferred)
- Implement rate limiting
- Use CORS properly

---

## Debugging Tips

**Problem:** Request not sending
- Check browser console for errors
- Verify URL is correct
- Check network tab in DevTools

**Problem:** Authorization failed
- Verify token is stored correctly
- Check Authorization header format
- Ensure token hasn't expired

**Problem:** CORS error
- Server must allow your domain
- Check server CORS configuration

---

## Real-World Example - Task Manager

```javascript
data() {
  return {
    tasks: [],
    newTask: {
      title: '',
      description: '',
      completed: false
    }
  }
},
methods: {
  addTask() {
    fetch('https://api.example.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(this.newTask)
    })
    .then(res => res.json())
    .then(data => this.tasks.push(data));
  }
}
```

---

## Toggle Task Completion

```javascript
toggleComplete(taskId) {
  const task = this.tasks.find(t => t.id === taskId);
  const updatedTask = {
    ...task,
    completed: !task.completed
  };
  
  fetch(`https://api.example.com/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })
  .then(res => res.json())
  .then(data => {
    const index = this.tasks.findIndex(
      t => t.id === taskId
    );
    this.tasks[index] = data;
  });
}
```

---

## Summary

**Key Concepts:**
- Authentication using POST requests
- $emit for passing events to parent components
- CRUD operations map to HTTP methods
- POST creates, PUT updates, DELETE removes
- Always handle errors and loading states
- Validate input before sending requests
- Use authorization headers for protected routes

**Next Week:** Vuex for centralized state management

---

## Additional Resources

**Documentation:**
- MDN Fetch API
- Vue Events Guide
- RESTful API Design

**Tools:**
- Postman (API testing)
- JSON Server (mock API)
- Vue DevTools

**Practice:**
Build a complete CRUD application with authentication and error handling.
