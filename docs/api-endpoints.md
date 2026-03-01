# API Endpoints Documentation

## Base URL
```
http://localhost:8080
```

---

## 1. Authentication Endpoints

### 1.1 Register User
**Endpoint**: `POST /auth/register`  
**Authentication**: Not required  
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA5MDY0MDAwLCJleHAiOjE3MDkxNTA0MDB9.signature"
}
```

**Validation Rules**:
- `name`: Not blank
- `email`: Valid email format, unique
- `password`: Minimum 6 characters
- `role`: ADMIN or CUSTOMER

---

### 1.2 Login User
**Endpoint**: `POST /auth/login`  
**Authentication**: Not required  
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA5MDY0MDAwLCJleHAiOjE3MDkxNTA0MDB9.signature"
}
```

**Error Response** (401 Unauthorized):
```json
{
  "timestamp": "2026-02-27T00:00:00",
  "status": 401,
  "message": "Bad credentials",
  "details": "Internal server error"
}
```

---

## 2. Product Endpoints

### 2.1 Get All Products
**Endpoint**: `GET /api/products`  
**Authentication**: Required (Bearer Token)  
**Headers**: `Authorization: Bearer <token>`

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "description": "Gaming laptop",
    "stock": 10
  },
  {
    "id": 2,
    "name": "Mouse",
    "price": 29.99,
    "description": "Wireless mouse",
    "stock": 50
  }
]
```

---

### 2.2 Get Product by ID
**Endpoint**: `GET /api/products/{id}`  
**Authentication**: Required (Bearer Token)  
**Headers**: `Authorization: Bearer <token>`

**Example**: `GET /api/products/1`

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "Laptop",
  "price": 999.99,
  "description": "Gaming laptop",
  "stock": 10
}
```

**Error Response** (404 Not Found):
```json
{
  "timestamp": "2026-02-27T00:00:00",
  "status": 404,
  "message": "Product not found with id: 1",
  "details": "Resource not found"
}
```

---

### 2.3 Create Product
**Endpoint**: `POST /api/products`  
**Authentication**: Required (Bearer Token)  
**Headers**: 
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Request Body**:
```json
{
  "name": "Laptop",
  "price": 999.99,
  "description": "Gaming laptop",
  "stock": 10
}
```

**Response** (201 Created):
```json
{
  "id": 1,
  "name": "Laptop",
  "price": 999.99,
  "description": "Gaming laptop",
  "stock": 10
}
```

**Response Headers**:
```
Location: /api/products/1
```

**Validation Rules**:
- `name`: Not blank
- `price`: Not null, >= 0.0
- `description`: Max 1000 characters
- `stock`: Not null, >= 0

**Error Response** (400 Bad Request):
```json
{
  "timestamp": "2026-02-27T00:00:00",
  "status": 400,
  "message": "Validation failed",
  "details": "Product name must not be blank"
}
```

---

### 2.4 Update Product
**Endpoint**: `PUT /api/products/{id}`  
**Authentication**: Required (Bearer Token)  
**Headers**: 
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Example**: `PUT /api/products/1`

**Request Body**:
```json
{
  "name": "Updated Laptop",
  "price": 899.99,
  "description": "Updated description",
  "stock": 5
}
```

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "Updated Laptop",
  "price": 899.99,
  "description": "Updated description",
  "stock": 5
}
```

**Error Response** (404 Not Found):
```json
{
  "timestamp": "2026-02-27T00:00:00",
  "status": 404,
  "message": "Product not found with id: 1",
  "details": "Resource not found"
}
```

---

### 2.5 Delete Product
**Endpoint**: `DELETE /api/products/{id}`  
**Authentication**: Required (Bearer Token)  
**Headers**: `Authorization: Bearer <token>`

**Example**: `DELETE /api/products/1`

**Response** (204 No Content):
```
(Empty response body)
```

---

## 3. Error Responses

### 3.1 Validation Error (400)
```json
{
  "timestamp": "2026-02-27T00:00:00.123456",
  "status": 400,
  "message": "Validation failed",
  "details": "Price must be >= 0"
}
```

### 3.2 Unauthorized (401)
```json
{
  "timestamp": "2026-02-27T00:00:00.123456",
  "status": 401,
  "message": "Unauthorized",
  "details": "Full authentication is required"
}
```

### 3.3 Forbidden (403)
```json
{
  "timestamp": "2026-02-27T00:00:00.123456",
  "status": 403,
  "message": "Access Denied",
  "details": "Forbidden"
}
```

### 3.4 Not Found (404)
```json
{
  "timestamp": "2026-02-27T00:00:00.123456",
  "status": 404,
  "message": "Product not found with id: 999",
  "details": "Resource not found"
}
```

### 3.5 Internal Server Error (500)
```json
{
  "timestamp": "2026-02-27T00:00:00.123456",
  "status": 500,
  "message": "Internal server error",
  "details": "Internal server error"
}
```

---

## 4. cURL Examples

### 4.1 Register
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "CUSTOMER"
  }'
```

### 4.2 Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 4.3 Get All Products
```bash
curl -X GET http://localhost:8080/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4.4 Create Product
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999.99,
    "description": "Gaming laptop",
    "stock": 10
  }'
```

### 4.5 Update Product
```bash
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Laptop",
    "price": 899.99,
    "description": "Updated description",
    "stock": 5
  }'
```

### 4.6 Delete Product
```bash
curl -X DELETE http://localhost:8080/api/products/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 5. Postman Collection Structure

```
EKART API
├── Auth
│   ├── Register
│   └── Login
└── Products
    ├── Get All Products
    ├── Get Product by ID
    ├── Create Product
    ├── Update Product
    └── Delete Product
```

### 5.1 Environment Variables
```
base_url: http://localhost:8080
token: (set after login/register)
```

### 5.2 Pre-request Script (for authenticated endpoints)
```javascript
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('token')
});
```

### 5.3 Test Script (for login/register)
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set('token', jsonData.token);
}
```

---

## 6. Frontend API Integration

### 6.1 JavaScript Fetch Example
```javascript
// Login
const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});
const data = await response.json();
localStorage.setItem('token', data.token);

// Get Products (with auth)
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:8080/api/products', {
    headers: { 'Authorization': `Bearer ${token}` }
});
const products = await response.json();
```

---

## 7. HTTP Status Codes Summary

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation errors |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server-side error |

---

## 8. Security Headers

All authenticated requests must include:
```
Authorization: Bearer <JWT_TOKEN>
```

Token format:
```
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA5MDY0MDAwLCJleHAiOjE3MDkxNTA0MDB9.signature
```

Token expiry: 24 hours

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-27
