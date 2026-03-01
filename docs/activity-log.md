# Activity Log - EKART Project

## Purpose
This document tracks all actions, changes, and activities performed on the EKART project.

---

## Log Format
```
[Date] [Time] - [Action Type] - [Description]
```

---

## Activity Logs

### 2026-02-27

**00:00:00** - PROJECT_INIT - Project initialized with Spring Boot 4.0.3, Java 21, PostgreSQL

**00:05:00** - MODEL_CREATED - Created Product entity with validation annotations (@Data, @NoArgsConstructor, @AllArgsConstructor, @Slf4j)

**00:10:00** - MODEL_CREATED - Created Role enum (ADMIN, CUSTOMER)

**00:15:00** - EXCEPTION_HANDLING - Added GlobalExceptionHandler and ResourceNotFoundException

**00:20:00** - SECURITY_ADDED - Implemented JWT authentication with JwtUtil, JwtAuthenticationFilter, SecurityConfig

**00:25:00** - DEPENDENCY_ADDED - Added JJWT dependencies (jjwt-api, jjwt-impl, jjwt-jackson)

**00:30:00** - CONTROLLER_CREATED - Created AuthController with register and login endpoints

**00:35:00** - SERVICE_CREATED - Created AuthService and CustomUserDetailsService

**00:40:00** - REPOSITORY_CREATED - Created UserRepository with findByEmail method

**00:45:00** - MODEL_CREATED - Created User entity with validation

**00:50:00** - CONTROLLER_CREATED - Created ProductController with CRUD endpoints

**00:55:00** - SERVICE_CREATED - Created ProductService with exception handling

**01:00:00** - REPOSITORY_CREATED - Created ProductRepository

**01:05:00** - MODEL_CREATED - Created Cart and CartItem entities

**01:10:00** - BUG_FIX - Fixed Product.java to include Lombok annotations as per requirements

**01:15:00** - BUG_FIX - Fixed pom.xml test dependencies (removed invalid artifacts)

**01:20:00** - BUG_FIX - Removed null checks from ProductController (service throws exceptions)

**01:25:00** - BUG_FIX - Added explicit Content-Type handling in AuthController endpoints

**01:30:00** - TESTING - Created ProductServiceTest with 6 unit tests

**01:35:00** - DEPENDENCY_ADDED - Added spring-security-test dependency

**01:40:00** - TESTING - All tests passed (7/7) - ProductService and Application context tests

**01:45:00** - DOCUMENTATION - Created comprehensive testcases.md with manual and automated test scenarios

**01:50:00** - FRONTEND_CREATED - Created login.html and register.html

**01:55:00** - FRONTEND_CREATED - Created home.html with product management

**02:00:00** - FRONTEND_CREATED - Created cart.html with cart functionality

**02:05:00** - FRONTEND_CREATED - Created style.css with responsive design

**02:10:00** - FRONTEND_CREATED - Created auth.js for authentication logic

**02:15:00** - FRONTEND_CREATED - Created products.js for product CRUD and cart operations

**02:20:00** - FRONTEND_CREATED - Created cart.js for cart management

**02:25:00** - DOCUMENTATION - Created HLD.md with complete architecture and JWT flow

**02:30:00** - DOCUMENTATION - Created api-endpoints.md with all API references

**02:35:00** - DOCUMENTATION - Created execution-steps.md with setup and run instructions

**02:40:00** - DOCUMENTATION - Created activity-log.md for tracking project activities

---

## Action Types Reference

- **PROJECT_INIT** - Project initialization and setup
- **MODEL_CREATED** - Entity/Model class creation
- **CONTROLLER_CREATED** - REST controller creation
- **SERVICE_CREATED** - Service layer creation
- **REPOSITORY_CREATED** - Repository interface creation
- **DEPENDENCY_ADDED** - Maven dependency addition
- **SECURITY_ADDED** - Security configuration/implementation
- **EXCEPTION_HANDLING** - Exception handling implementation
- **BUG_FIX** - Bug fixes and corrections
- **TESTING** - Test creation and execution
- **FRONTEND_CREATED** - Frontend file creation
- **DOCUMENTATION** - Documentation creation/update
- **FEATURE_ADDED** - New feature implementation
- **REFACTOR** - Code refactoring
- **CONFIG_CHANGE** - Configuration changes
- **DATABASE_CHANGE** - Database schema changes

---

## Instructions for Logging

### Format
```
**HH:MM:SS** - ACTION_TYPE - Brief description of what was done
```

### Example
```
**14:30:00** - BUG_FIX - Fixed CORS issue in SecurityConfig
```

### When to Log
- Creating new files/classes
- Modifying existing code
- Adding dependencies
- Fixing bugs
- Running tests
- Deploying changes
- Configuration updates
- Database changes

---

## Recent Activities

### [Add your activities below this line]

**[TIME]** - [ACTION_TYPE] - [Description]

---

**Document Created**: 2026-02-27  
**Last Updated**: 2026-02-27


**02:45:00** - BUG_FIX - Added CORS configuration in SecurityConfig to allow frontend origins (localhost:8000, 127.0.0.1:5500, file://)

