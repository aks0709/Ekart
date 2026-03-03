# Troubleshooting Guide - Issues & Solutions

## Overview
This document lists all issues encountered during EKART React frontend development, their root causes, and solutions implemented.

---

## Issue 1: CORS Error - Frontend Cannot Connect to Backend

### Problem
React app (localhost:3000) unable to make API calls to Spring Boot backend (localhost:8080). Browser console showed CORS policy errors.

### Root Cause
Backend SecurityConfig only allowed origins: localhost:8000, 127.0.0.1:5500, localhost:5500, file:// - but React runs on localhost:3000 by default.

### Solution
Added `http://localhost:3000` to CORS allowed origins in SecurityConfig.java:
```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000",  // Added for React
    "http://localhost:8000", 
    "http://127.0.0.1:5500", 
    "http://localhost:5500", 
    "file://"
));
```

### Why This Happens
CORS (Cross-Origin Resource Sharing) is a browser security feature that blocks requests from one origin (localhost:3000) to another (localhost:8080) unless the server explicitly allows it.

---

## Issue 2: Add Product & Update Product Endpoints Failing

### Problem
- Add Product: "Maximum upload size exceeded" error
- Update Product: PostgreSQL error - "column image_data is of type bytea but expression is of type oid/bigint"

### Root Causes
1. **Missing multipart configuration**: No file size limits set in application.properties
2. **@Lob annotation issue**: In PostgreSQL, @Lob creates OID (Object Identifier) type instead of BYTEA, storing references instead of actual bytes
3. **Frontend-Backend mismatch**: Frontend sending FormData but backend expecting specific @RequestPart structure

### Solutions

#### Backend Changes:

1. **Added multipart configuration** (application.properties):
```properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
spring.servlet.multipart.enabled=true
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true
```

2. **Fixed Product model** - Removed @Lob, used explicit columnDefinition:
```java
@Column(name = "image_data", columnDefinition = "bytea")
private byte[] imageData;
```

3. **Created WebMvcConfig** to enable JSON deserialization for @RequestPart:
```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new MappingJackson2HttpMessageConverter());
    }
}
```

4. **Updated ProductController** to use @RequestPart:
```java
@PostMapping(consumes = "multipart/form-data")
public ResponseEntity<Product> create(
    @RequestPart("product") Product product,
    @RequestPart(value = "image", required = false) MultipartFile image
)
```

#### Frontend Changes:

1. **Fixed AddProduct.js** to send proper FormData:
```javascript
const formData = new FormData();
const productData = {
    name: form.name,
    price: parseFloat(form.price),  // Proper type conversion
    stock: form.stock ? parseInt(form.stock) : 0,
    // ... other fields
};
formData.append('product', new Blob([JSON.stringify(productData)], 
    { type: 'application/json' }));
if (image) formData.append('image', image);
```

2. **Ensured no Content-Type header** for FormData (browser sets it automatically with boundary)

### Why This Happens
- **OID vs BYTEA**: PostgreSQL has two ways to store large objects - OID (stores reference) and BYTEA (stores actual bytes). @Lob defaults to OID which causes type mismatch.
- **Multipart parsing**: Spring Boot needs explicit configuration to handle large files and deserialize JSON from multipart requests.
- **Type conversion**: Backend expects BigDecimal, Integer, Boolean but frontend sends strings - proper conversion needed.

---

## Issue 3: Images Not Displaying on Homepage

### Problem
Product images not loading on homepage. Image URLs returning 401 Unauthorized or images not showing.

### Root Cause
HTML `<img>` tags cannot send Authorization headers. The image endpoint required JWT authentication but browser couldn't pass the Bearer token in img src attribute.

### Solution

#### Backend Changes:

1. **Updated JwtAuthenticationFilter** to accept token from query parameter:
```java
protected void doFilterInternal(HttpServletRequest request, ...) {
    String token = null;
    String authHeader = request.getHeader("Authorization");
    
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
    }
    // Check query parameter for image requests
    else if (request.getRequestURI().contains("/image")) {
        token = request.getParameter("token");
    }
    // ... rest of authentication logic
}
```

2. **Added cache headers** to ProductController image endpoint:
```java
return ResponseEntity.ok()
    .header("Content-Type", product.getImageType())
    .header("Cache-Control", "max-age=3600")
    .body(product.getImageData());
```

#### Frontend Changes:

**Updated api.js** to append token to image URL:
```javascript
getImageUrl: (id) => {
    const token = getToken();
    return `${API_BASE}/api/products/${id}/image?token=${token}`;
}
```

### Why This Happens
Browser security prevents JavaScript from setting custom headers on `<img>` tags. The only way to pass authentication for images is via query parameters or cookies. Query parameter approach is simpler for JWT-based auth.

---

## Issue 4: Data Type Validation Errors

### Problem
Backend validation errors when creating/updating products - "Price must be >= 0", "Stock must be >= 0", type mismatch errors.

### Root Cause
Frontend form inputs return strings, but backend Product model expects:
- BigDecimal for price
- Integer for stock
- Boolean for productAvailable
- LocalDate for releaseDate

### Solution

**Added proper type conversion and validation** in AddProduct.js and EditProduct.js:
```javascript
// Validation
if (!form.price || parseFloat(form.price) < 0) {
    setToast({ message: 'Price must be >= 0', type: 'error' });
    return;
}

// Type conversion
const productData = {
    name: form.name,
    price: parseFloat(form.price),        // String to BigDecimal
    stock: form.stock ? parseInt(form.stock) : 0,  // String to Integer
    productAvailable: form.productAvailable,       // Boolean
    releaseDate: form.releaseDate || null          // String (yyyy-MM-dd)
};
```

### Why This Happens
HTML form inputs always return strings. Backend validation annotations (@NotNull, @DecimalMin, @Min) expect proper Java types. Frontend must convert strings to appropriate types before sending to backend.

---

## Issue 5: Missing Register Page

### Problem
Login page had no way to register new users. Users couldn't create accounts.

### Root Cause
Initial implementation only created Login page, forgot to add Register page and link between them.

### Solution

1. **Created Register.js** page with role selection (ADMIN/CUSTOMER)
2. **Added route** in App.js: `/register`
3. **Added navigation links**:
   - Login page: "Don't have an account? Register"
   - Register page: "Already have an account? Login"

### Why This Happens
Common oversight in initial development - focusing on core functionality first, missing user onboarding flow.

---

## Summary of Key Learnings

1. **CORS Configuration**: Always configure allowed origins for all frontend ports
2. **PostgreSQL BYTEA**: Use explicit `columnDefinition = "bytea"` instead of @Lob
3. **Multipart Requests**: Need WebMvcConfig for JSON deserialization in @RequestPart
4. **Image Authentication**: Use query parameters for authenticated image URLs in `<img>` tags
5. **Type Conversion**: Always convert form strings to proper backend types (BigDecimal, Integer, Boolean)
6. **FormData Headers**: Never set Content-Type manually for FormData - browser handles it
7. **File Size Limits**: Configure spring.servlet.multipart properties for file uploads

---

**Document Created**: 2026-03-03  
**Last Updated**: 2026-03-03
