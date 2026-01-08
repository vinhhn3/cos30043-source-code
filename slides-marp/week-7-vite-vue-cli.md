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

# Week 7

## Vite and Vue CLI

**COS30043 - Interface Design and Development**

---

# Introduction

Welcome to Week 7!

This week, we'll explore:

- Single File Components (SFC) in depth
- Vite build tool
- Vue CLI utility
- Project structure and organization
- Building and deployment

---

# Learning Outcomes

By the end of this week, you will be able to:

1. Understand Single File Component structure
2. Use Vite for fast development
3. Scaffold projects with Vue CLI
4. Navigate Vue project folder structure
5. Build projects for production deployment
6. Deploy Vue applications

---

# What are Single File Components?

**Single File Components (SFC)** encapsulate everything in one `.vue` file:

- **`<template>`** - HTML structure
- **`<script>`** - JavaScript logic
- **`<style>`** - CSS styling

**Benefits:** Organization, reusability, and maintainability

---

# SFC Structure

```vue
<template>
  <!-- HTML template goes here -->
</template>

<script>
export default {
  // JavaScript logic goes here
}
</script>

<style>
/* CSS styles go here */
</style>
```

All three sections in one file!

---

# SFC Anatomy: Template Section

```vue
<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
    <button @click="sendMessage">Contact</button>
  </div>
</template>
```

**Purpose:** Define the HTML structure
**Rules:** Must have one root element (Vue 2) or multiple (Vue 3)

---

# SFC Anatomy: Script Section

```vue
<script>
export default {
  name: 'UserCard',
  props: {
    user: Object
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage() {
      console.log('Sending message to', this.user.name)
    }
  }
}
</script>
```

---

# SFC Anatomy: Style Section

```vue
<style scoped>
.user-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
}

h2 {
  color: #42b983;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

---

# Scoped Styles

**`<style scoped>`** applies styles only to this component.

**How it works:**

- Vue adds unique attributes to elements
- CSS selectors include these attributes
- Prevents style conflicts

```vue
<!-- Without scoped: affects all h2 elements -->
<style>
h2 { color: red; }
</style>

<!-- With scoped: only this component's h2 -->
<style scoped>
h2 { color: red; }
</style>
```

---

# Global Styles

```vue
<style>
/* Global styles (no scoped) */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
/* Scoped styles */
.component-specific {
  color: blue;
}
</style>
```

You can have both in the same component!

---

# What is Vite?

**Vite** is a modern build tool for faster development.

**Key Features:**

- Lightning-fast cold start
- Instant Hot Module Replacement (HMR)
- Optimized production builds
- Native ES modules support
- TypeScript support out-of-the-box

**Pronunciation:** "veet" (French for "fast")

---

# Why Vite?

**Traditional build tools (Webpack):**

- Bundle entire app before serving
- Slow cold start on large projects
- Slower HMR

**Vite:**

- Serves code via native ES modules
- Only bundles changed modules
- Near-instant server start
- Faster HMR updates

---

# Vite vs Traditional Bundlers

```
Traditional Bundler:
┌─────────────────────────────┐
│ 1. Bundle ALL files         │
│ 2. Start dev server         │
│ 3. Serve bundled app        │
│    ⏱️ Minutes for large apps │
└─────────────────────────────┘

Vite:
┌─────────────────────────────┐
│ 1. Start dev server         │
│ 2. Serve on demand          │
│ 3. Bundle only what's needed│
│    ⏱️ Seconds                │
└─────────────────────────────┘
```

---

# Creating a Vite Project

```bash
npm create vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
npm run dev
```

**Steps:**

1. Create project with template
2. Navigate to project folder
3. Install dependencies
4. Start development server

---

# Vite Project Structure

```
my-vue-app/
├── node_modules/       # Dependencies
├── public/             # Static assets
│   └── favicon.ico
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Vue components
│   ├── App.vue         # Root component
│   └── main.js         # Entry point
├── index.html          # HTML entry
├── package.json        # Project config
└── vite.config.js      # Vite config
```

---

# Understanding node_modules/

**Purpose:** Contains all installed packages and dependencies

**Characteristics:**

- Created by `npm install`
- Can be very large (hundreds of MB)
- Should be in `.gitignore`
- Can be regenerated anytime

**Never edit files here!** Use `package.json` to manage dependencies.

---

# Understanding public/

**Purpose:** Static assets served as-is

**Contents:**

- `favicon.ico`
- Images that don't need processing
- `robots.txt`
- Other static files

**Access:** `http://localhost:5173/filename.ext`

**Note:** Files here are NOT processed by Vite

---

# Understanding src/

**Purpose:** Application source code

**Key folders:**

- `assets/` - Images, CSS, fonts (processed by Vite)
- `components/` - Vue components
- `router/` - Vue Router configuration (if using)
- `views/` - Page components (if using router)

**Key files:**

- `App.vue` - Root component
- `main.js` - Application entry point

---

# main.js - Entry Point

```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

**Responsibilities:**

1. Import Vue's `createApp` function
2. Import global styles
3. Import root component
4. Create and mount the app

---

# main.js with Router

```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

Plugins are added before mounting!

---

# index.html - HTML Entry

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

---

# package.json - Project Configuration

```json
{
  "name": "my-vue-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

---

# package.json - Scripts

**Available npm scripts:**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

**Custom scripts can be added:**

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest"
}
```

---

# vite.config.js - Vite Configuration

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
})
```

Configure Vite behavior here!

---

# Development Server

**Starting the server:**

```bash
npm run dev
```

**Output:**

```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

**Features:** Hot Module Replacement, instant updates

---

# Hot Module Replacement (HMR)

**What is HMR?**
Updates modules in the browser without full reload

**Benefits:**

- Preserves application state
- Instant feedback on changes
- Better development experience

**How it works:** Vite injects updated modules, Vue re-renders affected components

---

# What is Vue CLI?

**Vue CLI** is a command-line tool for scaffolding Vue projects.

**Features:**

- Interactive project creation
- Plugin system
- Configuration presets
- GUI for project management

**Note:** Vue CLI uses Webpack, Vite is now preferred for new projects

---

# Vue CLI vs Vite

| Aspect | Vue CLI | Vite |
|--------|---------|------|
| **Bundler** | Webpack | esbuild/Rollup |
| **Speed** | Slower | Faster |
| **HMR** | Good | Excellent |
| **Config** | More complex | Simpler |
| **Use Case** | Legacy projects | New projects |

**Recommendation:** Use Vite for new projects

---

# Installing Vue CLI

```bash
npm install -g @vue/cli
```

**Check version:**

```bash
vue --version
```

**Create project:**

```bash
vue create my-app
cd my-app
npm run serve
```

---

# Vue CLI Project Structure

```
my-app/
├── node_modules/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.vue
│   └── main.js
├── .gitignore
├── babel.config.js
├── package.json
└── README.md
```

Similar to Vite, but with different config files

---

# Importing Components

```vue
<script>
// Relative import
import UserCard from './components/UserCard.vue'
import TodoList from '@/components/TodoList.vue'  // @ = src/

export default {
  components: {
    UserCard,
    TodoList
  }
}
</script>
```

**`@/`** is an alias for `src/` directory

---

# Importing Assets

```vue
<script>
import logo from '@/assets/logo.png'

export default {
  data() {
    return {
      logoUrl: logo
    }
  }
}
</script>

<template>
  <img :src="logoUrl" alt="Logo">
</template>
```

Vite processes and optimizes imported assets

---

# CSS Preprocessing

Vite supports CSS preprocessors out-of-the-box:

```vue
<style lang="scss" scoped>
$primary-color: #42b983;

.user-card {
  h2 {
    color: $primary-color;
  }

  .button {
    background: darken($primary-color, 10%);
  }
}
</style>
```

**Install:** `npm install -D sass`

---

# Building for Production

**Command:**

```bash
npm run build
```

**What happens:**

1. Vite optimizes all code
2. Minifies JavaScript and CSS
3. Optimizes images
4. Generates hashed filenames
5. Creates `dist/` folder

---

# The dist/ Folder

```
dist/
├── assets/
│   ├── index-a1b2c3d4.js
│   ├── index-e5f6g7h8.css
│   └── logo-i9j0k1l2.png
├── favicon.ico
└── index.html
```

**Contents:**

- Production-ready files
- Optimized and minified
- Ready to deploy

---

# Build Output Analysis

```bash
npm run build
```

**Output:**

```
vite v5.0.0 building for production...
✓ 42 modules transformed.
dist/index.html                   0.45 kB
dist/assets/index-a1b2c3.js      50.23 kB │ gzip: 20.45 kB
dist/assets/index-e5f6g7.css      5.12 kB │ gzip:  2.34 kB
✓ built in 2.34s
```

Shows file sizes and gzip compression

---

# Preview Production Build

**Command:**

```bash
npm run preview
```

**Purpose:**

- Test production build locally
- Verify optimization
- Check for issues before deployment

**URL:** `http://localhost:4173/`

---

# Deployment Preparation

**Steps before deployment:**

1. Update `package.json` metadata
2. Configure base URL if needed
3. Set environment variables
4. Build for production
5. Test the build locally

---

# Setting Base URL

If deploying to a subdirectory:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [vue()],
  base: '/my-app/'  // for example.com/my-app/
})
```

For root domain, use `base: '/'` (default)

---

# Environment Variables

Create `.env` files:

```
# .env.development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_API_URL=https://api.example.com
```

**Access in code:**

```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

**Note:** Must start with `VITE_`

---

# Using Environment Variables

```vue
<script>
export default {
  data() {
    return {
      apiUrl: import.meta.env.VITE_API_URL
    }
  },
  methods: {
    async fetchData() {
      const response = await fetch(`${this.apiUrl}/users`)
      return response.json()
    }
  }
}
</script>
```

---

# Deployment Options

**Static Hosting:**

- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

**Requirements:**

- Upload `dist/` folder contents
- Configure redirects for SPA routing

---

# Deploying to Netlify

**Steps:**

1. Build project: `npm run build`
2. Sign up at netlify.com
3. Drag `dist/` folder to Netlify
4. Configure redirects

**Redirects file** (`public/_redirects`):

```
/*    /index.html   200
```

---

# Deploying to Vercel

**Steps:**

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Deploy: `vercel --prod`

**vercel.json:**

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

# Deploying to GitHub Pages

**Steps:**

1. Update `vite.config.js`:

```javascript
base: '/repository-name/'
```

1. Build: `npm run build`

2. Push `dist/` to `gh-pages` branch:

```bash
git subtree push --prefix dist origin gh-pages
```

---

# Project Organization Best Practices

```
src/
├── assets/          # Images, fonts, global CSS
├── components/      # Reusable components
│   ├── common/      # Shared UI components
│   └── features/    # Feature-specific components
├── router/          # Router configuration
├── views/           # Page components
├── utils/           # Helper functions
├── App.vue
└── main.js
```

---

# Component Organization

```
components/
├── common/
│   ├── BaseButton.vue
│   ├── BaseInput.vue
│   └── BaseCard.vue
├── user/
│   ├── UserProfile.vue
│   ├── UserCard.vue
│   └── UserList.vue
└── admin/
    ├── AdminDashboard.vue
    └── AdminPanel.vue
```

Group by feature or type

---

# Naming Conventions

**Components:**

- PascalCase: `UserCard.vue`, `TodoList.vue`
- Descriptive: `UserProfileCard.vue` not `Card.vue`
- Base components: `BaseButton.vue`, `BaseInput.vue`

**Files:**

- Lowercase with dashes: `user-utils.js`
- Camelcase for JS: `userService.js`

---

# Import Organization

```vue
<script>
// 1. External libraries
import { ref, computed } from 'vue'
import axios from 'axios'

// 2. Local components
import UserCard from '@/components/UserCard.vue'
import TodoList from '@/components/TodoList.vue'

// 3. Utilities and helpers
import { formatDate } from '@/utils/date.js'

export default {
  components: { UserCard, TodoList }
}
</script>
```

---

# Code Splitting

**Lazy load routes:**

```javascript
const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue')
  }
]
```

Creates separate chunks for each route

---

# Performance Optimization

**Tips:**

1. **Lazy load routes** - Split code by route
2. **Optimize images** - Use WebP, compress
3. **Tree shaking** - Remove unused code
4. **Minification** - Done automatically
5. **Caching** - Hashed filenames for cache busting

---

# Build Optimization

```javascript
// vite.config.js
export default defineConfig({
  build: {
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router']
        }
      }
    }
  }
})
```

---

# Debugging Production Builds

**Enable source maps:**

```javascript
// vite.config.js
export default defineConfig({
  build: {
    sourcemap: true
  }
})
```

**Warning:** Don't deploy source maps to production!

---

# Common Build Issues

**Issue:** Module not found
**Solution:** Check import paths, use `@/` alias

**Issue:** Assets not loading
**Solution:** Use `import` or `/public/` directory

**Issue:** 404 on routes
**Solution:** Configure server redirects for SPA

**Issue:** Environment variables not working
**Solution:** Ensure they start with `VITE_`

---

# Development Workflow

```
┌──────────────────────────────┐
│  1. npm run dev              │
│     Start development        │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│  2. Write code               │
│     HMR updates instantly    │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│  3. npm run build            │
│     Build for production     │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│  4. npm run preview          │
│     Test production build    │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│  5. Deploy dist/ folder      │
└──────────────────────────────┘
```

---

# Best Practices Summary

1. **Use Vite** for new projects
2. **Organize code** by feature
3. **Use scoped styles** to avoid conflicts
4. **Lazy load routes** for better performance
5. **Environment variables** for configuration
6. **Test production builds** before deployment
7. **Optimize assets** for production

---

# Conclusion

**This week you learned:**

- Single File Components structure and benefits
- Vite for fast modern development
- Vue CLI for project scaffolding
- Project folder structure and organization
- Building and deploying for production
- Best practices for project management

**Next week:** Application Programming Interface (API) 1

---

<!-- _paginate: false -->

# Questions?

**Practice building and deploying a complete Vue application!**

Remember:

```
dev → build → preview → deploy
```

**Happy coding!**
