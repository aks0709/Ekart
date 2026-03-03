# Ekart React Frontend

Professional React frontend for Ekart e-commerce application.

## Setup

```bash
npm install
npm start
```

App runs on http://localhost:3000

## Features

- JWT Authentication with role-based access (ADMIN/CUSTOMER)
- Live search with filters (category, brand) and sorting
- Product CRUD (Admin only)
- Shopping cart with quantity controls and stock validation
- Responsive design with TailwindCSS
- Toast notifications

## Routes

- `/login` - Login page
- `/` - Home (product listing)
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/add-product` - Add product (Admin only)
- `/edit-product/:id` - Edit product (Admin only)

## Backend

Ensure backend is running on http://localhost:8080
