---
marp: true
theme: default
style: |
  section {
    font-size: 24px;
  }
---

# Week 1

## Unit Overview, Web Development, Usability, and Accessibility

**COS30043 - Interface Design and Development**

---

# Introduction

Welcome to COS30043 - Interface Design and Development!

This week we will cover:

- Unit Purpose and Overview
- Web Development Fundamentals
- Usability Principles
- Accessibility Standards

---

# Learning Outcomes

By the end of this week, you will be able to:

1. Understand the purpose of this unit
2. Identify key web development concepts and architectures
3. Explain usability principles for web applications
4. Apply WCAG 2.1 accessibility guidelines
5. Distinguish between frontend and backend development

---

# Topic 1: Unit Purpose

**What will you learn?**

This unit focuses on:

- Design concepts for user interfaces
- Development tools and frameworks
- Creating dynamic interfaces
- Cross-platform development

**Goal:** Build interactive, accessible, and user-friendly web applications

---

# Topic 2: Web Development Fundamentals

Web development consists of two main areas:

**Frontend Development**

- User interface (UI)
- Visual design
- User experience

**Backend Development**

- Server-side logic
- Database management
- Business functionality

---

# The Hardware: System Architecture

```
┌─────────────────────────────────────┐
│        Two-Tier System              │
├─────────────────────────────────────┤
│  Client Machine  ←→  Server Machine │
└─────────────────────────────────────┘
```

---

# The Hardware: Three-Tier Architecture

```
┌──────────────┐
│ Client Tier  │  ← User Interface Layer
│   (Browser)  │
└──────┬───────┘
       │
┌──────▼───────┐
│ Processing   │  ← Business Logic Layer
│    Tier      │
└──────┬───────┘
       │
┌──────▼───────┐
│ Data Storage │  ← Database Layer
│    Tier      │
└──────────────┘
```

---

# The People: Roles

**Web Developer**

- Programmer specializing in website creation
- Builds both frontend and backend components
- Implements features and functionality

**Webmaster**

- Maintains existing websites
- Monitors traffic and performance
- Ensures hardware/software integrity

---

# The Languages: HTML

**HyperText Markup Language**

HTML specifies the **structure** and **content** of web pages

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Web Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

---

# The Languages: CSS

**Cascading Style Sheets**

CSS adds **style** such as fonts, colors, and layout

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  color: #333;
}

h1 {
  color: #0066cc;
  font-size: 2em;
  text-align: center;
}
```

---

# The Languages: JavaScript

JavaScript adds **programmability** and **interactivity** on the client-side

---

# JavaScript Example Code

```javascript
// DOM Manipulation Example
const button = document.querySelector('#myButton');
const output = document.querySelector('#output');

button.addEventListener('click', () => {
  output.textContent = 'Button clicked!';
  output.style.color = 'green';
});

// Simple calculation
function calculateSum(a, b) {
  return a + b;
}
```

---

# The Languages: PHP

**PHP: Hypertext Preprocessor**

A **server-side** scripting language for creating interactive websites

- Processes data before sending to client
- Interacts with databases
- Handles form submissions
- Generates dynamic content

---

# PHP Example Code

```php
<?php
// Server-side processing
$name = $_POST['username'];
$email = $_POST['email'];

// Database connection
$conn = new mysqli($host, $user, $pass, $db);

// Insert data
$sql = "INSERT INTO users (name, email)
        VALUES ('$name', '$email')";
$conn->query($sql);

echo "User registered successfully!";
?>
```

---

# Topic 3: Usability

**Definition:**
The ability of applications to support web-tasks with:

- **Effectiveness** - Can users complete their goals?
- **Efficiency** - How quickly can tasks be completed?
- **Satisfaction** - Is the experience enjoyable?

---

# Usability Design Considerations

Key factors to consider:

1. **Ease of Learning** - How quickly can users learn the interface?
2. **Navigation** - Can users find what they need?
3. **Task Completion** - Can users accomplish their goals?
4. **Reading** - Is content clear and scannable?

---

# Universal Design Issues

Usability is constrained by:

**1. Aging Populations**

- Vision and motor skill limitations
- Need for larger text and buttons

**2. Limited Bandwidth**

- Slow internet connections
- Need for optimized content

**3. Older Technology/Equipment**

- Legacy browsers and devices
- Compatibility requirements

---

# Topic 4: Accessibility

**Definition:**
Ensuring websites are usable by people with:

- Visual impairments (blindness, low vision)
- Auditory impairments (deafness, hearing loss)
- Motor impairments (limited mobility)
- Cognitive impairments (learning disabilities)

---

# WCAG 2.1: Four Principles

```
┌────────────────────────────────────┐
│   1. PERCEIVABLE                   │
│   Information must be presentable  │
│   to users in ways they can        │
│   perceive                         │
└────────────────────────────────────┘
┌────────────────────────────────────┐
│   2. OPERABLE                      │
│   Interface components must be     │
│   operable by all users            │
└────────────────────────────────────┘
```

---

# WCAG 2.1: Four Principles (continued)

```
┌────────────────────────────────────┐
│   3. UNDERSTANDABLE                │
│   Information and operation must   │
│   be understandable                │
└────────────────────────────────────┘
┌────────────────────────────────────┐
│   4. ROBUST                        │
│   Content must work with current   │
│   and future technologies          │
└────────────────────────────────────┘
```

---

# WCAG Conformance Levels

**Level A (Lowest)**

- Minimum level of accessibility
- Addresses basic barriers

**Level AA (Mid)**

- Most common target for organizations
- Removes significant barriers

**Level AAA (Highest)**

- Maximum accessibility
- Not always achievable for all content

---

# Accessibility Example: ARIA Labels

```html
<button
  aria-label="Close dialog"
  onclick="closeDialog()">
  ✕
</button>

<img
  src="logo.png"
  alt="Company Logo - Home" />

<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

---

# Accessibility Example: Semantic HTML

```html
<article>
  <header>
    <h1>Article Title</h1>
    <time datetime="2026-01-06">January 6, 2026</time>
  </header>

  <section>
    <h2>Introduction</h2>
    <p>Article content...</p>
  </section>

  <footer>
    <p>Author: John Doe</p>
  </footer>
</article>
```

---

# Conclusion

**Key Takeaways:**

1. Web development involves frontend (UI) and backend (server-side)
2. System architectures range from two-tier to multi-tier
3. Core languages: HTML, CSS, JavaScript, PHP
4. Usability ensures effectiveness, efficiency, and satisfaction
5. Accessibility follows WCAG 2.1 principles (A, AA, AAA)

**Next Week:** Layout and Bootstrap Grid System
