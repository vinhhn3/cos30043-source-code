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

# Week 9
## API 2 and Pagination

**COS30043 - Interface Design and Development**

---

# Introduction

Welcome to Week 9!

This week, we'll explore:
- Advanced API techniques
- Client-side pagination concepts
- vuejs-paginate-next component
- Pagination logic and implementation
- Managing large datasets efficiently

---

# Learning Outcomes

By the end of this week, you will be able to:

1. Implement client-side pagination
2. Use the vuejs-paginate-next component
3. Configure pagination with page-count and page-range
4. Handle page changes with click handlers
5. Use computed properties for pagination logic
6. Manage large datasets efficiently in SPAs

---

# What is Pagination?

**Pagination** divides large datasets into smaller pages.

**Why use pagination?**
- Improves performance
- Better user experience
- Reduces initial load time
- Easier navigation
- Mobile-friendly

---

# Pagination Types

**Server-Side Pagination:**
- Server returns only one page of data
- Requires API call for each page
- Better for very large datasets

**Client-Side Pagination:**
- Fetch all data once
- Split into pages on client
- No API calls when changing pages
- **Focus of this week**

---

# Client-Side Pagination Overview

```
┌──────────────────────────────────┐
│  Fetch all data from API         │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Store in component data array   │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Computed property slices array  │
│  based on current page           │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Display only current page items │
└──────────────────────────────────┘
```

---

# vuejs-paginate-next

**vuejs-paginate-next** is a Vue 3 pagination component.

**Features:**
- Easy to integrate
- Customizable styling
- Page range configuration
- Event handling
- Accessible

---

# Installing vuejs-paginate-next

```bash
npm install vuejs-paginate-next
```

---

# Importing the Component

```vue
<script>
import Paginate from 'vuejs-paginate-next'

export default {
  components: {
    Paginate
  }
}
</script>
```

---

# Basic Pagination Setup: Data

```vue
<script>
export default {
  data() {
    return {
      items: [],
      currentPage: 1,
      perPage: 10
    }
  }
}
</script>
```

---

# Pagination Logic: Computed Properties

```vue
<script>
export default {
  computed: {
    pageCount() {
      return Math.ceil(this.items.length / this.perPage)
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.items.slice(start, end)
    }
  }
}
</script>
```

---

# Understanding slice()

The `slice()` method extracts a portion of an array:

```javascript
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const perPage = 3

// Page 1: items 0-2
items.slice(0, 3)  // [1, 2, 3]

// Page 2: items 3-5
items.slice(3, 6)  // [4, 5, 6]

// Page 3: items 6-8
items.slice(6, 9)  // [7, 8, 9]
```

---

# Calculating Start and End Indices

```javascript
const currentPage = 2
const perPage = 10

// Start index = (page - 1) × items per page
const start = (2 - 1) * 10  // 10

// End index = start + items per page
const end = 10 + 10  // 20

// Get items 10-19 for page 2
items.slice(10, 20)
```

---

# Page Click Handler

```vue
<script>
export default {
  methods: {
    handlePageChange(page) {
      this.currentPage = page
    }
  }
}
</script>
```

The handler updates `currentPage`, triggering computed property updates.

---

# Template: Display Items

```vue
<template>
  <div>
    <div v-for="item in paginatedItems" :key="item.id">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>
```

Display only the items for the current page.

---

# Template: Paginate Component

```vue
<template>
  <Paginate
    :page-count="pageCount"
    :page-range="5"
    :click-handler="handlePageChange"
    :prev-text="'Previous'"
    :next-text="'Next'"
  />
</template>
```

---

# Key Props: page-count

**`page-count`** - Total number of pages

```javascript
computed: {
  pageCount() {
    return Math.ceil(this.items.length / this.perPage)
  }
}
```

Example: 95 items ÷ 10 per page = 10 pages

---

# Key Props: page-range

**`page-range`** - Number of visible page links

```vue
<Paginate :page-range="5" />
```

Shows 5 page numbers at a time:
```
< 1 2 3 4 5 >
< 3 4 5 6 7 >
```

---

# Key Props: click-handler

**`click-handler`** - Function called when page changes

```vue
<Paginate :click-handler="handlePageChange" />
```

```javascript
methods: {
  handlePageChange(pageNum) {
    this.currentPage = pageNum
    // Optional: scroll to top
    window.scrollTo(0, 0)
  }
}
```

---

# Complete Example: Users List (Template)

```vue
<template>
  <div class="users-list">
    <h1>Users Directory</h1>

    <div v-for="user in paginatedUsers" :key="user.id">
      <div class="user-card">
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
        <p>City: {{ user.city }}</p>
      </div>
    </div>

    <Paginate
      :page-count="pageCount"
      :page-range="5"
      :click-handler="handlePageChange"
    />
  </div>
</template>
```

---

# Complete Example: Users List (Script - Data)

```vue
<script>
import Paginate from 'vuejs-paginate-next'

export default {
  components: {
    Paginate
  },
  data() {
    return {
      users: [],
      currentPage: 1,
      perPage: 10
    }
  },
```

---

# Complete Example: Users List (Script - Computed)

```vue
  computed: {
    pageCount() {
      return Math.ceil(this.users.length / this.perPage)
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.users.slice(start, end)
    }
  },
```

---

# Complete Example: Users List (Script - Methods)

```vue
  methods: {
    handlePageChange(page) {
      this.currentPage = page
      window.scrollTo(0, 0)
    },
    async fetchUsers() {
      const response = await fetch('https://api.example.com/users')
      this.users = await response.json()
    }
  },
  mounted() {
    this.fetchUsers()
  }
}
</script>
```

---

# Pagination with Filtering

```vue
<script>
export default {
  data() {
    return {
      allItems: [],
      searchQuery: '',
      currentPage: 1,
      perPage: 10
    }
  },
  computed: {
    filteredItems() {
      return this.allItems.filter(item => {
        return item.name.toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      })
    },
```

---

# Pagination with Filtering (Continued)

```vue
    pageCount() {
      return Math.ceil(this.filteredItems.length / this.perPage)
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.filteredItems.slice(start, end)
    }
  }
}
</script>
```

---

# Reset Page on Filter Change

```vue
<script>
export default {
  watch: {
    searchQuery() {
      this.currentPage = 1
    }
  }
}
</script>
```

When search changes, reset to page 1.

---

# Pagination with Sorting

```vue
<script>
export default {
  data() {
    return {
      items: [],
      sortBy: 'name',
      sortOrder: 'asc'
    }
  },
  computed: {
    sortedItems() {
      return [...this.items].sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a[this.sortBy] > b[this.sortBy] ? 1 : -1
        } else {
          return a[this.sortBy] < b[this.sortBy] ? 1 : -1
        }
      })
    }
  }
}
</script>
```

---

# Customizing Paginate Styling

```vue
<style>
.pagination {
  display: flex;
  list-style: none;
  gap: 5px;
}

.page-item {
  padding: 8px 12px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.page-item.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.page-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

---

# Container Classes

```vue
<Paginate
  :page-count="pageCount"
  :click-handler="handlePageChange"
  :container-class="'pagination'"
  :page-class="'page-item'"
  :active-class="'active'"
  :disabled-class="'disabled'"
/>
```

---

# Prev/Next Button Customization

```vue
<Paginate
  :page-count="pageCount"
  :click-handler="handlePageChange"
  :prev-text="'← Previous'"
  :next-text="'Next →'"
  :hide-prev-next="false"
/>
```

---

# Break View for Large Page Counts

```vue
<Paginate
  :page-count="100"
  :page-range="3"
  :margin-pages="2"
  :click-handler="handlePageChange"
  :break-view-text="'...'"
/>
```

Displays: `1 2 ... 48 49 50 ... 99 100`

---

# Items Per Page Selector

```vue
<template>
  <div>
    <label>Items per page:</label>
    <select v-model.number="perPage" @change="resetPage">
      <option :value="10">10</option>
      <option :value="25">25</option>
      <option :value="50">50</option>
    </select>
  </div>
</template>

<script>
export default {
  methods: {
    resetPage() {
      this.currentPage = 1
    }
  }
}
</script>
```

---

# Showing Current Range

```vue
<template>
  <p>
    Showing {{ startIndex + 1 }} to {{ endIndex }}
    of {{ totalItems }} items
  </p>
</template>

<script>
export default {
  computed: {
    startIndex() {
      return (this.currentPage - 1) * this.perPage
    },
    endIndex() {
      return Math.min(this.startIndex + this.perPage, this.totalItems)
    },
    totalItems() {
      return this.items.length
    }
  }
}
</script>
```

---

# Performance Optimization

**Best Practices:**

1. **Use computed properties** - Automatic caching
2. **Avoid watchers** - Computed is more efficient
3. **Virtual scrolling** - For very large datasets
4. **Debounce search** - Reduce filter calculations

---

# Loading State

```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="item in paginatedItems" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  async mounted() {
    this.loading = true
    await this.fetchData()
    this.loading = false
  }
}
</script>
```

---

# Empty State Handling

```vue
<template>
  <div>
    <div v-if="paginatedItems.length === 0">
      <p>No items found.</p>
    </div>
    <div v-else>
      <div v-for="item in paginatedItems" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
```

---

# URL Query Parameters

```vue
<script>
export default {
  methods: {
    handlePageChange(page) {
      this.currentPage = page
      this.$router.push({ query: { page } })
    }
  },
  mounted() {
    const page = parseInt(this.$route.query.page) || 1
    this.currentPage = page
  }
}
</script>
```

Allows bookmarking specific pages.

---

# Common Patterns: Product List

```vue
<script>
export default {
  data() {
    return {
      products: [],
      category: 'all',
      currentPage: 1,
      perPage: 12
    }
  },
  computed: {
    filteredProducts() {
      if (this.category === 'all') {
        return this.products
      }
      return this.products.filter(p => p.category === this.category)
    }
  }
}
</script>
```

---

# Best Practices

1. **Reset to page 1** when filters change
2. **Show total count** - Help users understand dataset size
3. **Preserve page state** - Use URL parameters
4. **Handle edge cases** - Empty results, single page
5. **Loading indicators** - Show when fetching data
6. **Responsive design** - Fewer buttons on mobile

---

# Pagination Math Formulas

```javascript
// Total pages
Math.ceil(totalItems / itemsPerPage)

// Start index
(currentPage - 1) * itemsPerPage

// End index
startIndex + itemsPerPage

// Is last page?
currentPage === pageCount

// Is first page?
currentPage === 1
```

---

# Debugging Pagination

```javascript
computed: {
  paginatedItems() {
    console.log('Current page:', this.currentPage)
    console.log('Items per page:', this.perPage)
    
    const start = (this.currentPage - 1) * this.perPage
    const end = start + this.perPage
    
    console.log('Start:', start, 'End:', end)
    console.log('Total items:', this.items.length)
    
    return this.items.slice(start, end)
  }
}
```

---

# Alternative: Simple Pagination

Without library:

```vue
<template>
  <div>
    <button @click="prevPage" :disabled="currentPage === 1">
      Previous
    </button>
    
    <span>Page {{ currentPage }} of {{ pageCount }}</span>
    
    <button @click="nextPage" :disabled="currentPage === pageCount">
      Next
    </button>
  </div>
</template>
```

---

# Simple Pagination: Methods

```vue
<script>
export default {
  methods: {
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    }
  }
}
</script>
```

---

# Server-Side Pagination Preview

```vue
<script>
export default {
  methods: {
    async fetchPage(page) {
      const response = await fetch(
        `https://api.example.com/items?page=${page}&limit=10`
      )
      const data = await response.json()
      this.items = data.items
      this.totalPages = data.totalPages
    }
  }
}
</script>
```

**Week 10 will cover this in detail!**

---

# Summary

**Key Concepts:**
- Client-side pagination splits data on the client
- vuejs-paginate-next provides pagination UI
- `slice()` method extracts page items
- Computed properties calculate pages automatically
- `page-count`, `page-range`, `click-handler` are key props

---

# Pagination Workflow

```
┌────────────────────────────────┐
│  User clicks page number       │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│  click-handler updates         │
│  currentPage                   │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│  Computed property recalculates│
│  using new currentPage         │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│  Template displays new items   │
└────────────────────────────────┘
```

---

# Conclusion

**This week you learned:**
- Client-side pagination concepts
- Installing and using vuejs-paginate-next
- Configuring pagination with key props
- Using `slice()` for pagination logic
- Computed properties for page calculations
- Combining pagination with filtering and sorting

**Next week:** Single Page Applications Deep Dive

---

<!-- _paginate: false -->

# Questions?

**Practice implementing pagination on large datasets!**

Remember:
```javascript
const start = (currentPage - 1) * perPage
const end = start + perPage
return items.slice(start, end)
```

**Happy coding!**
