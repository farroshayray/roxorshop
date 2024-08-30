# Project Name: **Roxor Shop**

## Overview
[Roxor Shop](https://roxorshop.netlify.app) is a responsive, single-page application built using HTML, CSS, and Typescript. It features a modern design, interactive elements, and a clean user interface. The webpage is designed to be compatible with multiple devices and screen sizes.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)

## Project Structure
```
└── 📁src
    └── 📁Components
        └── 📁Footer
            └── FooterContainer.tsx
            └── List1.tsx
            └── List2.tsx
            └── List3.tsx
        └── 📁Products.tsx
            └── CategoryCarousel.tsx
            └── ProductGrid.css
            └── ProductGrid.tsx
        └── GreetingRevou.tsx
        └── NavBar.tsx
        └── RegisterBtn.tsx
    └── 📁Pages
        └── 📁CategoryPage
            └── DashboardNavBar.tsx
            └── index.tsx
        └── 📁Home
            └── 📁Pictures
                └── icons8-discount-100 (1).png
                └── icons8-discount-100.png
                └── icons8-protection-96.png
                └── icons8-shipping-100 (1).png
                └── icons8-shipping-100.png
            └── index.tsx
            └── Promotion.tsx
        └── 📁Login
            └── index.tsx
        └── 📁NotFound
            └── index.tsx
        └── 📁ProductDetailPage
            └── ProductDetailPage.tsx
        └── 📁Register
            └── Fetch.ts
            └── FinishRegister.tsx
            └── index.tsx
            └── PostRegister.tsx
            └── RegisterStep1.tsx
            └── RegisterStep2.tsx
            └── RegisterStep3.tsx
            └── validationSchemaStep1.ts
            └── validationSchemaStep2.ts
            └── validationSchemaStep3.ts
        └── 📁ShoppingCart
            └── 📁picture
                └── icons8-minus-26.png
                └── icons8-plus-24.png
            └── CartPage.tsx
        └── 📁WelcomeLogin
            └── index.tsx
    └── 📁picture
        └── facebook.png
        └── icons8-arrow-down-30.png
        └── icons8-back-48.png
        └── icons8-shopping-cart-48 (1).png
        └── icons8-shopping-cart-48.png
        └── instagram.png
        └── logo192.png
        └── sad.png
        └── tiktok.png
        └── twitterx.png
    └── App.css
    └── App.test.tsx
    └── App.tsx
    └── index.css
    └── index.tsx
    └── logo.svg
    └── react-app-env.d.ts
    └── reportWebVitals.ts
    └── setupTests.ts
```

## Features
- **Login and Register with validation:** There is a registration form that has validation and preview of the uploaded image before registering.
- **Responsive Design:** Adapts seamlessly to different screen sizes.
- **carousel and grid products view:** displaying products in carousel and grid views provides an interesting experience for users.
- **Interactive Elements:** Includes buttons, forms, and navigation menus.
- **Clean and Modern UI:** A visually appealing layout with consistent design elements.
- **Optimized Performance:** Efficient loading times and minimal resource usage.
- **Sorting spam products:** processing the data obtained so that it can be displayed with secure products checkbox.

## Installation
### 1. Install Node.js and npm

Ensure that you have Node.js and npm installed on your system. You can download and install Node.js from [here](https://nodejs.org/).

To verify the installation, run the following commands in your terminal:

```bash
node -v
npm -v
```

### 2. Initialize a New React Project with TypeScript

To create a new React project with TypeScript, run the following command:

```bash
npx create-react-app my-app --template typescript
cd my-app
```

### 3. Install TypeScript

TypeScript is already included if you created your project using the TypeScript template as shown above. However, if you need to install or update TypeScript in an existing project, use:

```bash
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

### 4. Install Axios

Axios is a promise-based HTTP client for making requests to APIs. Install it using npm:

```bash
npm install axios
```

### 5. Install Formik

Formik is a library for handling forms in React with ease. To install Formik, use the following command:

```bash
npm install formik
```

### 6. Install React Router DOM

React Router DOM is used for managing navigation and routing in a React application. Install it using:

```bash
npm install react-router-dom
```

Additionally, for TypeScript support, install the types package:

```bash
npm install @types/react-router-dom
```

### 7. Install Carousel Component

To add a responsive carousel to your project, install the `react-multi-carousel` package:

```bash
npm install react-multi-carousel
```

### 8. Install React Grid Layout

React Grid Layout is a draggable and resizable grid layout for React. Install it using:

```bash
npm install react-grid-layout
```

### 9. Install Yup

Yup is a JavaScript schema builder for value parsing and validation. It is often used with Formik for form validation. Install it using:

```bash
npm install yup
```

---

## Usage
### Run Project
To run the Roxor Shop application, navigate to the project directory and execute the following command:
```bash
npm start
```
This will start the development server, and the application will be accessible at http://localhost:3000.
### Register New User
1. Click on Login button on the top-right corner of the navigation bar. if not yet have an account click register under the login form.
2. Fill the registration/login form with required information and click submission button.
### Browsing Products
1. After logged in, you will see products by its category and all products in /home with carousels category and grid view for all products.
2. You can browse more products by its category by clicking 'get started' button in the top elemeent of the page.
### Broken Image Avoidance
1. Check the checkbox on 'secure products' to see available-image only, there are some products that have a broken image, it will be categorized into 'unsecured product'.
### Browsing Products by Categories
1. Click Categories in home, then you will be directed to categories page (/dashboard).
2. Click on Categories Button or click buttons named by its categories.
3. If you clicked Categories button, there are some categories you get from API, then you can choose one of them.
### Add Products to Cart
1. Every products you see in the page can be viewed on the product detail page by clicking the product directly.
2. At the bottom of the detail product page there is a button to add to cart, by clicking on it, it will be added to the products cart.
### Remove Products from Cart
1. When in cart page, there is products that you added to cart list, you can click remove button to remove the product from cart.

---
## Dependencies
- react: "^18.3.1"
- react-scripts: "5.0.1"
- react-router-dom: "^6.26.1"
- axios: "^1.7.4"
- formik: "^2.4.6"
- react-multi-carousel: "^2.8.5"
- yup: "^1.4.0
---