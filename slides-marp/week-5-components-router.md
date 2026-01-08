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

# Week 5

## Components and Router

**COS30043 - Interface Design and Development**

---

# Introduction

Welcome to Week 5!

This week, we'll explore:

- Vue Components and reusability
- Props for parent-child communication
- Custom Directives
- Vue Router for SPA navigation
- Dynamic routing with parameters

---

# Learning Outcomes

By the end of this week, you will be able to:

1. Create reusable Vue components
2. Pass data using props from parent to child
3. Build custom directives with hook functions
4. Implement Vue Router for navigation
5. Use dynamic routes with parameters
6. Create multi-page Single-Page Applications

---

# What are Components?

**Components** are reusable Vue instances with a name.

**Key Characteristics:**

- Encapsulate HTML, CSS, and JavaScript
- Self-contained and reusable
- Accept data via props
- Can be used multiple times
- Building blocks of Vue applications

---

# Why Use Components?

**Benefits:**

1. **Reusability** - Write once, use everywhere
2. **Maintainability** - Changes in one place
3. **Organization** - Break complex UI into pieces
4. **Testability** - Test components in isolation
5. **Collaboration** - Team members work on separate components

---

# Component File Structure

Components in Vite projects live in `src/components/`:

```
src/
├── components/
│   ├── UserCard.vue
│   ├── TodoItem.vue
│   └── NavBar.vue
├── App.vue
└── main.js
```

Each `.vue` file is a **Single File Component (SFC)**.

---

# Creating a Component: Template

```vue
<!-- src/components/UserCard.vue -->
<template>
  <div class="user-card">
    <h2>{{ name }}</h2>
    <p>Age: {{ age }}</p>
    <p>Email: {{ email }}</p>
  </div>
</template>
```

---

# Creating a Component: Script

```vue
<script>
export default {
  name: 'UserCard',
  data() {
    return {
      name: 'Alice',
      age: 25,
      email: 'alice@example.com'
    }
  }
}
</script>
```

---

# Creating a Component: Style

```vue
<style scoped>
.user-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
}

h2 {
  color: #42b983;
  margin: 0 0 10px 0;
}
</style>
```

**`scoped`** - Styles apply only to this component!

---

# Using a Component: Import

```vue
<!-- App.vue -->
<script>
import UserCard from './components/UserCard.vue'

export default {
  components: {
    UserCard
  }
}
</script>
```

**Step 1:** Import the component
**Step 2:** Register in `components` option

---

# Using a Component: Template

```vue
<!-- App.vue -->
<template>
  <div>
    <h1>User Directory</h1>
    <UserCard />
    <UserCard />
    <UserCard />
  </div>
</template>
```

Use the component like an HTML tag!

---

# Component Communication: The Need

**Problem:** Components have their own isolated data.

How do we pass data from parent to child?

**Solution:** Use **Props**!

```
┌─────────────────┐
│  Parent (App)   │
│  has: userData  │
└────────┬────────┘
         │ props
         ▼
┌─────────────────┐
│ Child (UserCard)│
│ receives: name  │
└─────────────────┘
```

---

# What are Props?

**Props** are custom attributes for passing data to child components.

**Characteristics:**

- Passed from parent to child
- Read-only in child component
- Can have types and validation
- Reactive - updates when parent data changes

---

# Defining Props

```vue
<!-- UserCard.vue -->
<script>
export default {
  name: 'UserCard',
  props: {
    name: String,
    age: Number,
    email: String
  }
}
</script>
```

Props are defined in the `props` option.

---

# Using Props in Template

```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card">
    <h2>{{ name }}</h2>
    <p>Age: {{ age }}</p>
    <p>Email: {{ email }}</p>
  </div>
</template>
```

Access props like data properties!

---

# Passing Props: Parent Component

```vue
<!-- App.vue -->
<template>
  <div>
    <UserCard
      name="Alice"
      :age="25"
      email="alice@example.com"
    />
    <UserCard
      name="Bob"
      :age="30"
      email="bob@example.com"
    />
  </div>
</template>
```

Use `:` for binding JavaScript values!

---

# Props with Data

```vue
<!-- App.vue -->
<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
        { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
        { id: 3, name: 'Charlie', age: 28, email: 'charlie@example.com' }
      ]
    }
  }
}
</script>
```

---

# Props with v-for

```vue
<!-- App.vue -->
<template>
  <div>
    <UserCard
      v-for="user in users"
      :key="user.id"
      :name="user.name"
      :age="user.age"
      :email="user.email"
    />
  </div>
</template>
```

---

# Prop Validation

```vue
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      default: 18
    },
    email: {
      type: String,
      validator(value) {
        return value.includes('@')
      }
    }
  }
}
</script>
```

---

# Prop Types

Available prop types:

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Function`
- Custom constructor (e.g., `Date`, custom classes)

Can also use an array: `[String, Number]`

---

# Props Best Practices

1. **Always define prop types** - Helps catch bugs
2. **Use validation** - Ensure data integrity
3. **Don't mutate props** - Props are read-only
4. **Use computed for transformations** - Don't modify props

```javascript
// ❌ Don't do this
props: ['name'],
methods: {
  changeName() {
    this.name = 'New Name'  // Error!
  }
}
```

---

# Custom Directives: What and Why

**Custom Directives** extend HTML with custom behavior.

**Built-in directives:** `v-if`, `v-for`, `v-model`, etc.
**Custom directives:** You create for specific needs!

**Use Cases:**

- Focus input on mount
- Custom animations
- DOM manipulation
- Third-party library integration

---

# Directive Hook Functions

Custom directives use lifecycle hooks:

- **`created`** - Before element is inserted into DOM
- **`beforeMount`** - Before element is mounted
- **`mounted`** - After element is inserted into DOM
- **`updated`** - After component updates
- **`unmounted`** - After element is removed

---

# Global Custom Directive

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.mount('#app')
```

---

# Using Global Directive

```vue
<template>
  <div>
    <input v-focus placeholder="Auto-focused">
    <input placeholder="Not focused">
  </div>
</template>
```

The `v-focus` directive automatically focuses the input!

---

# Local Custom Directive

```vue
<script>
export default {
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  }
}
</script>
```

Local directives only work in this component.

---

# Custom Directive with Arguments

```javascript
app.directive('color', {
  mounted(el, binding) {
    el.style.color = binding.value
  },
  updated(el, binding) {
    el.style.color = binding.value
  }
})
```

---

# Using Directive with Arguments

```vue
<template>
  <div>
    <p v-color="'red'">Red text</p>
    <p v-color="'blue'">Blue text</p>
    <p v-color="userColor">Dynamic color</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userColor: 'green'
    }
  }
}
</script>
```

---

# Vue Router: Introduction

**Vue Router** is the official routing library for Vue.js.

**Purpose:**

- Navigate between "pages" in SPA
- Map URLs to components
- No page reloads
- Browser history support
- Dynamic routes

---

# Installing Vue Router

```bash
npm install vue-router@4
```

Vue Router 4 is compatible with Vue 3.

---

# Router File Structure

```
src/
├── components/
│   ├── Home.vue
│   ├── About.vue
│   └── Contact.vue
├── router/
│   └── index.js
├── App.vue
└── main.js
```

---

# Creating Router: index.js

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact }
]
```

---

# Creating Router: Export

```javascript
// src/router/index.js (continued)
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

---

# Registering Router in main.js

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

---

# router-link Component

**`<router-link>`** creates navigation links.

```vue
<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/contact">Contact</router-link>
  </nav>
</template>
```

Renders as `<a>` tags with proper href.

---

# router-view Component

**`<router-view>`** is where matched components are displayed.

```vue
<!-- App.vue -->
<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>

    <router-view />
  </div>
</template>
```

---

# Complete Router Example: App.vue

```vue
<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link>
    </nav>

    <main>
      <router-view />
    </main>
  </div>
</template>
```

---

# Router Navigation Flow

```
┌────────────────────────────────┐
│  User clicks <router-link>     │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│  URL changes (no page reload)  │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│  Router matches route pattern  │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│  Component renders in          │
│  <router-view>                 │
└────────────────────────────────┘
```

---

# Dynamic Routes: The Need

**Problem:** Creating routes for items with IDs

```javascript
// ❌ Not scalable
{ path: '/user/1', component: User },
{ path: '/user/2', component: User },
{ path: '/user/3', component: User },
// ...
```

**Solution:** Use dynamic segments!

---

# Dynamic Routes: Syntax

```javascript
// src/router/index.js
import User from '../components/User.vue'

const routes = [
  {
    path: '/user/:id',
    component: User
  }
]
```

`:id` is a **dynamic segment** - matches any value!

---

# Accessing Route Parameters

```vue
<!-- User.vue -->
<template>
  <div>
    <h1>User Profile</h1>
    <p>User ID: {{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('User ID:', this.$route.params.id)
  }
}
</script>
```

---

# Dynamic Route Links

```vue
<template>
  <div>
    <h2>User List</h2>
    <router-link to="/user/1">User 1</router-link>
    <router-link to="/user/2">User 2</router-link>
    <router-link to="/user/3">User 3</router-link>

    <!-- Or with data -->
    <router-link
      v-for="user in users"
      :key="user.id"
      :to="`/user/${user.id}`"
    >
      {{ user.name }}
    </router-link>
  </div>
</template>
```

---

# Multiple Dynamic Segments

```javascript
const routes = [
  {
    path: '/post/:category/:id',
    component: Post
  }
]
```

Access both:

```javascript
this.$route.params.category
this.$route.params.id
```

---

# Route Parameters in Data

```vue
<script>
export default {
  data() {
    return {
      userId: this.$route.params.id,
      user: null
    }
  },
  mounted() {
    this.fetchUser(this.userId)
  },
  methods: {
    fetchUser(id) {
      // Fetch user data based on ID
      console.log('Fetching user:', id)
    }
  }
}
</script>
```

---

# Named Routes

```javascript
const routes = [
  {
    path: '/user/:id',
    name: 'user',
    component: User
  }
]
```

Navigate using name:

```vue
<router-link :to="{ name: 'user', params: { id: 123 } }">
  User Profile
</router-link>
```

---

# Programmatic Navigation

```vue
<script>
export default {
  methods: {
    goToUser(userId) {
      this.$router.push(`/user/${userId}`)
    },
    goBack() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>
```

---

# Route Props

Pass route params as props:

```javascript
const routes = [
  {
    path: '/user/:id',
    component: User,
    props: true
  }
]
```

---

# Using Route Props

```vue
<!-- User.vue -->
<script>
export default {
  props: {
    id: String
  },
  mounted() {
    console.log('User ID:', this.id)
  }
}
</script>
```

Cleaner than accessing `$route.params`!

---

# Active Link Styling

```vue
<style>
.router-link-active {
  color: #42b983;
  font-weight: bold;
}

.router-link-exact-active {
  border-bottom: 2px solid #42b983;
}
</style>
```

Vue Router adds these classes automatically!

---

# Route Guards: beforeEnter

```javascript
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next()
      } else {
        next('/login')
      }
    }
  }
]
```

---

# Complete Example: Blog App Structure

```
src/
├── components/
│   ├── BlogHome.vue
│   ├── BlogPost.vue
│   ├── BlogList.vue
│   └── BlogAuthor.vue
├── router/
│   └── index.js
├── App.vue
└── main.js
```

---

# Complete Example: Router Config

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import BlogHome from '../components/BlogHome.vue'
import BlogPost from '../components/BlogPost.vue'
import BlogAuthor from '../components/BlogAuthor.vue'

const routes = [
  { path: '/', component: BlogHome },
  { path: '/post/:id', component: BlogPost, props: true },
  { path: '/author/:name', component: BlogAuthor, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

---

# Complete Example: BlogPost Component

```vue
<template>
  <div class="blog-post">
    <h1>Blog Post {{ id }}</h1>
    <p>Content for post ID: {{ id }}</p>
    <button @click="goBack">Back to Home</button>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>
```

---

# Best Practices: Components

1. **Single responsibility** - One purpose per component
2. **Clear naming** - Use PascalCase (UserCard.vue)
3. **Props validation** - Always define types
4. **Scoped styles** - Use `<style scoped>`
5. **Emit events** - For child-to-parent communication

---

# Best Practices: Router

1. **Lazy loading** - Load components on demand
2. **Named routes** - Easier to maintain
3. **Route props** - Cleaner than $route.params
4. **Descriptive paths** - `/user/:id` not `/u/:i`
5. **404 handling** - Catch-all route

```javascript
{ path: '/:pathMatch(.*)*', component: NotFound }
```

---

# Common Patterns: Loading Component

```vue
<script>
export default {
  props: {
    id: String
  },
  data() {
    return {
      post: null,
      loading: true
    }
  },
  async mounted() {
    this.loading = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    this.post = { title: `Post ${this.id}`, content: '...' }
    this.loading = false
  }
}
</script>
```

---

# Common Patterns: Error Handling

```vue
<script>
export default {
  data() {
    return {
      data: null,
      error: null
    }
  },
  async mounted() {
    try {
      this.data = await this.fetchData()
    } catch (e) {
      this.error = e.message
    }
  }
}
</script>
```

---

# Summary: Components

- **Reusable** Vue instances with encapsulated code
- **Props** pass data from parent to child
- **Validation** ensures data integrity
- **Single File Components** organize HTML, JS, CSS
- **Communication** via props (down) and events (up)

---

# Summary: Router

- **Vue Router** enables SPA navigation
- **router-link** creates navigation links
- **router-view** displays matched components
- **Dynamic routes** use `:param` syntax
- **$route.params** accesses route parameters
- **Programmatic navigation** with $router.push()

---

# Conclusion

**This week you learned:**

- Creating and using Vue components
- Passing data with props and validation
- Building custom directives with hook functions
- Setting up Vue Router for navigation
- Implementing dynamic routes with parameters
- Best practices for components and routing

**Next week:** Forms and Validation

---

<!-- _paginate: false -->

# Questions?

**Practice building a multi-component application with routing!**

Remember:

```
Props down, Events up
Components = Reusability
Router = Navigation without reloads
```

**Happy coding!**
