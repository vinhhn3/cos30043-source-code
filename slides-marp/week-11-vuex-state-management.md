---
marp: true
theme: default
paginate: true
style: |
  section {
    font-size: 24px;
  }
---

# Week 11: Vuex - State Management

**COS30043 - Interface Design and Development**

---

## Learning Outcomes

By the end of this week, you will be able to:

- Understand centralized state management concepts
- Install and configure Vuex in a Vue application
- Define state, getters, mutations, and actions
- Access Vuex state in components
- Commit mutations to change state
- Dispatch actions for asynchronous operations
- Structure large-scale applications with Vuex modules

---

## Topics Covered

1. What is State Management?
2. The Problem Vuex Solves
3. Installing and Setting Up Vuex
4. Store Structure (State, Getters, Mutations, Actions)
5. Accessing State in Components
6. Committing Mutations
7. Dispatching Actions
8. Vuex Modules
9. Best Practices

---

## What is State Management?

**Definition:** State management is the practice of managing application data (state) in a centralized, predictable way.

**State** refers to data that can change over time:
- User authentication status
- Shopping cart items
- Current theme preferences
- Fetched API data

---

## The Problem: Prop Drilling

**Without Vuex:**

```
┌─────────────┐
│   App.vue   │ ← userData
└──────┬──────┘
       │ :userData="userData"
┌──────▼──────┐
│  Header.vue │ ← receives but doesn't use
└──────┬──────┘
       │ :userData="userData"
┌──────▼──────┐
│ UserMenu.vue│ ← finally uses it!
└─────────────┘
```

Passing props through multiple layers is cumbersome!

---

## The Solution: Centralized Store

**With Vuex:**

```
┌─────────────┐
│ Vuex Store  │ ← Single source of truth
└──────┬──────┘
       │
   ┌───┴───┬──────────┬────────┐
   │       │          │        │
┌──▼──┐ ┌─▼───┐ ┌────▼───┐ ┌─▼────┐
│App  │ │Header│ │UserMenu│ │Cart  │
└─────┘ └──────┘ └────────┘ └──────┘
```

All components access the same store directly!

---

## Vuex Core Concepts

**Vuex consists of four main parts:**

1. **State:** The single source of truth (data)
2. **Getters:** Computed properties for the store
3. **Mutations:** Synchronous methods that change state
4. **Actions:** Asynchronous operations that commit mutations

**Analogy:** The store is like a **Central Pantry** in a restaurant where all chefs access the same ingredients.

---

## Installing Vuex

**Using npm:**

```bash
npm install vuex@next
```

**Note:** Use `@next` for Vue 3 compatibility.

**Verify installation:**
```bash
npm list vuex
```

---

## Creating a Vuex Store

**Create `src/store/index.js`:**

```javascript
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      count: 0,
      user: null
    }
  }
});

export default store;
```

---

## Registering the Store

**In `src/main.js`:**

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

const app = createApp(App);

app.use(store);
app.mount('#app');
```

Now `this.$store` is available in all components!

---

## State - Holding Data

**Definition:** State is where you store shared data that multiple components need to access.

```javascript
state() {
  return {
    count: 0,
    user: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    products: [],
    isAuthenticated: false
  }
}
```

---

## Accessing State in Components

**Using `this.$store.state`:**

```javascript
export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    userName() {
      return this.$store.state.user.name;
    }
  }
}
```

**Use computed properties** to access state reactively.

---

## Displaying State in Template

```html
<template>
  <div>
    <h2>Count: {{ count }}</h2>
    <p>User: {{ userName }}</p>
    <p>Products: {{ $store.state.products.length }}</p>
  </div>
</template>
```

You can access `$store` directly in templates.

---

## Getters - Computed Properties for Store

**Definition:** Getters are like computed properties but for the Vuex store. They derive values from state.

**Use cases:**
- Filter a list
- Calculate totals
- Format data
- Combine multiple state properties

---

## Defining Getters

```javascript
const store = createStore({
  state() {
    return {
      todos: [
        { id: 1, text: 'Learn Vue', done: true },
        { id: 2, text: 'Learn Vuex', done: false }
      ]
    }
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter(todo => todo.done);
    },
    doneTodosCount(state, getters) {
      return getters.doneTodos.length;
    }
  }
});
```

---

## Accessing Getters in Components

```javascript
export default {
  computed: {
    doneTodos() {
      return this.$store.getters.doneTodos;
    },
    doneTodosCount() {
      return this.$store.getters.doneTodosCount;
    }
  }
}
```

---

## Getters with Parameters

```javascript
getters: {
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id);
  }
}
```

**Usage in component:**
```javascript
computed: {
  todoById() {
    return this.$store.getters.getTodoById(2);
  }
}
```

---

## Mutations - Changing State

**Definition:** Mutations are the **only way** to change Vuex state. They must be synchronous.

**Rules:**
- Always synchronous
- Receive `state` as first argument
- Receive optional `payload` as second argument
- Change state directly

---

## Defining Mutations

```javascript
const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    incrementBy(state, payload) {
      state.count += payload;
    }
  }
});
```

---

## Committing Mutations

**Using `this.$store.commit()`:**

```javascript
export default {
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    incrementByTen() {
      this.$store.commit('incrementBy', 10);
    }
  }
}
```

---

## Mutations with Object Payload

```javascript
mutations: {
  setUser(state, payload) {
    state.user = {
      name: payload.name,
      email: payload.email,
      role: payload.role
    };
  }
}
```

**Commit with object:**
```javascript
this.$store.commit('setUser', {
  name: 'Jane',
  email: 'jane@example.com',
  role: 'admin'
});
```

---

## Why Mutations Must Be Synchronous

**Reason:** Vuex needs to track state changes for debugging and time-travel.

**Problem with async:**
```javascript
// ❌ WRONG - Don't do this!
mutations: {
  async fetchUser(state) {
    const user = await fetch('/api/user');
    state.user = user; // Timing unpredictable!
  }
}
```

Use **actions** for async operations instead.

---

## Actions - Asynchronous Operations

**Definition:** Actions handle asynchronous logic and commit mutations to change state.

**Actions can:**
- Perform API calls
- Set timeouts
- Commit multiple mutations
- Dispatch other actions

---

## Defining Actions

```javascript
const store = createStore({
  state() {
    return {
      user: null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    fetchUser(context) {
      fetch('https://api.example.com/user')
        .then(res => res.json())
        .then(data => {
          context.commit('setUser', data);
        });
    }
  }
});
```

---

## Action Context Object

**The `context` parameter provides:**

- `context.state` - access state
- `context.getters` - access getters
- `context.commit` - commit mutations
- `context.dispatch` - dispatch other actions

**Destructuring:**
```javascript
actions: {
  fetchUser({ commit, state }) {
    // Use commit and state directly
  }
}
```

---

## Dispatching Actions

**Using `this.$store.dispatch()`:**

```javascript
export default {
  methods: {
    loadUser() {
      this.$store.dispatch('fetchUser');
    }
  },
  mounted() {
    this.loadUser();
  }
}
```

---

## Actions with Payload

```javascript
actions: {
  fetchUserById({ commit }, userId) {
    fetch(`https://api.example.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        commit('setUser', data);
      });
  }
}
```

**Dispatch with payload:**
```javascript
this.$store.dispatch('fetchUserById', 123);
```

---

## Actions Returning Promises

```javascript
actions: {
  fetchUser({ commit }) {
    return fetch('https://api.example.com/user')
      .then(res => res.json())
      .then(data => {
        commit('setUser', data);
        return data;
      });
  }
}
```

**Handle in component:**
```javascript
this.$store.dispatch('fetchUser')
  .then(user => {
    console.log('User loaded:', user);
  });
```

---

## Complete Store Example - Shopping Cart

```javascript
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      cart: [],
      products: []
    }
  }
});

export default store;
```

---

## Shopping Cart - Getters

```javascript
getters: {
  cartTotal(state) {
    return state.cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  },
  
  cartItemCount(state) {
    return state.cart.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  }
}
```

---

## Shopping Cart - Mutations

```javascript
mutations: {
  addToCart(state, product) {
    const item = state.cart.find(
      i => i.id === product.id
    );
    
    if (item) {
      item.quantity++;
    } else {
      state.cart.push({
        ...product,
        quantity: 1
      });
    }
  }
}
```

---

## Shopping Cart - Remove Mutation

```javascript
mutations: {
  removeFromCart(state, productId) {
    state.cart = state.cart.filter(
      item => item.id !== productId
    );
  },
  
  clearCart(state) {
    state.cart = [];
  }
}
```

---

## Shopping Cart - Actions

```javascript
actions: {
  loadProducts({ commit }) {
    fetch('https://api.example.com/products')
      .then(res => res.json())
      .then(data => {
        commit('setProducts', data);
      });
  },
  
  checkout({ commit, state }) {
    return fetch('https://api.example.com/checkout', {
      method: 'POST',
      body: JSON.stringify(state.cart)
    })
    .then(() => {
      commit('clearCart');
    });
  }
}
```

---

## Using Cart in Component Template

```html
<template>
  <div class="cart">
    <h2>Shopping Cart</h2>
    <p>Items: {{ itemCount }}</p>
    <p>Total: ${{ total.toFixed(2) }}</p>
    
    <div v-for="item in cart" :key="item.id">
      <p>{{ item.name }} x {{ item.quantity }}</p>
      <button @click="remove(item.id)">
        Remove
      </button>
    </div>
  </div>
</template>
```

---

## Using Cart in Component Script

```javascript
export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.getters.cartTotal;
    },
    itemCount() {
      return this.$store.getters.cartItemCount;
    }
  },
  methods: {
    remove(id) {
      this.$store.commit('removeFromCart', id);
    }
  }
}
```

---

## mapState Helper

**Import from Vuex:**
```javascript
import { mapState } from 'vuex';
```

**Use in component:**
```javascript
export default {
  computed: {
    ...mapState(['count', 'user', 'cart']),
    // Equivalent to:
    // count() { return this.$store.state.count; }
    // user() { return this.$store.state.user; }
    // cart() { return this.$store.state.cart; }
  }
}
```

---

## mapGetters Helper

```javascript
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'doneTodos',
      'doneTodosCount',
      'cartTotal'
    ])
  }
}
```

---

## mapMutations Helper

```javascript
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'increment',
      'addToCart',
      'removeFromCart'
    ]),
    
    handleClick() {
      this.increment(); // Same as commit('increment')
    }
  }
}
```

---

## mapActions Helper

```javascript
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'fetchUser',
      'loadProducts',
      'checkout'
    ]),
    
    mounted() {
      this.fetchUser(); // Same as dispatch('fetchUser')
    }
  }
}
```

---

## Combining Map Helpers

```javascript
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['user', 'cart']),
    ...mapGetters(['cartTotal', 'itemCount'])
  },
  methods: {
    ...mapMutations(['addToCart']),
    ...mapActions(['checkout'])
  }
}
```

---

## Vuex Modules - Organizing Large Stores

**Problem:** As applications grow, a single store file becomes too large.

**Solution:** Split the store into **modules**, each with its own state, getters, mutations, and actions.

---

## Module Structure

```
src/
  store/
    index.js       ← Main store file
    modules/
      user.js      ← User module
      cart.js      ← Cart module
      products.js  ← Products module
```

---

## Creating a Module - user.js

```javascript
const userModule = {
  state() {
    return {
      currentUser: null,
      isAuthenticated: false
    }
  },
  mutations: {
    setUser(state, user) {
      state.currentUser = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
    }
  }
}

export default userModule;
```

---

## Creating a Module - cart.js

```javascript
const cartModule = {
  state() {
    return {
      items: []
    }
  },
  getters: {
    total(state) {
      return state.items.reduce(
        (sum, item) => sum + item.price, 0
      );
    }
  },
  mutations: {
    addItem(state, item) {
      state.items.push(item);
    }
  }
}

export default cartModule;
```

---

## Registering Modules

**In `src/store/index.js`:**

```javascript
import { createStore } from 'vuex';
import userModule from './modules/user';
import cartModule from './modules/cart';

const store = createStore({
  modules: {
    user: userModule,
    cart: cartModule
  }
});

export default store;
```

---

## Accessing Module State

```javascript
export default {
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    cartItems() {
      return this.$store.state.cart.items;
    }
  }
}
```

**Note:** Access via `state.moduleName.property`

---

## Accessing Module Getters

**By default, getters are registered globally:**

```javascript
computed: {
  cartTotal() {
    // Not state.cart.total!
    return this.$store.getters.total;
  }
}
```

---

## Namespaced Modules

**Problem:** Global registration can cause naming conflicts.

**Solution:** Use `namespaced: true`

```javascript
const userModule = {
  namespaced: true,
  state() {
    return {
      currentUser: null
    }
  },
  mutations: {
    setUser(state, user) {
      state.currentUser = user;
    }
  }
}
```

---

## Accessing Namespaced Modules

```javascript
export default {
  computed: {
    user() {
      return this.$store.state.user.currentUser;
    }
  },
  methods: {
    login(userData) {
      // Use module path
      this.$store.commit('user/setUser', userData);
    },
    fetchUser() {
      this.$store.dispatch('user/fetchUser');
    }
  }
}
```

---

## mapState with Modules

```javascript
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['currentUser', 'isAuthenticated']),
    ...mapState('cart', ['items'])
  }
}
```

First argument is the module name.

---

## Complete Application Flow

```
┌──────────────────────────────────┐
│  Component dispatches action     │
│  this.$store.dispatch('fetchUser')│
└───────────┬──────────────────────┘
            │
┌───────────▼──────────────────────┐
│  Action performs async work      │
│  fetch('/api/user')              │
└───────────┬──────────────────────┘
            │
┌───────────▼──────────────────────┐
│  Action commits mutation         │
│  commit('setUser', data)         │
└───────────┬──────────────────────┘
            │
┌───────────▼──────────────────────┐
│  Mutation changes state          │
│  state.user = data               │
└───────────┬──────────────────────┘
            │
┌───────────▼──────────────────────┐
│  Components react to change      │
│  Computed properties update      │
└──────────────────────────────────┘
```

---

## Vuex Data Flow Diagram

```
┌──────────┐
│  Vue     │
│Component │
└────┬─────┘
     │ Dispatch
     ▼
┌──────────┐
│ Actions  │
└────┬─────┘
     │ Commit
     ▼
┌──────────┐
│Mutations │
└────┬─────┘
     │ Mutate
     ▼
┌──────────┐
│  State   │
└────┬─────┘
     │ Render
     ▼
┌──────────┐
│  Vue     │
│Component │
└──────────┘
```

---

## When to Use Vuex

**✅ Use Vuex when:**
- Multiple components need the same data
- Components are deeply nested
- You need to track state changes
- Application state is complex

**❌ Don't use Vuex when:**
- Simple parent-child communication (use props)
- Only one component needs the data
- Small application with minimal shared state

---

## Best Practices

1. **Never mutate state outside mutations**
2. **Keep mutations simple and synchronous**
3. **Use actions for async operations**
4. **Use getters for derived state**
5. **Namespaced modules for organization**
6. **Use map helpers to reduce boilerplate**
7. **Keep business logic in actions, not components**

---

## Common Mistakes to Avoid

❌ Mutating state directly in components
❌ Async code in mutations
❌ Not using getters for derived state
❌ Forgetting to commit mutations from actions
❌ Not using namespaced modules in large apps
❌ Storing local component state in Vuex
❌ Not using map helpers when appropriate

---

## Debugging with Vue DevTools

**Vue DevTools features:**
- View current state
- Track mutations in real-time
- Time-travel debugging
- Export/import state

**Installation:**
Browser extension available for Chrome and Firefox.

---

## State Persistence

**Problem:** Vuex state is lost on page refresh.

**Solution:** Use `vuex-persistedstate` plugin.

```javascript
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  plugins: [createPersistedState()],
  // ... store config
});
```

Data is saved to localStorage automatically.

---

## Authentication Example - Store

```javascript
const store = createStore({
  state() {
    return {
      token: null,
      user: null
    }
  },
  mutations: {
    setAuth(state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
    }
  }
});
```

---

## Authentication Example - Actions

```javascript
actions: {
  login({ commit }, credentials) {
    return fetch('https://api.example.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    .then(res => res.json())
    .then(data => {
      commit('setAuth', {
        token: data.token,
        user: data.user
      });
      localStorage.setItem('token', data.token);
    });
  },
  
  logout({ commit }) {
    commit('clearAuth');
    localStorage.removeItem('token');
  }
}
```

---

## Authentication Example - Component

```javascript
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['user', 'token'])
  },
  methods: {
    ...mapActions(['login', 'logout']),
    
    handleLogin() {
      this.login({
        username: this.username,
        password: this.password
      });
    }
  }
}
```

---

## Vuex vs Props/Events

**Props and Events:**
```
Parent → (props) → Child
Child → ($emit) → Parent
```

**Vuex:**
```
Component ↔ Store ↔ Component
```

**Use props/events** for simple parent-child.
**Use Vuex** for complex shared state.

---

## Real-World Example - Todo App

```javascript
const store = createStore({
  state() {
    return {
      todos: []
    }
  },
  getters: {
    completedTodos(state) {
      return state.todos.filter(t => t.completed);
    },
    activeTodos(state) {
      return state.todos.filter(t => !t.completed);
    }
  }
});
```

---

## Todo App - Mutations

```javascript
mutations: {
  addTodo(state, text) {
    state.todos.push({
      id: Date.now(),
      text: text,
      completed: false
    });
  },
  toggleTodo(state, id) {
    const todo = state.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  },
  removeTodo(state, id) {
    state.todos = state.todos.filter(
      t => t.id !== id
    );
  }
}
```

---

## Todo App - Actions

```javascript
actions: {
  loadTodos({ commit }) {
    fetch('https://api.example.com/todos')
      .then(res => res.json())
      .then(data => {
        data.forEach(todo => {
          commit('addTodo', todo.text);
        });
      });
  },
  
  saveTodos({ state }) {
    fetch('https://api.example.com/todos', {
      method: 'POST',
      body: JSON.stringify(state.todos)
    });
  }
}
```

---

## Todo Component Template

```html
<template>
  <div>
    <input v-model="newTodo" 
           @keyup.enter="add">
    
    <div v-for="todo in todos" :key="todo.id">
      <input type="checkbox"
             :checked="todo.completed"
             @change="toggle(todo.id)">
      <span>{{ todo.text }}</span>
      <button @click="remove(todo.id)">×</button>
    </div>
  </div>
</template>
```

---

## Todo Component Script

```javascript
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      newTodo: ''
    }
  },
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    ...mapMutations([
      'addTodo',
      'toggleTodo',
      'removeTodo'
    ]),
    add() {
      if (this.newTodo.trim()) {
        this.addTodo(this.newTodo);
        this.newTodo = '';
      }
    },
    toggle(id) {
      this.toggleTodo(id);
    },
    remove(id) {
      this.removeTodo(id);
    }
  }
}
```

---

## Advanced: Dynamic Module Registration

**Register modules at runtime:**

```javascript
// Register module
this.$store.registerModule('newModule', {
  state() {
    return { data: [] }
  }
});

// Unregister module
this.$store.unregisterModule('newModule');
```

Useful for code-splitting and lazy-loading.

---

## Testing Vuex Stores

**Test mutations:**
```javascript
import { mutations } from './store';

test('increment', () => {
  const state = { count: 0 };
  mutations.increment(state);
  expect(state.count).toBe(1);
});
```

**Test getters:**
```javascript
import { getters } from './store';

test('doneTodos', () => {
  const state = { todos: [
    { done: true },
    { done: false }
  ]};
  expect(getters.doneTodos(state).length).toBe(1);
});
```

---

## Performance Considerations

**Avoid:**
- Storing large objects unnecessarily
- Deep nesting in state
- Computing expensive values in getters without caching

**Do:**
- Use getters for derived state
- Normalize deeply nested data
- Keep state minimal
- Use modules to split large stores

---

## Migration from Options API to Composition API

**Options API (current):**
```javascript
computed: {
  user() {
    return this.$store.state.user;
  }
}
```

**Composition API:**
```javascript
import { useStore } from 'vuex';
const store = useStore();
const user = computed(() => store.state.user);
```

---

## Summary

**Key Concepts:**
- Vuex provides centralized state management
- State holds data, accessed via `this.$store.state`
- Getters are computed properties for the store
- Mutations change state synchronously
- Actions handle async operations and commit mutations
- Modules organize large applications
- Map helpers reduce boilerplate code

---

## Vuex Architecture Summary

```
┌────────────────────────────────────┐
│           Vuex Store               │
│  ┌──────────────────────────────┐  │
│  │ State (Single Source of Truth)│ │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ Getters (Computed Properties)│  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ Mutations (Sync State Change)│  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ Actions (Async Operations)   │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

---

## Additional Resources

**Documentation:**
- Official Vuex 4 Documentation
- Vue.js Guide on State Management
- Vuex Best Practices

**Tools:**
- Vue DevTools (browser extension)
- vuex-persistedstate (persistence plugin)

**Practice:**
Build a complete application using Vuex with modules, actions, and persistence.

---

## Course Conclusion

**Congratulations!**

You've learned:
- HTML, CSS, and JavaScript fundamentals
- Vue.js framework and directives
- Components and routing
- API integration and pagination
- Authentication and CRUD operations
- Centralized state management with Vuex

**You're now ready to build modern, scalable web applications!**
