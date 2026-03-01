# High Level Design (HLD) - EKART E-Commerce Application

## 1. System Overview

EKART is a full-stack e-commerce application built with Spring Boot backend and vanilla JavaScript frontend. It provides product management, user authentication, and shopping cart functionality.

**Tech Stack:**
- Backend: Spring Boot 4.0.3, Java 21
- Database: PostgreSQL 17.6
- Security: JWT (JSON Web Tokens)
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Build Tool: Maven

---

## 2. Architecture Layers

### 2.1 Presentation Layer (Frontend)
```
┌─────────────────────────────────────┐
│         HTML Pages                  │
│  - login.html                       │
│  - register.html                    │
│  - home.html (Products)             │
│  - cart.html                        │
└─────────────────────────────────────┘
           ↓ HTTP/REST
┌─────────────────────────────────────┐
│      JavaScript Modules             │
│  - auth.js (Authentication)         │
│  - products.js (Product CRUD)       │
│  - cart.js (Cart Management)        │
└─────────────────────────────────────┘
```

### 2.2 Application Layer (Backend)
```
┌─────────────────────────────────────────────┐
│            Controller Layer                 │
│  - AuthController (/auth)                   │
│  - ProductController (/api/products)        │
│  - CartController (/api/cart)               │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│            Service Layer                    │
│  - AuthService (User registration/login)    │
│  - ProductService (Business logic)          │
│  - CartService (Cart operations)            │
│  - CustomUserDetailsService (Auth)          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          Repository Layer (JPA)             │
│  - UserRepository                           │
│  - ProductRepository                        │
│  - CartRepository                           │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          Database (PostgreSQL)              │
│  - users, products, carts, cart_items       │
└─────────────────────────────────────────────┘
```

### 2.3 Security Layer
```
┌─────────────────────────────────────────────┐
│         Security Configuration              │
│  - SecurityConfig                           │
│  - JwtAuthenticationFilter                  │
│  - JwtUtil (Token generation/validation)    │
└─────────────────────────────────────────────┘
```

### 2.4 Cross-Cutting Concerns
```
┌─────────────────────────────────────────────┐
│      Exception Handling                     │
│  - GlobalExceptionHandler                   │
│  - ResourceNotFoundException                │
└─────────────────────────────────────────────┘
```

---

## 3. JWT Authentication Flow

### 3.1 Registration Flow
```
User (Frontend)
    │
    │ POST /auth/register
    │ {name, email, password, role}
    ↓
AuthController
    │
    ↓
AuthService
    │ 1. Encrypt password (BCrypt)
    │ 2. Save user to DB
    │ 3. Generate JWT token
    ↓
JwtUtil
    │ Create token with:
    │ - Subject: email
    │ - Expiry: 24 hours
    │ - Signature: HS256
    ↓
Response: {token: "eyJhbGc..."}
    │
    ↓
Frontend stores token in localStorage
```

### 3.2 Login Flow
```
User (Frontend)
    │
    │ POST /auth/login
    │ {email, password}
    ↓
AuthController
    │
    ↓
AuthService
    │ 1. Authenticate via AuthenticationManager
    │ 2. Generate JWT token
    ↓
JwtUtil
    │ Create token
    ↓
Response: {token: "eyJhbGc..."}
    │
    ↓
Frontend stores token in localStorage
```

### 3.3 Protected Request Flow
```
User (Frontend)
    │
    │ GET /api/products
    │ Header: Authorization: Bearer <token>
    ↓
JwtAuthenticationFilter
    │ 1. Extract token from header
    │ 2. Validate token
    │ 3. Extract email from token
    │ 4. Load UserDetails
    │ 5. Set Authentication in SecurityContext
    ↓
ProductController
    │ Process request
    ↓
Response: Product data
```

---

## 4. Database Design

### 4.1 Entity Relationship Diagram
```
┌─────────────┐         ┌─────────────┐
│    users    │         │  products   │
├─────────────┤         ├─────────────┤
│ id (PK)     │         │ id (PK)     │
│ name        │         │ name        │
│ email       │         │ price       │
│ password    │         │ description │
│ role        │         │ stock       │
└─────────────┘         └─────────────┘
      │                        │
      │ 1                      │
      │                        │
      │ 1                      │ *
      ↓                        ↓
┌─────────────┐         ┌─────────────┐
│    carts    │    1:*  │ cart_items  │
├─────────────┤─────────├─────────────┤
│ id (PK)     │         │ id (PK)     │
│ user_id(FK) │         │ cart_id(FK) │
└─────────────┘         │ product_id  │
                        │ quantity    │
                        └─────────────┘
```

### 4.2 Table Schemas

#### users
| Column   | Type         | Constraints              |
|----------|--------------|--------------------------|
| id       | BIGINT       | PRIMARY KEY, AUTO_INCREMENT |
| name     | VARCHAR(255) | NOT NULL                 |
| email    | VARCHAR(255) | NOT NULL, UNIQUE         |
| password | VARCHAR(255) | NOT NULL                 |
| role     | VARCHAR(50)  | NOT NULL (ADMIN/CUSTOMER)|

#### products
| Column      | Type           | Constraints              |
|-------------|----------------|--------------------------|
| id          | BIGINT         | PRIMARY KEY, AUTO_INCREMENT |
| name        | VARCHAR(255)   | NOT NULL                 |
| price       | DECIMAL(19,2)  | NOT NULL, >= 0           |
| description | VARCHAR(1000)  | NULLABLE                 |
| stock       | INTEGER        | NOT NULL, >= 0           |

#### carts
| Column  | Type   | Constraints              |
|---------|--------|--------------------------|
| id      | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| user_id | BIGINT | FOREIGN KEY → users(id)  |

#### cart_items
| Column     | Type   | Constraints              |
|------------|--------|--------------------------|
| id         | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| cart_id    | BIGINT | FOREIGN KEY → carts(id)  |
| product_id | BIGINT | FOREIGN KEY → products(id)|
| quantity   | INTEGER| NOT NULL                 |

---

## 5. Component Interaction Flow

### 5.1 Product CRUD Flow
```
Frontend (home.html)
    │
    │ Load Products
    ↓
GET /api/products
    │
    ↓
ProductController.getAll()
    │
    ↓
ProductService.getAll()
    │
    ↓
ProductRepository.findAll()
    │
    ↓
PostgreSQL Database
    │
    ↓
Return List<Product>
    │
    ↓
Display in Product Grid
```

### 5.2 Add to Cart Flow (Frontend)
```
User clicks "Add to Cart"
    │
    ↓
products.js → addToCart(productId)
    │
    ↓
Read cart from localStorage
    │
    ↓
Update quantity or add new item
    │
    ↓
Save cart to localStorage
    │
    ↓
Show confirmation
```

---

## 6. Security Architecture

### 6.1 Security Configuration
```java
SecurityFilterChain:
  - CSRF: Disabled (for REST API)
  - Session: STATELESS (JWT-based)
  - Public endpoints: /auth/**
  - Protected endpoints: /api/products/**
  - Filter: JwtAuthenticationFilter (before UsernamePasswordAuthenticationFilter)
```

### 6.2 Password Encryption
- Algorithm: BCrypt
- Strength: Default (10 rounds)
- Handled by: BCryptPasswordEncoder

### 6.3 JWT Token Structure
```
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "sub": "user@example.com",
  "iat": 1234567890,
  "exp": 1234654290
}

Signature:
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret_key
)
```

---

## 7. API Communication Pattern

### 7.1 Request/Response Flow
```
Frontend                    Backend
   │                           │
   │  HTTP Request             │
   │  (JSON + JWT)             │
   ├──────────────────────────>│
   │                           │
   │                    ┌──────┴──────┐
   │                    │ Validate JWT│
   │                    └──────┬──────┘
   │                           │
   │                    ┌──────┴──────┐
   │                    │Process Logic│
   │                    └──────┬──────┘
   │                           │
   │  HTTP Response            │
   │  (JSON)                   │
   │<──────────────────────────┤
   │                           │
```

### 7.2 Error Handling Flow
```
Exception Occurs
    │
    ↓
GlobalExceptionHandler
    │
    ├─> ResourceNotFoundException → 404
    ├─> MethodArgumentNotValidException → 400
    └─> Exception → 500
    │
    ↓
Standard Error Response:
{
  "timestamp": "2026-02-27T00:00:00",
  "status": 404,
  "message": "Product not found",
  "details": "Resource not found"
}
```

---

## 8. Data Flow Diagrams

### 8.1 User Registration
```
[User] → [Frontend] → [AuthController] → [AuthService] 
  → [PasswordEncoder] → [UserRepository] → [Database]
  → [JwtUtil] → [Token] → [Frontend] → [localStorage]
```

### 8.2 Product Management
```
[User] → [Frontend] → [ProductController] → [ProductService]
  → [ProductRepository] → [Database] → [Response] → [Frontend]
```

### 8.3 Cart Management (Client-Side)
```
[User] → [Frontend] → [localStorage (cart)]
  → [Fetch Product Details via API] → [Display Cart]
```

---

## 9. Deployment Architecture

```
┌─────────────────────────────────────────┐
│         Client Browser                  │
│  - HTML/CSS/JS                          │
│  - localStorage (JWT + Cart)            │
└─────────────────────────────────────────┘
              ↓ HTTP/HTTPS
┌─────────────────────────────────────────┐
│      Spring Boot Application            │
│  - Embedded Tomcat (Port 8080)          │
│  - REST API                             │
│  - JWT Authentication                   │
└─────────────────────────────────────────┘
              ↓ JDBC
┌─────────────────────────────────────────┐
│      PostgreSQL Database                │
│  - Port 5432                            │
│  - Database: ekart                      │
└─────────────────────────────────────────┘
```

---

## 10. Key Design Decisions

1. **Stateless Authentication**: JWT tokens eliminate server-side session management
2. **Client-Side Cart**: Cart stored in localStorage for simplicity (can be moved to backend)
3. **RESTful API**: Standard REST conventions for predictable endpoints
4. **Layered Architecture**: Clear separation of concerns (Controller → Service → Repository)
5. **Exception Handling**: Centralized error handling with consistent response format
6. **Validation**: Bean validation annotations for input validation
7. **Lombok**: Reduces boilerplate code in entities
8. **JPA/Hibernate**: ORM for database abstraction

---

## 11. Scalability Considerations

- **Horizontal Scaling**: Stateless design allows multiple backend instances
- **Database Connection Pooling**: HikariCP for efficient connection management
- **JWT Expiry**: 24-hour token expiry for security
- **CORS**: Can be configured for cross-origin requests
- **Caching**: Can add Redis for product/user caching
- **Load Balancing**: Multiple backend instances behind load balancer

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-27
