# Test Cases Documentation

## Test Execution Summary
- **Total Tests**: 7
- **Passed**: 7
- **Failed**: 0
- **Status**: ✅ ALL TESTS PASSED

---

## 1. Application Context Test

### Test Class: `EkartApplicationTests`
**Purpose**: Verify Spring Boot application context loads successfully

| Test Case | Description | Status |
|-----------|-------------|--------|
| contextLoads | Validates that Spring application context initializes without errors | ✅ PASS |

**Verification Points**:
- Spring Boot application starts successfully
- All beans are properly configured
- Database connection is established
- JPA repositories are initialized
- Security configuration loads correctly

---

## 2. Product Service Tests

### Test Class: `ProductServiceTest`
**Purpose**: Unit testing for ProductService business logic

### Test Case 2.1: Create Product
**Method**: `testCreateProduct()`
**Description**: Verify product creation functionality

| Input | Expected Output | Status |
|-------|----------------|--------|
| Product(name="Laptop", price=999.99, description="Gaming laptop", stock=10) | Product saved with ID=1 | ✅ PASS |

**Assertions**:
- Product is not null
- Product ID is assigned (1L)
- Product name matches input ("Laptop")
- Repository save method called once

---

### Test Case 2.2: Get Product By ID (Success)
**Method**: `testGetByIdSuccess()`
**Description**: Retrieve existing product by ID

| Input | Expected Output | Status |
|-------|----------------|--------|
| Product ID = 1 | Product with name="Laptop" | ✅ PASS |

**Assertions**:
- Product is not null
- Product name is "Laptop"
- Repository findById called with correct ID

---

### Test Case 2.3: Get Product By ID (Not Found)
**Method**: `testGetByIdNotFound()`
**Description**: Handle non-existent product retrieval

| Input | Expected Behavior | Status |
|-------|------------------|--------|
| Product ID = 1 (not exists) | Throws ResourceNotFoundException | ✅ PASS |

**Assertions**:
- ResourceNotFoundException is thrown
- Exception message contains product ID

---

### Test Case 2.4: Get All Products
**Method**: `testGetAll()`
**Description**: Retrieve all products from database

| Input | Expected Output | Status |
|-------|----------------|--------|
| None | List of 2 products | ✅ PASS |

**Test Data**:
- Product 1: Laptop ($999.99)
- Product 2: Mouse ($29.99)

**Assertions**:
- List size is 2
- First product name is "Laptop"
- Repository findAll called once

---

### Test Case 2.5: Update Product
**Method**: `testUpdateProduct()`
**Description**: Update existing product details

| Input | Expected Output | Status |
|-------|----------------|--------|
| ID=1, Updated Product(name="Updated Laptop", price=899.99, stock=5) | Updated product returned | ✅ PASS |

**Assertions**:
- Product name updated to "Updated Laptop"
- Product price updated to 899.99
- Repository save called with updated product

---

### Test Case 2.6: Delete Product
**Method**: `testDeleteProduct()`
**Description**: Delete product by ID

| Input | Expected Behavior | Status |
|-------|------------------|--------|
| Product ID = 1 | Product deleted successfully | ✅ PASS |

**Assertions**:
- Repository deleteById called once with ID=1
- No exceptions thrown

---

## 3. Manual API Testing (Postman/cURL)

### 3.1 Authentication Tests

#### Test Case 3.1.1: User Registration
**Endpoint**: `POST /auth/register`
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

**Expected Response**: 200 OK
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Validation**:
- JWT token generated
- User saved in database
- Password encrypted with BCrypt

---

#### Test Case 3.1.2: User Login
**Endpoint**: `POST /auth/login`
**Content-Type**: `application/json`

**Request Body**:
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Expected Response**: 200 OK
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

**Validation**:
- Valid JWT token returned
- Token expires in 24 hours
- Authentication successful

---

### 3.2 Product API Tests (Requires Authentication)

#### Test Case 3.2.1: Create Product
**Endpoint**: `POST /api/products`
**Headers**: `Authorization: Bearer <token>`
**Content-Type**: `application/json`

**Request Body**:
```json
{
    "name": "Laptop",
    "price": 999.99,
    "description": "Gaming laptop",
    "stock": 10
}
```

**Expected Response**: 201 Created
```json
{
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "description": "Gaming laptop",
    "stock": 10
}
```

**Validation**:
- Product created with auto-generated ID
- Location header: `/api/products/1`
- All fields saved correctly

---

#### Test Case 3.2.2: Get Product By ID
**Endpoint**: `GET /api/products/1`
**Headers**: `Authorization: Bearer <token>`

**Expected Response**: 200 OK
```json
{
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "description": "Gaming laptop",
    "stock": 10
}
```

**Validation**:
- Product retrieved successfully
- All fields match database

---

#### Test Case 3.2.3: Get All Products
**Endpoint**: `GET /api/products`
**Headers**: `Authorization: Bearer <token>`

**Expected Response**: 200 OK
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

**Validation**:
- Array of products returned
- All products from database included

---

#### Test Case 3.2.4: Update Product
**Endpoint**: `PUT /api/products/1`
**Headers**: `Authorization: Bearer <token>`
**Content-Type**: `application/json`

**Request Body**:
```json
{
    "name": "Updated Laptop",
    "price": 899.99,
    "description": "Updated description",
    "stock": 5
}
```

**Expected Response**: 200 OK
```json
{
    "id": 1,
    "name": "Updated Laptop",
    "price": 899.99,
    "description": "Updated description",
    "stock": 5
}
```

**Validation**:
- Product updated successfully
- All fields reflect new values

---

#### Test Case 3.2.5: Delete Product
**Endpoint**: `DELETE /api/products/1`
**Headers**: `Authorization: Bearer <token>`

**Expected Response**: 204 No Content

**Validation**:
- Product deleted from database
- No response body
- Subsequent GET returns 404

---

### 3.3 Validation Tests

#### Test Case 3.3.1: Create Product with Invalid Data
**Endpoint**: `POST /api/products`
**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
    "name": "",
    "price": -10,
    "stock": -5
}
```

**Expected Response**: 400 Bad Request
```json
{
    "timestamp": "2026-02-27T00:00:00",
    "status": 400,
    "message": "Validation failed",
    "details": "Product name must not be blank"
}
```

**Validation**:
- Blank name rejected
- Negative price rejected
- Negative stock rejected

---

#### Test Case 3.3.2: Get Non-Existent Product
**Endpoint**: `GET /api/products/999`
**Headers**: `Authorization: Bearer <token>`

**Expected Response**: 404 Not Found
```json
{
    "timestamp": "2026-02-27T00:00:00",
    "status": 404,
    "message": "Product not found with id: 999",
    "details": "Resource not found"
}
```

**Validation**:
- ResourceNotFoundException thrown
- Proper error response format

---

### 3.4 Security Tests

#### Test Case 3.4.1: Access Protected Endpoint Without Token
**Endpoint**: `GET /api/products`
**Headers**: None

**Expected Response**: 401 Unauthorized or 403 Forbidden

**Validation**:
- Request rejected
- Authentication required

---

#### Test Case 3.4.2: Access with Invalid Token
**Endpoint**: `GET /api/products`
**Headers**: `Authorization: Bearer invalid_token`

**Expected Response**: 401 Unauthorized or 403 Forbidden

**Validation**:
- Invalid token rejected
- Proper error handling

---

## 4. Test Coverage Summary

### Components Tested:
- ✅ Application Context Loading
- ✅ Product Service (Create, Read, Update, Delete)
- ✅ Exception Handling (ResourceNotFoundException)
- ✅ Repository Layer Integration
- ✅ Logging Functionality

### Components Requiring Manual Testing:
- 🔧 Authentication Endpoints (register, login)
- 🔧 Product REST API Endpoints
- 🔧 JWT Token Generation & Validation
- 🔧 Security Filter Chain
- 🔧 Input Validation
- 🔧 Global Exception Handler

---

## 5. Test Execution Instructions

### Run All Tests:
```bash
mvnw.cmd test
```

### Run Specific Test Class:
```bash
mvnw.cmd test -Dtest=ProductServiceTest
```

### Run with Coverage:
```bash
mvnw.cmd test jacoco:report
```

---

## 6. Known Issues & Notes

1. **Mockito Warning**: Self-attaching inline-mock-maker warning (non-critical)
2. **JPA Open-in-View**: Enabled by default (consider disabling for production)
3. **PostgreSQL Dialect**: Auto-detected, explicit configuration not needed
4. **Test Database**: Uses same database as development (consider H2 for tests)

---

## 7. Future Test Enhancements

- [ ] Add integration tests for REST controllers
- [ ] Add tests for Cart functionality
- [ ] Add tests for AuthService
- [ ] Add tests for JWT token expiration
- [ ] Add performance tests
- [ ] Add security penetration tests
- [ ] Add database transaction tests
- [ ] Add concurrent access tests

---

**Last Updated**: 2026-02-27
**Test Framework**: JUnit 5, Mockito, Spring Boot Test
**Build Tool**: Maven
