---
marp: true
theme: default
paginate: true
---

<!-- _paginate: false -->

# Week 2

## Layout and Bootstrap Grid System

**COS30043 - Interface Design and Development**

---

# Introduction

Welcome to Week 2!

This week, we'll explore:

- CSS layout fundamentals
- The CSS Box Model
- Positioning techniques
- Page design strategies
- Bootstrap Grid System

These concepts are essential for creating responsive, well-structured web layouts.

---

# Learning Outcomes

By the end of this week, you will be able to:

1. Understand CSS layout flow and the Box Model
2. Apply different positioning techniques to elements
3. Design pages using fixed, fluid, and responsive approaches
4. Implement Bootstrap's 12-column grid system
5. Create responsive layouts using Bootstrap containers and breakpoints

---

# CSS Layout: Flow

**Flow** determines how elements are laid out on a page.

Elements are positioned from:

- **Top to bottom**
- **Left to right**

This order is based on their sequence in the HTML document.

Understanding flow is fundamental to controlling page layout.

---

# The CSS Box Model

Every HTML element is a **rectangular box** consisting of four layers:

1. **Content** - The actual content (text, images, etc.)
2. **Padding** - Space between content and border
3. **Border** - The boundary around the padding
4. **Margin** - Space outside the border

---

# Box Model Diagram

```
┌─────────────────────────────────────┐
│          MARGIN (transparent)        │
│  ┌───────────────────────────────┐  │
│  │       BORDER                   │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │     PADDING             │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │                   │  │  │  │
│  │  │  │    CONTENT        │  │  │  │
│  │  │  │                   │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

# Box Model: HTML Example

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="index.css">
  <title>Box Model Demo</title>
</head>
<body>
  <div class="box">
    Content Area
  </div>
</body>
</html>
```

---

# Box Model: CSS Example

```css
.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid #333;
  margin: 30px;
  background-color: #f0f0f0;
}
```

**Total width** = 200 + (20×2) + (5×2) + (30×2) = 310px
**Total height** = 100 + (20×2) + (5×2) + (30×2) = 210px

---

# Display Property

The `display` property controls how an element behaves:

**`block`**

- Appears as a block element
- Takes full width available
- Examples: `<div>`, `<p>`, `<h1>`

**`inline`**

- Contained within blocks
- Only takes necessary width
- Examples: `<span>`, `<a>`, `<strong>`

**`none`**

- Element is hidden from the page

---

# Display Property: HTML Example

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="index.css">
  <title>Display Demo</title>
</head>
<body>
  <div class="block">Block Element</div>
  <span class="inline">Inline Element</span>
  <span class="inline">Another Inline</span>
  <div class="hidden">Hidden Element</div>
</body>
</html>
```

---

# Display Property: CSS Example

```css
.block {
  display: block;
  background-color: lightblue;
  padding: 10px;
}

.inline {
  display: inline;
  background-color: lightgreen;
  padding: 5px;
}

.hidden {
  display: none;
}
```

---

# Positioning: Static

**`position: static`** (default)

- Elements follow normal document flow
- Not affected by `top`, `bottom`, `left`, `right` properties
- This is the default positioning for all elements

```css
.static-element {
  position: static;
}
```

---

# Positioning: Relative

**`position: relative`**

- Element is offset from its **normal position**
- Original space is preserved in the layout
- Other elements are not affected

```css
.relative-element {
  position: relative;
  top: 20px;
  left: 30px;
}
```

The element moves 20px down and 30px right from where it would normally be.

---

# Positioning: Absolute

**`position: absolute`**

- Positioned relative to its **nearest positioned ancestor**
- If no positioned ancestor exists, uses the document body
- Removed from normal document flow

```css
.absolute-element {
  position: absolute;
  top: 50px;
  right: 20px;
}
```

---

# Positioning: Fixed

**`position: fixed`**

- Positioned relative to the **browser window**
- Stays in the same place even when scrolling
- Removed from normal document flow

```css
.fixed-element {
  position: fixed;
  bottom: 0;
  right: 0;
}
```

Common use: navigation bars, floating buttons.

---

# Positioning Comparison

| Type | Relative To | Affects Flow | Use Case |
|------|-------------|--------------|----------|
| **static** | Normal flow | Yes | Default positioning |
| **relative** | Normal position | Yes (space preserved) | Minor adjustments |
| **absolute** | Positioned ancestor | No | Overlays, tooltips |
| **fixed** | Viewport | No | Sticky navigation |

---

# Page Design: Fixed Layout

**Fixed Layout**

- Uses **absolute units** (pixels)
- Exact, predictable sizes
- Doesn't adapt to browser window size

```css
.container {
  width: 960px;
  margin: 0 auto;
}
```

**Pros:** Precise control
**Cons:** May not fit all screen sizes

---

# Page Design: Fluid Layout

**Fluid Layout**

- Uses **relative units** (percentages, em, rem)
- Adapts to browser window size
- More flexible across devices

```css
.container {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
}
```

**Pros:** Adapts to different screens
**Cons:** Less precise control

---

# Responsive "Mobile First" Design

**Mobile First Approach:**

1. Design for the **smallest screen** first
2. Use **media queries** to add complexity for larger screens
3. Progressive enhancement as screen size increases

**Benefits:**

- Ensures core content works on all devices
- Improves performance on mobile
- Forces focus on essential features

---

# Media Queries Example

```css
/* Mobile styles (default) */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    width: 960px;
  }
}
```

---

# What is Bootstrap?

**Bootstrap** is a free, open-source front-end framework for building responsive websites.

**Key Features:**

- Pre-built CSS and JavaScript components
- Responsive grid system
- Mobile-first approach
- Cross-browser compatibility
- Extensive documentation

**Version:** Bootstrap 5 (latest)

---

# Bootstrap Grid System Overview

The Bootstrap Grid System:

- **12-column fluid system**
- Scales based on device size
- Uses **breakpoints** for responsive design
- Built with **flexbox**

Grid components:

1. Containers
2. Rows
3. Columns

---

# Bootstrap Breakpoints

| Breakpoint | Class Infix | Dimensions | Device |
|------------|-------------|------------|--------|
| Extra small | (none) | <576px | Phones |
| Small | `sm` | ≥576px | Phones (landscape) |
| Medium | `md` | ≥768px | Tablets |
| Large | `lg` | ≥992px | Desktops |
| Extra large | `xl` | ≥1200px | Large desktops |
| Extra extra large | `xxl` | ≥1400px | Larger desktops |

---

# Bootstrap Containers

**`.container`**

- Fixed max-width at each breakpoint
- Responsive padding

**`.container-fluid`**

- 100% width at all breakpoints
- Full-width layout

```html
<div class="container">
  <!-- Fixed-width content -->
</div>

<div class="container-fluid">
  <!-- Full-width content -->
</div>
```

---

# Bootstrap Grid: HTML Structure

```html
<!DOCTYPE html>
<html>
<head>
  <link href="bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="index.css">
  <title>Bootstrap Grid</title>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-md-6">Column 1</div>
      <div class="col-md-6">Column 2</div>
    </div>
  </div>
</body>
</html>
```

---

# Bootstrap Grid: Basic Example

```html
<div class="container">
  <div class="row">
    <div class="col-4">
      4 columns wide
    </div>
    <div class="col-8">
      8 columns wide
    </div>
  </div>
</div>
```

Total = 4 + 8 = **12 columns**

---

# Bootstrap Grid: Responsive Columns

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Mobile: 12 cols (full width)
           Tablet: 6 cols (half width)
           Desktop: 4 cols (one-third width) -->
    </div>
    <div class="col-12 col-md-6 col-lg-8">
      <!-- Mobile: 12 cols
           Tablet: 6 cols
           Desktop: 8 cols -->
    </div>
  </div>
</div>
```

---

# Bootstrap Grid: Equal Columns

```html
<div class="container">
  <div class="row">
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
    <div class="col">Column 3</div>
  </div>
</div>
```

Using just `col` without a number creates **equal-width columns** that automatically divide the 12-column space.

---

# Bootstrap Grid: Offset Example

```html
<div class="container">
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <!-- 4 columns wide
           Offset by 4 columns (centered) -->
    </div>
  </div>
</div>
```

Offsets push columns to the right by creating space.

---

# Bootstrap Grid: Nesting

```html
<div class="container">
  <div class="row">
    <div class="col-md-8">
      Parent Column
      <div class="row">
        <div class="col-6">Nested 1</div>
        <div class="col-6">Nested 2</div>
      </div>
    </div>
    <div class="col-md-4">
      Sidebar
    </div>
  </div>
</div>
```

---

# Custom Styling with Bootstrap

```css
/* index.css */
.container {
  margin-top: 20px;
}

.row {
  margin-bottom: 15px;
}

.col,
[class*="col-"] {
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}
```

Bootstrap provides structure; custom CSS adds your design.

---

# Grid System Best Practices

1. **Always use containers** - Wrap rows in `.container` or `.container-fluid`
2. **Rows contain columns** - Never put columns directly in containers
3. **Columns add up to 12** - Total column numbers should equal 12
4. **Mobile first** - Design for smallest screen first
5. **Test responsiveness** - Check all breakpoints

---

# Responsive Layout Workflow

```
┌─────────────────────────────────────┐
│  1. Define Container                │
├─────────────────────────────────────┤
│  2. Create Rows                     │
├─────────────────────────────────────┤
│  3. Add Columns with Breakpoints    │
├─────────────────────────────────────┤
│  4. Add Content                     │
├─────────────────────────────────────┤
│  5. Apply Custom Styles             │
├─────────────────────────────────────┤
│  6. Test Across Devices             │
└─────────────────────────────────────┘
```

---

# Complete Bootstrap Example: HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link href="bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="index.css">
  <title>Responsive Layout</title>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8">
        <h1>Main Content</h1>
      </div>
      <div class="col-12 col-md-4">
        <h2>Sidebar</h2>
      </div>
    </div>
  </div>
</body>
</html>
```

---

# Complete Bootstrap Example: CSS

```css
/* index.css */
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.container {
  background-color: white;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1, h2 {
  color: #333;
}
```

---

# Conclusion

**This week you learned:**

- CSS layout flow and the Box Model
- Four positioning techniques (static, relative, absolute, fixed)
- Fixed, fluid, and responsive design approaches
- Bootstrap's 12-column grid system
- How to create responsive layouts with breakpoints

**Next week:** VueJS Data Binding and Directives

---

<!-- _paginate: false -->

# Questions?

**Review the code examples and practice building responsive layouts!**

Remember to always link your CSS file:

```html
<link rel="stylesheet" href="index.css">
```

**Happy coding!**
