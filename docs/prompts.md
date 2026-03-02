# Prompts Log

## Prompt 1
**Prompt:** Guardrail: minimal changes; no refactor; use existing structure/deps; list created files first. Also append this prompt and its use case to /docs/prompts.md.
Create model class Product with fields id(Long, @Id @GeneratedValue), name(@NotBlank), price(BigDecimal, @NotNull @DecimalMin("0.0")), description(@Size(max=1000)), stock(Integer, @NotNull @Min(0)). Add Lombok @Data, @NoArgsConstructor, @AllArgsConstructor, and validation annotations. Use @Entity @Table(name="products"). Add @Slf4j but do not add any try/catch or methods.

**Use Case:** Define core product entity with validation and logging.


## Prompt 2
**Prompt:** Guardrail: minimal changes; no refactor; list created files first. Also append this prompt and its use case to /docs/prompts.md.
Create enum Role with values ADMIN, CUSTOMER. Keep it in package model. No methods, no annotations.
**Use Case:** Define user roles for future auth/authorization.



## Prompt 3
**Prompt:** From now on, for every command or prompt I give you, automatically append the full prompt text along with a short use-case description as a new entry at the end of /docs/prompts.md. Do this WITHOUT me having to mention it again. Do not modify any existing code or files when logging. Only add the prompt entry to prompts.md in a clean one-line format.

**Use Case:** Establish automatic prompt logging workflow for all future commands.

## Prompt 4
**Prompt:** make only minimal changes, no refactor, fix only what's required. Add a GlobalExceptionHandler using @RestControllerAdvice to handle ResourceNotFoundException, ValidationException, MethodArgumentNotValidException, and generic Exception returning a standard JSON (timestamp,status,message,details); create ResourceNotFoundException; update ProductService to throw it instead of returning null; keep existing architecture untouched.

**Use Case:** Implement centralized exception handling with standard error responses and replace null returns with exceptions.

## Prompt 5
**Prompt:** minimal changes only, no refactor, do not modify existing Product code. Add JWT authentication to the project with utilities, filter, security configuration, authentication service, user details service, and an auth controller for register/login with BCrypt and 24h token expiry; protect /products/** and allow /auth/**; return JWT on login. Only plug in the required files.

**Use Case:** Implement JWT-based authentication with user registration/login, token generation, and endpoint security.

## Prompt 6
**Prompt:** resolve the errors

**Use Case:** Add JJWT dependencies to pom.xml to fix JWT compilation errors.


## Prompt 7
**Prompt:** just go through through the project and make sure things are working fine everything is alright

**Use Case:** Review entire project structure, verify compilation, fix Product.java Lombok annotations, remove invalid test dependencies from pom.xml, and clean up null checks in ProductController.


## Prompt 8
**Prompt:** { "details": "Internal server error", "message": "Content-Type 'text/plain;charset=UTF-8' is not supported", "timestamp": "2026-02-27T00:19:34.8893007", "status": 500 } in postman when i try to login

**Use Case:** Fix AuthController endpoints to explicitly require application/json content type for login and register.


## Prompt 9
**Prompt:** actually i wrote wrong the above thing error is shown when i try to register

**Use Case:** Clarified that the Content-Type error occurs on register endpoint, same fix applies.


## Prompt 10
**Prompt:** perform automation testing on this project and store all the testcases in docs/testcases.md

**Use Case:** Create ProductServiceTest with 6 unit tests (create, getById success/failure, getAll, update, delete), add spring-security-test dependency, run tests successfully (7/7 passed), and document all test cases including manual API testing scenarios in docs/testcases.md.


## Prompt 11
**Prompt:** minimal changes, no refactor of backend, only create new frontend files. You are a frontend expert. Generate a simple HTML/CSS/JS frontend for my existing Ekart backend. Include: a login page for JWT auth (store token in localStorage), logout, a home page showing products, ability to add/update products, a cart page with add-to-cart (+/-), remove item, and clear cart. Use the backend endpoints automatically and map them correctly based on standard REST naming. Create clean, simple UI with EKART as the site title. Keep responses token-friendly and generate only necessary frontend files.

**Use Case:** Create complete frontend with login.html, register.html, home.html (products with CRUD), cart.html (add/remove/clear), CSS styling, and JavaScript for auth, products, and cart management using localStorage for JWT and cart data.


## Prompt 12
**Prompt:** Generate the documentation files inside /docs folder: 1. HLD.md → full architecture, layers, JWT flow, DB design 2. api-endpoints.md → list all endpoints with examples 3. execution-steps.md → how to run the app,how to start front end and backend together in vs code alternatives as well like by shell/cmd by run ,go live , DB setup, Postman setup

**Use Case:** Create comprehensive documentation covering system architecture with JWT flow and database design (HLD.md), complete API reference with cURL and Postman examples (api-endpoints.md), and detailed execution instructions for running backend/frontend using VS Code, command line, Live Server, and Postman setup (execution-steps.md).


## Prompt 13
**Prompt:** add one more document also which store all the logs of whatever action i will be performing

**Use Case:** Create activity-log.md to track all project activities with timestamps, action types, and descriptions for maintaining a complete audit trail of development work.


## Prompt 14
**Prompt:** Error: Failed to fetch when i try to login or register so check is front end and backend connected check for cors issue if it exsist ,make then work together

**Use Case:** Fixed CORS issue by adding CorsConfiguration in SecurityConfig to allow frontend origins (localhost:8000, 127.0.0.1:5500, file://) with all HTTP methods and headers enabled.


## Prompt 17
**Prompt:** Make only minimal, scoped changes. Do NOT refactor or modify unrelated files. add new fields to product : brand, category, releaseDate, productAvailable, stockQuantity, imageName, imageType, imageData adn other fields as required. make sure to make corresponding controllers ,services to handle them and reflect the changes in front end too

**Use Case:** Added 8 new fields to Product entity (brand, category, releaseDate, productAvailable, stockQuantity, imageName, imageType, imageData), created image upload endpoint in ProductController, updated ProductService with createWithImage method, and updated frontend to display images and new fields with file upload support.


## Prompt 18
**Prompt:** Resolve the errors, as the test files should be updated too

**Use Case:** Updated ProductServiceTest to use new Product constructor with 8 additional fields (passing null for new fields), all 6 tests now passing successfully.


## Prompt 19
**Prompt:** check the endpoints as products are not displaying on the front page, neither the product getting save and also front should be like only admin is able to add product not user , as we have defined two roles user and admin ,

**Use Case:** Added role-based access control to SecurityConfig (ADMIN and CUSTOMER can access products), identified that backend is already running on port 8080, need to verify database connection and test endpoints.


## Prompt 20
**Prompt:** can you check if end points are working or not

**Use Case:** Fixed duplicate @PostMapping conflict in ProductController by separating image upload to /upload endpoint, verified compilation successful, all 7 product endpoints configured correctly.


## Prompt 21
**Prompt:** add one more feature searchProduct controller which takes request param and we are able to search for specific product when by keyword ,it can be description,category,name etc

**Use Case:** Added search functionality with GET /api/products/search?keyword={keyword} endpoint that searches across name, description, and category fields (case-insensitive).
