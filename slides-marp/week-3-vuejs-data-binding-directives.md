---
marp: true
theme: default
paginate: true
---

<!-- _paginate: false -->

# Week 3

## VueJS Data Binding and Directives

**COS30043 - Interface Design and Development**

---

# Introduction

Welcome to Week 3!

This week, we'll dive into **VueJS**:

- Introduction to VueJS framework
- Understanding data binding concepts
- Working with Vue directives
- Building reactive user interfaces
- Creating interactive Single-Page Applications

---

# Learning Outcomes

By the end of this week, you will be able to:

1. Understand what VueJS is and its core concepts
2. Implement data binding between Model and View
3. Use data directives (v-bind, v-model, v-once)
4. Apply conditional directives (v-if, v-else, v-show)
5. Render lists using v-for directive
6. Handle user events with v-on directive

---

# What is VueJS?

**VueJS** is a progressive JavaScript framework for building user interfaces.

**Key Characteristics:**

- Fully **client-side** framework
- Builds **Single-Page Applications (SPA)**
- Reactive and component-based
- Easy to integrate incrementally
- Gentle learning curve

**Official Website:** <https://vuejs.org/>

---

# Single-Page Applications (SPA)

**Traditional Multi-Page App:**

- Each action requests a new page from server
- Full page reload on navigation
- Slower user experience

**Single-Page App (SPA):**

- Loads once, updates content dynamically
- No page reloads during navigation
- Faster, app-like experience
- VueJS manages the UI updates

---

# VueJS Architecture: MVVM Pattern

```
┌──────────────────────────────────────┐
│            VIEW (DOM)                │
│  What the user sees and interacts    │
│         with (HTML)                  │
└───────────────┬──────────────────────┘
                │
        Data Binding (Two-Way)
                │
┌───────────────▼──────────────────────┐
│         VIEWMODEL (VueJS)            │
│  Manages data and syncs View/Model   │
└───────────────┬──────────────────────┘
                │
┌───────────────▼──────────────────────┐
│          MODEL (Data)                │
│     JavaScript objects/state         │
└──────────────────────────────────────┘
```

---

# Understanding Data Binding

**Data Binding** is an automatic synchronization mechanism:

- **Model → View:** When data changes, the DOM updates automatically
- **View → Model:** When user input changes, data updates automatically

This **two-way binding** eliminates manual DOM manipulation.

**Result:** Reactive, dynamic user interfaces with minimal code.

---

# Vite Project Structure

Before we write Vue code, let's understand the project structure:

```
my-vue-app/
├── node_modules/       # Dependencies
├── public/             # Static assets
├── src/
│   ├── components/     # Vue components
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── index.html          # HTML template
├── package.json        # Project configuration
└── vite.config.js      # Vite configuration
```

---

# main.js - Application Entry Point

```javascript
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

**Explanation:**

- Imports `createApp` function from Vue
- Imports root `App.vue` component
- Creates Vue application instance
- Mounts it to `#app` element in `index.html`

---

# App.vue - Root Component Structure

```vue
<template>
  <!-- HTML template goes here -->
</template>

<script>
export default {
  data() {
    return {
      // Data properties go here
    }
  },
  methods: {
    // Methods go here
  }
}
</script>

<style>
/* CSS styles go here */
</style>
```

**Single File Component (SFC):** All three aspects in one `.vue` file.

---

# What is a Directive?

**Directives** are special attributes that start with `v-`.

They attach **reactive behavior** to DOM elements.

**Categories:**

1. **Data Directives** - Manage data display
2. **Conditional Directives** - Control element visibility
3. **Loop Directives** - Render lists
4. **Event Directives** - Handle user interactions

---

# v-bind: Dynamic Attribute Binding

**Purpose:** Dynamically bind data to HTML attributes.

**Syntax:**

- Full: `v-bind:attribute="value"`
- Shorthand: `:attribute="value"`

**Common Uses:**

- Dynamic URLs: `:href="url"`
- Dynamic images: `:src="imagePath"`
- Dynamic classes: `:class="className"`
- Dynamic styles: `:style="styleObject"`

---

# v-bind Example: Template

```vue
<template>
  <div>
    <img :src="logoUrl" :alt="logoAlt">
    <a :href="websiteUrl">Visit Website</a>
    <div :class="boxClass">Styled Box</div>
  </div>
</template>
```

---

# v-bind Example: Script

```vue
<script>
export default {
  data() {
    return {
      logoUrl: '/logo.png',
      logoAlt: 'Company Logo',
      websiteUrl: 'https://example.com',
      boxClass: 'highlight'
    }
  }
}
</script>
```

---

# v-model: Two-Way Data Binding

**Purpose:** Create two-way binding on form inputs.

**Usage:**

- `<input v-model="variable">`
- `<textarea v-model="variable">`
- `<select v-model="variable">`

**How it works:**

- User types → data updates
- Data changes → input updates

---

# v-model Example: Template

```vue
<template>
  <div>
    <input v-model="username" placeholder="Username">
    <p>Hello, {{ username }}!</p>

    <textarea v-model="message"></textarea>
    <p>Message: {{ message }}</p>
  </div>
</template>
```

---

# v-model Example: Script

```vue
<script>
export default {
  data() {
    return {
      username: '',
      message: ''
    }
  }
}
</script>
```

---

# v-once: Render Once

**Purpose:** Render element/component only once.

**Behavior:**

- Initial data is rendered
- Subsequent data changes are **ignored**
- Improves performance for static content

---

# v-once Example

```vue
<template>
  <p v-once>{{ staticContent }}</p>
</template>

<script>
export default {
  data() {
    return {
      staticContent: 'This will never change'
    }
  }
}
</script>
```

---

# Mustache Syntax: Text Interpolation

**Double curly braces** `{{ }}` display reactive data:

**Examples:**

- `{{ message }}` - Display variable
- `{{ count * 2 }}` - JavaScript expressions
- `{{ isActive ? 'Active' : 'Inactive' }}` - Ternary operators

---

# Mustache Syntax Example

```vue
<template>
  <p>{{ message }}</p>
  <p>{{ count * 2 }}</p>
  <p>{{ isActive ? 'Active' : 'Inactive' }}</p>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!',
      count: 5,
      isActive: true
    }
  }
}
</script>
```

---

# v-if: Conditional Rendering

**Purpose:** Add or remove elements from the DOM based on a condition.

**Directives:**

- `v-if` - Renders if condition is true
- `v-else-if` - Additional condition
- `v-else` - Fallback option

**Important:** Elements are actually **added/removed** from DOM.

---

# v-if Example: Template

```vue
<template>
  <div>
    <p v-if="score >= 90">Excellent!</p>
    <p v-else-if="score >= 75">Good job!</p>
    <p v-else-if="score >= 50">Pass</p>
    <p v-else>Need improvement</p>

    <button @click="score += 10">Increase</button>
    <button @click="score -= 10">Decrease</button>
  </div>
</template>
```

---

# v-if Example: Script

```vue
<script>
export default {
  data() {
    return {
      score: 60
    }
  }
}
</script>
```

---

# v-show: Toggle Visibility

**Purpose:** Toggle element visibility using CSS `display` property.

**Difference from v-if:**

- `v-if`: Removes element from DOM
- `v-show`: Keeps in DOM, toggles `display: none`

---

# v-show Example: Template

```vue
<template>
  <div>
    <p v-show="isVisible">Now you see me!</p>
    <button @click="isVisible = !isVisible">
      Toggle
    </button>
  </div>
</template>
```

---

# v-show Example: Script

```vue
<script>
export default {
  data() {
    return {
      isVisible: true
    }
  }
}
</script>
```

---

# v-if vs v-show: When to Use

| Aspect | v-if | v-show |
|--------|------|--------|
| **DOM Impact** | Adds/removes elements | Always in DOM |
| **Initial Cost** | Lower (if false) | Higher |
| **Toggle Cost** | Higher | Lower |
| **Use When** | Rarely toggled | Frequently toggled |

**Rule of thumb:**

- Use `v-if` for initial rendering optimization
- Use `v-show` for frequent toggling

---

# v-for: List Rendering

**Purpose:** Render a list of items based on an array.

**Syntax:**

```vue
v-for="item in items"
v-for="(item, index) in items"
```

**Important:** Always use `:key` attribute for tracking.

---

# v-for Example: Basic Array (Template)

```vue
<template>
  <ul>
    <li v-for="fruit in fruits" :key="fruit">
      {{ fruit }}
    </li>
  </ul>
</template>
```

---

# v-for Example: Basic Array (Script)

```vue
<script>
export default {
  data() {
    return {
      fruits: [
        'Apple',
        'Banana',
        'Orange',
        'Mango'
      ]
    }
  }
}
</script>
```

---

# v-for Example: Array with Index (Template)

```vue
<template>
  <ul>
    <li v-for="(fruit, index) in fruits" :key="index">
      {{ index + 1 }}. {{ fruit }}
    </li>
  </ul>
</template>
```

**Note:** Using index as key is acceptable for static lists.

---

# v-for Example: Array with Index (Script)

```vue
<script>
export default {
  data() {
    return {
      fruits: ['Apple', 'Banana', 'Orange']
    }
  }
}
</script>
```

---

# v-for Example: Array of Objects (Template)

```vue
<template>
  <div v-for="student in students" :key="student.id">
    <h3>{{ student.name }}</h3>
    <p>ID: {{ student.id }}</p>
    <p>Grade: {{ student.grade }}</p>
  </div>
</template>
```

---

# v-for Example: Array of Objects (Script)

```vue
<script>
export default {
  data() {
    return {
      students: [
        { id: 1, name: 'Alice', grade: 'A' },
        { id: 2, name: 'Bob', grade: 'B' },
        { id: 3, name: 'Charlie', grade: 'A' }
      ]
    }
  }
}
</script>
```

---

# Why Use :key with v-for?

**The `:key` attribute helps Vue:**

- Track each element's identity
- Reuse and reorder elements efficiently
- Maintain component state correctly

**Best Practice:**

- Use unique identifier (like `id`)
- Don't use index if list can be reordered
- Key must be primitive value (string/number)

---

# v-on: Event Handling

**Purpose:** Listen to DOM events and execute JavaScript.

**Syntax:**

- Full: `v-on:event="handler"`
- Shorthand: `@event="handler"`

**Common Events:**

- `@click` - Mouse click
- `@submit` - Form submission
- `@input` - Input change
- `@keyup` - Key release

---

# v-on Example: Click Events (Template)

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
    <button @click="count--">Decrement</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

---

# v-on Example: Click Events (Script)

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    reset() {
      this.count = 0
    }
  }
}
</script>
```

---

# v-on Example: Form Events (Template)

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="username" placeholder="Username">
    <button type="submit">Submit</button>
  </form>
  <p v-if="submitted">Submitted: {{ username }}</p>
</template>
```

**`.prevent`** is an event modifier (prevents default behavior).

---

# v-on Example: Form Events (Script)

```vue
<script>
export default {
  data() {
    return {
      username: '',
      submitted: false
    }
  },
  methods: {
    handleSubmit() {
      this.submitted = true
    }
  }
}
</script>
```

---

# Event Modifiers

Vue provides modifiers to handle common event needs:

- `.prevent` - Calls `event.preventDefault()`
- `.stop` - Calls `event.stopPropagation()`
- `.once` - Trigger handler at most once
- `.enter` - Only trigger on Enter key

```vue
<template>
  <form @submit.prevent="onSubmit">
  <button @click.stop="onClick">
  <button @click.once="onFirstClick">
  <input @keyup.enter="onEnter">
</template>
```

---

# Options API: data()

In Vue 3 Options API, we use `data()` to define reactive state:

```vue
<script>
export default {
  data() {
    return {
      count: 0,           // Reactive number
      name: 'John',       // Reactive string
      items: [],          // Reactive array
      user: {}            // Reactive object
    }
  }
}
</script>
```

---

**Access value:**

- In `<script>`: `this.count`
- In `<template>`: `count` (direct access)

---

# Complete Example: Todo List (Template)

```vue
<template>
  <div>
    <h1>Todo List</h1>
    <input v-model="newTodo" @keyup.enter="addTodo">
    <button @click="addTodo">Add</button>

    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo }}
        <button @click="removeTodo(index)">×</button>
      </li>
    </ul>

    <p v-if="todos.length === 0">No todos yet!</p>
  </div>
</template>
```

---

# Complete Example: Todo List (Script)

```vue
<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push(this.newTodo)
        this.newTodo = ''
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    }
  }
}
</script>
```

---

# Complete Example: Todo List (Style)

```vue
<style>
h1 {
  color: #42b983;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

button {
  margin-left: 10px;
  cursor: pointer;
}
</style>
```

---

# Reactive Data Flow

```
┌──────────────────────────────────────┐
│  User interacts with View            │
│  (clicks button, types in input)     │
└────────────────┬─────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────┐
│  Event Handler (@click, v-model)     │
└────────────────┬─────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────┐
│  Updates data() in Script            │
└────────────────┬─────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────┐
│  Vue detects change                  │
└────────────────┬─────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────┐
│  Template re-renders automatically   │
└──────────────────────────────────────┘
```

---

# Directives Summary Table

| Directive | Purpose | Example |
|-----------|---------|---------|
| `v-bind` | Bind attributes | `:src="url"` |
| `v-model` | Two-way binding | `v-model="name"` |
| `v-once` | Render once | `v-once` |
| `v-if` | Conditional render | `v-if="isActive"` |
| `v-show` | Toggle visibility | `v-show="visible"` |
| `v-for` | List rendering | `v-for="item in items"` |
| `v-on` | Event handling | `@click="handler"` |

---

# Best Practices

1. **Always use `:key` with `v-for`** for proper tracking
2. **Use `v-if` for conditional rendering**, `v-show` for toggling
3. **Use Options API** with `data()` and `methods`
4. **Access data properties with `this`** in methods
5. **Use event modifiers** (`.prevent`, `.stop`) for cleaner code
6. **Keep template logic simple** - move complex logic to methods

---

# Common Mistakes to Avoid

❌ Forgetting `this` in methods:

```javascript
count++ // Wrong
this.count++ // Correct
```

❌ Missing `:key` in `v-for`:

```vue
<li v-for="item in items"> // Wrong
<li v-for="item in items" :key="item.id"> // Correct
```

❌ Using `v-if` and `v-for` on same element (bad performance)

---

# Development Workflow with Vite

**Running the development server:**

```bash
npm run dev
```

**Project starts at:** `http://localhost:5173`

**Features:**

- Hot Module Replacement (HMR)
- Instant updates when you save
- Fast refresh without losing state

---

# Debugging Tips

**Vue DevTools:** Browser extension for debugging Vue apps

**Console logging in template:**

```vue
{{ console.log(variableName) }}
```

**Checking reactive values:**

```vue
<pre>{{ JSON.stringify($data, null, 2) }}</pre>
```

**In methods:**

```javascript
console.log('Count:', this.count)
```

---

# Conclusion

**This week you learned:**

- VueJS framework and SPA concepts
- Data binding between Model and View
- Data directives: `v-bind`, `v-model`, `v-once`
- Conditional directives: `v-if`, `v-else`, `v-show`
- List rendering with `v-for`
- Event handling with `v-on`
- Options API with `data()` and `methods`

**Next week:** View and ViewModel (MVVM Architecture)

---

<!-- _paginate: false -->

# Questions?

**Practice building interactive Vue components!**

Remember the Vite project structure:

```
src/
├── components/
├── App.vue
└── main.js
```

**Happy Vue coding!**
