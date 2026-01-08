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

# Week 4

## View and ViewModel

**COS30043 - Interface Design and Development**

---

# Introduction

Welcome to Week 4!

This week, we'll explore:

- MVVM Architecture in depth
- Application Options (`data`, `methods`, `watch`, `computed`)
- Building reactive applications with Options API
- Understanding the ViewModel layer
- Managing application state effectively

---

# Learning Outcomes

By the end of this week, you will be able to:

1. Understand MVVM architecture and Vue's role as ViewModel
2. Define reactive state using the `data()` option
3. Create methods to handle user interactions
4. Use `watch` to monitor data changes
5. Implement `computed` properties for derived values
6. Build complex reactive applications

---

# What is MVVM?

**MVVM** stands for **Model-View-ViewModel**

It's an architectural pattern that separates:

- **Model** - Data and business logic
- **View** - User interface (HTML/DOM)
- **ViewModel** - The bridge between Model and View

**Vue.js focuses on the ViewModel layer**

---

# MVVM Architecture Diagram

```
┌──────────────────────────────────────┐
│            VIEW (DOM)                │
│        User Interface Layer          │
│      - HTML Templates                │
│      - Visual Elements               │
└──────────────┬───────────────────────┘
               │
       Two-Way Data Binding
               │
┌──────────────▼───────────────────────┐
│         VIEWMODEL (Vue.js)           │
│     - data()                         │
│     - methods                        │
│     - computed                       │
│     - watch                          │
└──────────────┬───────────────────────┘
               │
┌──────────────▼───────────────────────┐
│          MODEL (Data)                │
│     Application State & Logic        │
│      - Arrays, Objects               │
│      - Business Rules                │
└──────────────────────────────────────┘
```

---

# Vue as ViewModel

**Vue acts as the ViewModel by:**

1. **Synchronizing** Model and View automatically
2. **Listening** to View events (clicks, input, etc.)
3. **Updating** the View when Model data changes
4. **Managing** the connection between layers

This eliminates manual DOM manipulation!

---

# Application Options Overview

Vue Options API provides several options:

- **`data()`** - Defines reactive state
- **`methods`** - Functions for user actions
- **`computed`** - Derived reactive values
- **`watch`** - Monitors data changes

We'll explore each in detail.

---

# The data() Option

**Purpose:** Define the reactive state of your application

**Key Points:**

- Must be a **function** that returns an object
- All properties become **reactive**
- Access in template directly
- Access in script with `this.propertyName`

---

# data() Example

```vue
<script>
export default {
  data() {
    return {
      message: 'Hello Vue!',
      count: 0,
      user: {
        name: 'Alice',
        age: 25
      },
      items: ['Apple', 'Banana', 'Orange']
    }
  }
}
</script>
```

All these properties are now reactive!

---

# Why data() Must Be a Function

**Important:** `data` must be a function, not an object.

**Why?**

- Each component instance needs its own data
- Functions return new objects each time
- Prevents data sharing between instances

```javascript
// ❌ Wrong
data: { count: 0 }

// ✅ Correct
data() {
  return { count: 0 }
}
```

---

# Accessing data in Template

```vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <p>Count: {{ count }}</p>
    <p>User: {{ user.name }}, Age: {{ user.age }}</p>
    <ul>
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
```

Data properties are accessed directly in templates.

---

# The methods Option

**Purpose:** Define functions that respond to user actions

**Key Points:**

- Object containing function definitions
- Access data properties with `this.propertyName`
- Called from templates using `@event="methodName"`
- Can accept parameters

---

# methods Example: Template

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="reset">Reset</button>
    <button @click="addAmount(5)">+5</button>
  </div>
</template>
```

---

# methods Example: Script

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    },
    addAmount(amount) {
      this.count += amount
    }
  }
}
</script>
```

---

# Accessing this in methods

**The `this` keyword refers to the Vue instance**

```javascript
methods: {
  updateUser() {
    // Access data properties
    this.user.name = 'Bob'
    this.count++

    // Call other methods
    this.reset()

    // Access computed properties
    console.log(this.fullName)
  }
}
```

---

# The computed Option

**Purpose:** Define derived values that depend on reactive data

**Key Points:**

- Automatically updates when dependencies change
- Cached based on dependencies
- Accessed like data properties (no parentheses)
- More efficient than methods for calculated values

---

# computed vs methods

| Aspect                | computed                         | methods                               |
| --------------------- | -------------------------------- | ------------------------------------- |
| **Caching**     | Cached until dependencies change | No caching                            |
| **Access**      | Like property:`{{ fullName }}` | Like function:`{{ getFullName() }}` |
| **Use Case**    | Derived values                   | User actions                          |
| **Performance** | Better for calculations          | Re-runs every time                    |

---

# computed Example: Basic

```vue
<template>
  <div>
    <p>First Name: <input v-model="firstName"></p>
    <p>Last Name: <input v-model="lastName"></p>
    <p>Full Name: {{ fullName }}</p>
  </div>
</template>
```

---

# computed Example: Script

```vue
<script>
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  }
}
</script>
```

`fullName` updates automatically when `firstName` or `lastName` changes!

---

# computed Example: Complex Calculation

```vue
<script>
export default {
  data() {
    return {
      items: [
        { name: 'Item 1', price: 10, quantity: 2 },
        { name: 'Item 2', price: 20, quantity: 1 },
        { name: 'Item 3', price: 15, quantity: 3 }
      ]
    }
  },
  computed: {
    totalPrice() {
      return this.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    }
  }
}
</script>
```

---

# computed Example: Filtering Arrays

```vue
<script>
export default {
  data() {
    return {
      searchQuery: '',
      students: [
        { id: 1, name: 'Alice', grade: 85 },
        { id: 2, name: 'Bob', grade: 92 },
        { id: 3, name: 'Charlie', grade: 78 }
      ]
    }
  },
  computed: {
    filteredStudents() {
      return this.students.filter(student => {
        return student.name.toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      })
    }
  }
}
</script>
```

---

# The watch Option

**Purpose:** Monitor specific data properties and execute code when they change

**Key Points:**

- Watches individual properties
- Receives `newValue` and `oldValue` as arguments
- Useful for side effects (API calls, validation, etc.)
- Can watch nested properties

---

# watch vs computed

| Aspect                 | watch                 | computed          |
| ---------------------- | --------------------- | ----------------- |
| **Purpose**      | Side effects          | Derived values    |
| **Return Value** | No return needed      | Must return value |
| **Arguments**    | `(newVal, oldVal)`  | None              |
| **Use Case**     | API calls, validation | Calculate values  |

---

# watch Example: Basic

```vue
<template>
  <div>
    <input v-model="username" placeholder="Username">
    <p>{{ statusMessage }}</p>
  </div>
</template>
```

---

# watch Example: Script

```vue
<script>
export default {
  data() {
    return {
      username: '',
      statusMessage: ''
    }
  },
  watch: {
    username(newValue, oldValue) {
      console.log('Username changed from', oldValue, 'to', newValue)

      if (newValue.length < 3) {
        this.statusMessage = 'Username too short'
      } else {
        this.statusMessage = 'Username valid'
      }
    }
  }
}
</script>
```

---

# watch Example: API Call Simulation

```vue
<script>
export default {
  data() {
    return {
      searchTerm: '',
      results: [],
      loading: false
    }
  },
  watch: {
    searchTerm(newValue) {
      this.loading = true

      // Simulate API call
      setTimeout(() => {
        this.results = [`Result for: ${newValue}`]
        this.loading = false
      }, 1000)
    }
  }
}
</script>
```

---

# Complete Example: Shopping Cart (Template)

```vue
<template>
  <div>
    <h1>Shopping Cart</h1>

    <div v-for="item in items" :key="item.id">
      <p>{{ item.name }}: ${{ item.price }}</p>
      <button @click="addToCart(item)">Add</button>
    </div>

    <h2>Cart Total: ${{ cartTotal }}</h2>
    <p>Items: {{ cartItemCount }}</p>
  </div>
</template>
```

---

# Complete Example: Shopping Cart (Script - data)

```vue
<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: 'Laptop', price: 999 },
        { id: 2, name: 'Mouse', price: 25 },
        { id: 3, name: 'Keyboard', price: 75 }
      ],
      cart: []
    }
  },
```

---

# Complete Example: Shopping Cart (Script - methods)

```vue
  methods: {
    addToCart(item) {
      this.cart.push(item)
    },
    clearCart() {
      this.cart = []
    }
  },
```

---

# Complete Example: Shopping Cart (Script - computed)

```vue
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => {
        return total + item.price
      }, 0)
    },
    cartItemCount() {
      return this.cart.length
    }
  },
```

---

# Complete Example: Shopping Cart (Script - watch)

```vue
  watch: {
    cartTotal(newTotal) {
      if (newTotal > 1000) {
        alert('You qualify for free shipping!')
      }
    }
  }
}
</script>
```

---

# Reactivity in Vue

**How Vue tracks changes:**

1. When component is created, Vue walks through `data()` properties
2. Converts them to **getters/setters** using JavaScript proxies
3. When a property is **read**, Vue tracks the dependency
4. When a property is **written**, Vue notifies dependents
5. Dependents (computed, watch, template) **re-evaluate**

This is automatic reactivity!

---

# Reactivity Diagram

```
┌──────────────────────────────────┐
│  User updates input field        │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  v-model updates data property   │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Vue detects change via setter   │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Notifies all dependents:        │
│  - Template expressions          │
│  - Computed properties           │
│  - Watchers                      │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Components re-render            │
└──────────────────────────────────┘
```

---

# Best Practices: data()

1. **Initialize all properties** - Even if empty/null
2. **Keep it simple** - Don't put logic in data()
3. **Use proper types** - Arrays as [], Objects as {}
4. **Avoid functions** - Use methods or computed instead

```javascript
data() {
  return {
    items: [],        // ✅ Initialize arrays
    user: null,       // ✅ Initialize as null if needed
    count: 0          // ✅ Initialize numbers
  }
}
```

---

# Best Practices: methods

1. **Use descriptive names** - `updateUserProfile()` not `update()`
2. **Keep them focused** - One responsibility per method
3. **Use this carefully** - Always use `this` to access data
4. **Avoid arrow functions** - They don't bind `this` correctly

```javascript
// ❌ Avoid
methods: {
  update: () => { this.count++ }  // this is undefined!
}

// ✅ Correct
methods: {
  incrementCounter() {
    this.count++
  }
}
```

---

# Best Practices: computed

1. **No side effects** - Don't modify data in computed
2. **Pure functions** - Same input = same output
3. **Use for derived values** - Not for formatting only
4. **Keep them simple** - Complex logic → separate methods

```javascript
// ❌ Avoid side effects
computed: {
  fullName() {
    this.count++  // Side effect!
    return this.firstName + ' ' + this.lastName
  }
}

// ✅ Pure computation
computed: {
  fullName() {
    return this.firstName + ' ' + this.lastName
  }
}
```

---

# Best Practices: watch

1. **Use for side effects** - API calls, localStorage, etc.
2. **Avoid complex logic** - Keep watchers simple
3. **Consider computed first** - Often a better choice
4. **Use immediate option** - Run on mount if needed

```javascript
watch: {
  searchTerm: {
    immediate: true,  // Run on mount
    handler(newValue) {
      this.performSearch(newValue)
    }
  }
}
```

---

# Common Patterns: Form Validation

```vue
<script>
export default {
  data() {
    return {
      email: '',
      errors: []
    }
  },
  computed: {
    isValidEmail() {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
    }
  },
  watch: {
    email(newEmail) {
      this.errors = []
      if (newEmail && !this.isValidEmail) {
        this.errors.push('Invalid email format')
      }
    }
  }
}
</script>
```

---

# Common Patterns: Loading States

```vue
<script>
export default {
  data() {
    return {
      isLoading: false,
      data: null,
      error: null
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      this.error = null

      try {
        // Simulate API call
        this.data = await fetch('/api/data')
      } catch (e) {
        this.error = e.message
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
```

---

# Common Patterns: Toggle States

```vue
<script>
export default {
  data() {
    return {
      isOpen: false,
      isActive: false
    }
  },
  methods: {
    toggle(property) {
      this[property] = !this[property]
    }
  },
  computed: {
    buttonText() {
      return this.isOpen ? 'Close' : 'Open'
    }
  }
}
</script>
```

---

# Debugging Tips

**Use Vue DevTools:**

- Inspect component state
- Monitor data changes
- Track computed dependencies

**Console logging:**

```javascript
watch: {
  username(newVal, oldVal) {
    console.log('Changed:', oldVal, '→', newVal)
  }
}

computed: {
  fullName() {
    console.log('Computing fullName')
    return this.firstName + ' ' + this.lastName
  }
}
```

---

# Performance Considerations

**computed is cached:**

- ✅ Use for expensive calculations
- ✅ Automatically optimized

**methods run every time:**

- ✅ Use for user actions
- ❌ Avoid in templates for calculations

```vue
<!-- ❌ Slow: runs on every render -->
<p>{{ calculateTotal() }}</p>

<!-- ✅ Fast: cached computed -->
<p>{{ total }}</p>
```

---

# Lifecycle and Options

**Options are processed in order:**

1. `data()` - Creates reactive state
2. `computed` - Sets up computed properties
3. `watch` - Sets up watchers
4. `methods` - Defines methods

All are available in lifecycle hooks and other options.

---

# Summary: Application Options

| Option             | Purpose         | Returns | Access            |
| ------------------ | --------------- | ------- | ----------------- |
| **data()**   | Reactive state  | Object  | `this.property` |
| **methods**  | User actions    | Any     | `this.method()` |
| **computed** | Derived values  | Value   | `this.property` |
| **watch**    | Monitor changes | Nothing | Automatic         |

---

# Conclusion

**This week you learned:**

- MVVM architecture and Vue's role as ViewModel
- `data()` for defining reactive state
- `methods` for handling user interactions
- `computed` for derived reactive values
- `watch` for monitoring data changes
- Best practices for each option

**Next week:** Components and Routerp

---

<!-- _paginate: false -->

# Questions?

**Practice building reactive applications using all four options!**

Remember the MVVM flow:

```
View ↔ ViewModel (Vue) ↔ Model
```

**Happy coding!**
