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

# Week 6

## Forms and Validation

**COS30043 - Interface Design and Development**

---

# Introduction

Welcome to Week 6!

This week, we'll explore:

- HTML5 form validation attributes
- VueJS custom validation logic
- Form handling with `checkForm` methods
- Vuetify UI framework
- Material Design form components

---

# Learning Outcomes

By the end of this week, you will be able to:

1. Implement HTML5 form validation attributes
2. Create custom validation logic with VueJS
3. Handle form submission with Vue methods
4. Use Vuetify's Material Design components
5. Implement v-form with rules-based validation
6. Build robust, user-friendly forms

---

# Why Form Validation?

**Purpose:**

- Ensure data quality and integrity
- Improve user experience with immediate feedback
- Prevent invalid data submission
- Reduce server-side errors
- Guide users to correct inputs

**Two Approaches:** HTML5 and VueJS

---

# Validation Methods Overview

```
┌────────────────────────────────────┐
│       HTML5 Validation             │
│  - Browser-native                  │
│  - Attributes: required, pattern   │
│  - Quick to implement              │
│  - Limited customization           │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│       VueJS Validation             │
│  - Custom logic                    │
│  - Full control                    │
│  - Better UX                       │
│  - More flexible                   │
└────────────────────────────────────┘
```

---

# HTML5 Validation Attributes

**Common attributes:**

- **`required`** - Field must be filled
- **`type`** - Validates input type (email, url, number)
- **`min` / `max`** - Number/date range
- **`minlength` / `maxlength`** - String length
- **`pattern`** - Regular expression validation

---

# HTML5: required Attribute

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="index.css">
  <title>Required Field</title>
</head>
<body>
  <form>
    <label>Username:</label>
    <input type="text" required>
    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

Browser shows error if empty on submit!

---

# HTML5: type Attribute

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="index.css">
  <title>Type Validation</title>
</head>
<body>
  <form>
    <input type="email" placeholder="Email" required>
    <input type="url" placeholder="Website" required>
    <input type="number" placeholder="Age" required>
    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

---

# HTML5: min and max

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="index.css">
  <title>Range Validation</title>
</head>
<body>
  <form>
    <label>Age (18-100):</label>
    <input type="number" min="18" max="100" required>

    <label>Date of Birth:</label>
    <input type="date" max="2008-01-01" required>

    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

---

# HTML5: pattern Attribute

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="index.css">
  <title>Pattern Validation</title>
</head>
<body>
  <form>
    <label>Phone (XXX-XXX-XXXX):</label>
    <input type="tel"
           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
           placeholder="123-456-7890"
           required>
    <button type="submit">Submit</button>
  </form>
</body>
</html>
```

---

# HTML5: Styling with CSS

```css
/* index.css */
input:valid {
  border: 2px solid green;
}

input:invalid {
  border: 2px solid red;
}

input:required {
  background-color: #fffde7;
}
```

Visual feedback for validation state!

---

# HTML5 Validation: Limitations

**Drawbacks:**

- Limited customization of error messages
- Browser-dependent styling
- Less control over validation logic
- Cannot validate across multiple fields
- No custom validation rules

**Solution:** Use VueJS for full control!

---

# VueJS Validation: Overview

**Approach:**

1. Use `novalidate` attribute on `<form>`
2. Disable browser validation
3. Handle validation in Vue methods
4. Use `e.preventDefault()` to stop submission
5. Display custom error messages

---

# VueJS Validation: Template

```vue
<template>
  <form @submit="checkForm" novalidate>
    <div>
      <label>Email:</label>
      <input v-model="email" type="email">
      <p v-if="errors.email" class="error">
        {{ errors.email }}
      </p>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
```

**`novalidate`** - Disables browser validation!

---

# VueJS Validation: Script (data)

```vue
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: null,
        password: null
      }
    }
  },
```

---

# VueJS Validation: Script (checkForm)

```vue
  methods: {
    checkForm(e) {
      e.preventDefault()

      // Clear previous errors
      this.errors = { email: null, password: null }

      // Validate email
      if (!this.email) {
        this.errors.email = 'Email is required'
        return
      }

      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(this.email)) {
        this.errors.email = 'Invalid email format'
        return
      }

      // If valid, submit form
      this.submitForm()
    }
  }
}
</script>
```

---

# Complete VueJS Form Example: Template

```vue
<template>
  <form @submit="checkForm" novalidate>
    <div>
      <label>Username:</label>
      <input v-model="username" type="text">
      <p v-if="errors.username" class="error">
        {{ errors.username }}
      </p>
    </div>

    <div>
      <label>Email:</label>
      <input v-model="email" type="email">
      <p v-if="errors.email" class="error">
        {{ errors.email }}
      </p>
    </div>

    <button type="submit">Register</button>
  </form>
</template>
```

---

# Complete VueJS Form Example: Data

```vue
<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      errors: {
        username: null,
        email: null
      }
    }
  },
```

---

# Complete VueJS Form Example: Methods

```vue
  methods: {
    checkForm(e) {
      e.preventDefault()
      this.errors = { username: null, email: null }

      if (!this.username) {
        this.errors.username = 'Username is required'
        return
      }

      if (this.username.length < 3) {
        this.errors.username = 'Username must be at least 3 characters'
        return
      }

      if (!this.email) {
        this.errors.email = 'Email is required'
        return
      }

      this.submitForm()
    },
    submitForm() {
      console.log('Form submitted:', this.username, this.email)
    }
  }
}
</script>
```

---

# VueJS Validation: Multiple Errors

```vue
<script>
export default {
  data() {
    return {
      username: '',
      errorList: []
    }
  },
  methods: {
    checkForm(e) {
      e.preventDefault()
      this.errorList = []

      if (!this.username) {
        this.errorList.push('Username is required')
      }

      if (this.username.length < 3) {
        this.errorList.push('Username too short')
      }

      if (this.errorList.length === 0) {
        this.submitForm()
      }
    }
  }
}
</script>
```

---

# VueJS Validation: Display Multiple Errors

```vue
<template>
  <form @submit="checkForm" novalidate>
    <div v-if="errorList.length > 0" class="error-box">
      <p>Please correct the following errors:</p>
      <ul>
        <li v-for="(error, index) in errorList" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>

    <input v-model="username" type="text">
    <button type="submit">Submit</button>
  </form>
</template>
```

---

# Real-Time Validation with watch

```vue
<script>
export default {
  data() {
    return {
      email: '',
      emailError: null
    }
  },
  watch: {
    email(newValue) {
      if (!newValue) {
        this.emailError = null
        return
      }

      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!pattern.test(newValue)) {
        this.emailError = 'Invalid email format'
      } else {
        this.emailError = null
      }
    }
  }
}
</script>
```

---

# Custom Validation Functions

```vue
<script>
export default {
  methods: {
    validateEmail(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return pattern.test(email)
    },

    validatePassword(password) {
      return password.length >= 8
    },

    checkForm(e) {
      e.preventDefault()

      if (!this.validateEmail(this.email)) {
        this.errors.email = 'Invalid email'
        return
      }

      if (!this.validatePassword(this.password)) {
        this.errors.password = 'Password too short'
        return
      }

      this.submitForm()
    }
  }
}
</script>
```

---

# What is Vuetify?

**Vuetify** is a complete UI component framework for Vue.js

**Key Features:**

- Material Design components
- Pre-built form components
- Built-in validation system
- Responsive grid system
- Customizable themes
- Extensive component library

**Official Site:** <https://vuetifyjs.com/>

---

# Installing Vuetify

```bash
npm install vuetify@next
npm install @mdi/font
```

Vuetify 3 for Vue 3 compatibility.

---

# Registering Vuetify: main.js

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives
})

createApp(App).use(vuetify).mount('#app')
```

---

# Vuetify Form Components

**Common components:**

- **`v-form`** - Form container with validation
- **`v-text-field`** - Text input
- **`v-textarea`** - Multiline text
- **`v-select`** - Dropdown selection
- **`v-checkbox`** - Checkbox input
- **`v-radio`** - Radio buttons
- **`v-btn`** - Material Design button

---

# Basic Vuetify Form

```vue
<template>
  <v-app>
    <v-container>
      <v-form>
        <v-text-field
          label="Username"
          v-model="username"
        ></v-text-field>

        <v-text-field
          label="Email"
          v-model="email"
          type="email"
        ></v-text-field>

        <v-btn color="primary" @click="submit">
          Submit
        </v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>
```

---

# Vuetify v-form with Validation

**Key Concept:** Use **`rules` prop** for validation

```vue
<v-text-field
  v-model="email"
  label="Email"
  :rules="emailRules"
></v-text-field>
```

`rules` accepts an **array of functions**!

---

# Defining Validation Rules

```vue
<script>
export default {
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ]
    }
  }
}
</script>
```

Each function returns `true` or an error message!

---

# How Validation Rules Work

**Rules are functions:**

```javascript
v => !!v || 'Email is required'
```

**Breakdown:**

- `v` = current value
- `!!v` = checks if value exists (converts to boolean)
- If `true`, validation passes
- If `false`, returns error message

**Multiple rules = all must pass**

---

# Complete Vuetify Form: Template

```vue
<template>
  <v-app>
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          type="email"
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" @click="submit">
          Submit
        </v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>
```

---

# Complete Vuetify Form: Script

```vue
<script>
export default {
  data() {
    return {
      valid: false,
      username: '',
      email: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length >= 3 || 'Username must be at least 3 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ]
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log('Form submitted:', this.username, this.email)
      }
    }
  }
}
</script>
```

---

# Vuetify: Password Field

```vue
<template>
  <v-text-field
    v-model="password"
    :rules="passwordRules"
    label="Password"
    type="password"
    counter
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Password must be at least 8 characters',
        v => /[A-Z]/.test(v) || 'Password must contain uppercase letter'
      ]
    }
  }
}
</script>
```

---

# Vuetify: Select Component

```vue
<template>
  <v-select
    v-model="country"
    :items="countries"
    :rules="[v => !!v || 'Country is required']"
    label="Country"
    required
  ></v-select>
</template>

<script>
export default {
  data() {
    return {
      country: null,
      countries: ['USA', 'Canada', 'UK', 'Australia']
    }
  }
}
</script>
```

---

# Vuetify: Checkbox Validation

```vue
<template>
  <v-checkbox
    v-model="terms"
    :rules="termsRules"
    label="I agree to the terms and conditions"
  ></v-checkbox>
</template>

<script>
export default {
  data() {
    return {
      terms: false,
      termsRules: [
        v => !!v || 'You must agree to continue'
      ]
    }
  }
}
</script>
```

---

# Form Validation Methods

**`validate()`** - Validate entire form

```javascript
this.$refs.form.validate()
```

**`reset()`** - Clear form and errors

```javascript
this.$refs.form.reset()
```

**`resetValidation()`** - Clear errors only

```javascript
this.$refs.form.resetValidation()
```

---

# Complete Registration Form: Template Part 1

```vue
<template>
  <v-app>
    <v-container>
      <v-card class="mx-auto" max-width="500">
        <v-card-title>Registration Form</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>
```

---

# Complete Registration Form: Template Part 2

```vue
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              type="email"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
              counter
              required
            ></v-text-field>
```

---

# Complete Registration Form: Template Part 3

```vue
            <v-select
              v-model="country"
              :items="countries"
              :rules="[v => !!v || 'Country is required']"
              label="Country"
              required
            ></v-select>

            <v-checkbox
              v-model="terms"
              :rules="termsRules"
              label="I agree to terms"
            ></v-checkbox>
          </v-form>
        </v-card-text>
```

---

# Complete Registration Form: Template Part 4

```vue
        <v-card-actions>
          <v-btn color="primary" :disabled="!valid" @click="submit">
            Register
          </v-btn>
          <v-btn @click="reset">
            Reset
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>
```

---

# Complete Registration Form: Script

```vue
<script>
export default {
  data() {
    return {
      valid: false,
      username: '',
      email: '',
      password: '',
      country: null,
      terms: false,
      countries: ['USA', 'Canada', 'UK', 'Australia'],
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length >= 3 || 'Min 3 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Invalid email'
      ],
```

---

# Complete Registration Form: Script (continued)

```vue
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Min 8 characters'
      ],
      termsRules: [
        v => !!v || 'Must agree to terms'
      ]
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        console.log('Form submitted')
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
```

---

# Custom Rule Functions

```vue
<script>
export default {
  data() {
    return {
      age: null,
      ageRules: [
        this.required('Age'),
        this.minValue(18),
        this.maxValue(100)
      ]
    }
  },
  methods: {
    required(fieldName) {
      return v => !!v || `${fieldName} is required`
    },
    minValue(min) {
      return v => v >= min || `Must be at least ${min}`
    },
    maxValue(max) {
      return v => v <= max || `Must be at most ${max}`
    }
  }
}
</script>
```

---

# Async Validation Example

```vue
<script>
export default {
  data() {
    return {
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        this.checkUsername
      ]
    }
  },
  methods: {
    async checkUsername(value) {
      // Simulate API call
      const available = await this.isUsernameAvailable(value)
      return available || 'Username already taken'
    },
    isUsernameAvailable(username) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(username !== 'admin')
        }, 500)
      })
    }
  }
}
</script>
```

---

# Best Practices: HTML5 Validation

1. **Use for simple forms** - Quick implementation
2. **Combine with CSS** - Visual feedback
3. **Provide labels** - Accessibility
4. **Use appropriate types** - email, url, tel
5. **Test across browsers** - Behavior varies

---

# Best Practices: VueJS Validation

1. **Use `novalidate`** - Disable browser validation
2. **Clear previous errors** - Reset on each check
3. **Validate on submit** - Use `e.preventDefault()`
4. **Show clear messages** - User-friendly errors
5. **Validate individual fields** - Use `watch` for real-time
6. **Keep validation logic reusable** - Separate functions

---

# Best Practices: Vuetify Forms

1. **Use rules array** - Clean validation
2. **Reference form** - Use `ref="form"`
3. **Bind v-model to valid** - Track form state
4. **Disable submit when invalid** - `:disabled="!valid"`
5. **Provide reset option** - Better UX
6. **Use appropriate components** - Material Design

---

# Validation Comparison

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **HTML5** | Quick, native | Limited control | Simple forms |
| **VueJS** | Full control, custom | More code | Complex logic |
| **Vuetify** | Beautiful UI, built-in | Requires library | Enterprise apps |

---

# Common Validation Patterns

**Email:**

```javascript
v => /.+@.+\..+/.test(v) || 'Invalid email'
```

**Phone:**

```javascript
v => /^[0-9]{10}$/.test(v) || 'Invalid phone'
```

**URL:**

```javascript
v => /^https?:\/\/.+/.test(v) || 'Invalid URL'
```

**Password strength:**

```javascript
v => /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(v) || 'Weak password'
```

---

# Error Display Strategies

**Inline errors:**

```vue
<p v-if="errors.email" class="error">{{ errors.email }}</p>
```

**Error list:**

```vue
<ul>
  <li v-for="error in errorList" :key="error">{{ error }}</li>
</ul>
```

**Toast notifications:**

```vue
<v-snackbar v-model="showError">{{ errorMessage }}</v-snackbar>
```

---

# Form Submission Flow

```
┌────────────────────────────────┐
│  User fills form               │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│  User clicks Submit            │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│  checkForm(e) runs             │
│  e.preventDefault()            │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│  Validate all fields           │
└──────────────┬─────────────────┘
         Valid │ │ Invalid
               ▼ ▼
    ┌──────────┐ ┌──────────┐
    │ Submit   │ │ Show     │
    │ Data     │ │ Errors   │
    └──────────┘ └──────────┘
```

---

# Conclusion

**This week you learned:**

- HTML5 validation attributes (required, min/max, pattern)
- VueJS custom validation with `novalidate` and `checkForm`
- `e.preventDefault()` for handling form submission
- Vuetify UI framework and Material Design
- v-form component with rules-based validation
- Best practices for form validation

**Next week:** Vite and Vue CLI

---

<!-- _paginate: false -->

# Questions?

**Practice building forms with multiple validation approaches!**

Remember:

```
HTML5 = Quick & Simple
VueJS = Full Control
Vuetify = Beautiful & Powerful
```

**Happy coding!**
