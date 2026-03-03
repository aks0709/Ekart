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


## Prompt 22
**Prompt:** You are a React expert. Build a beautiful, professional React frontend for my Ekart app using TailwindCSS and proper React routing (figure out routes yourself). Requirements: Login page (store JWT in localStorage), Logout, fixed Navbar. Home page: fetch + show all products with images and summary; click → detailed view. Live search that filters while typing; add sort + filter options. Cart page: add/remove/+/-/clear items; qty 1..stock; INR currency only; "Place Order" shows simple placeholder dialog. Admin-only: show "Add Product" on navbar and Update/Delete buttons on product cards; normal users don't see admin controls. Add Product / Update Product forms: use dropdowns where needed, validate inputs, show toast/dialog warnings on errors. Handle images correctly with backend endpoints. UI must be clean, modern, responsive with Tailwind. Build clean folder structure (components, pages, services, hooks, utils). Match backend endpoints + field names; don't modify backend logic. Goal: Full working frontend with clean routing, Tailwind styling, role-based UI, cart logic, and live search.

**Use Case:** Created complete React frontend with TailwindCSS, React Router, role-based access control, live search/filter/sort, shopping cart, product CRUD, and image handling.


## Prompt 23
**Prompt:** bro there is not option to register new user on login page

**Use Case:** Added Register page with role selection (ADMIN/CUSTOMER), linked from Login page, and added route in App.js.


## Prompt 24
**Prompt:** the react application is not working as login failed and doesnot register new user check the CORS issue ,cross origin thing

**Use Case:** Fixed CORS issue by adding http://localhost:3000 to allowed origins in SecurityConfig for React app.


## Prompt 25
**Prompt:** bro everything is working fine just check for add product and update product controllers , while accessing add product and update product , it entered all informations as requested but still it is updating or adding any product, check for endpoints , i even tried testing them on postman too it fails there too, and do your best ( im just asking instead of passing this many Request param how about two request part one is product itself and another is multipart image ,and dont dont make multiple post controller like you did one with image one without image ) this is just suggestion check it yourself and check for better alternatives too

**Use Case:** Refactored ProductController to use @RequestPart("product") for JSON and @RequestPart("image") for file, consolidated into single POST endpoint, updated ProductService to accept Product object directly.


## Prompt 26
**Prompt:** Do NOT change or redesign my backend APIs. Do NOT generate your own field names or routes. You must look at my Product model and ensure the Add Product / Update Product forms accept ONLY the correct data types defined in that model (BigDecimal, Integer, LocalDate, Boolean, etc.),not strings. Apply proper validation and show toast/dialog warnings for invalid or missing data. For the add-product request, keep the format exactly as my backend expects: JSON object sent as FormData field "product", image file sent as FormData field "image". Do not rewrite this into multiple @RequestParam values. Let the backend map directly into my Product model.and i guess mapping for image data is needed, Ensure image upload works with FormData and matches backend expectations. Do not assume endpoints; adapt to whatever exists in the project.

**Use Case:** Fixed frontend to send proper data types (parseFloat for BigDecimal, parseInt for Integer, Boolean, LocalDate string), send product as JSON Blob in FormData, added validation, and ensured type conversion matches Product model.


## Prompt 27
**Prompt:** Investigate why both add-product and update-product fail. Check if the frontend request format fully matches the backend controller signature. The backend uses @RequestPart("product") and @RequestPart("image"), so verify if the React code is sending FormData properly without overriding Content-Type. Also check if the backend's dual binding (RequestBody + RequestPart) in update may create ambiguity if the frontend sends JSON instead of multipart. Verify consistency between the Product model types (BigDecimal, Integer, Boolean, LocalDate) and the data the frontend is submitting. Ensure date formats, numeric types, null values, and optional fields are aligned. Look into image upload handling to confirm key names, file presence, and multipart structure match the backend expectation. Also verify API URLs, headers, and Authorization tokens are correct. Do not change backend logic unless absolutely necessary; find where the mismatch is happening and correct the frontend accordingly.

**Use Case:** Added multipart file size limits (10MB) in application.properties, created WebMvcConfig for JSON deserialization in @RequestPart, simplified UPDATE endpoint to remove ambiguous dual binding, added error handling in frontend API calls.


## Prompt 28
**Prompt:** {"details":"Internal server error","message":"could not execute statement [ERROR: column \"image_data\" is of type bytea but expression is of type bigint\n Hint: You will need to rewrite or cast the expression.\n Position: 149] [insert into products (brand,category,description,image_data,image_name,image_type,name,price,product_available,release_date,stock) values (?,?,?,?,?,?,?,?,?,?,?)]; SQL [insert into products (brand,category,description,image_data,image_name,image_type,name,price,product_available,release_date,stock) values (?,?,?,?,?,?,?,?,?,?,?)]","timestamp":"2026-03-03T19:19:41.8456973","status":500} on add product {"details":"Internal server error","message":"could not execute statement [ERROR: column \"image_data\" is of type bytea but expression is of type oid\n Hint: You will need to rewrite or cast the expression.\n Position: 68] [update products set brand=?,category=?,description=?,image_data=?,image_name=?,image_type=?,name=?,price=?,product_available=?,release_date=?,stock=? where id=?]; SQL [update products set brand=?,category=?,description=?,image_data=?,image_name=?,image_type=?,name=?,price=?,product_available=?,release_date=?,stock=? where id=?]]","timestamp":"2026-03-03T19:20:17.6639437","status":500} on update product ,please check for the issues

**Use Case:** Fixed PostgreSQL BYTEA issue by removing @Lob annotation (which creates OID type) and using explicit columnDefinition = "bytea" in Product model, added hibernate.jdbc.lob.non_contextual_creation=true property.


## Prompt 29
**Prompt:** but lob is used for very large object and image is very large object

**Use Case:** Explained that PostgreSQL's bytea type can handle large binary data (up to 1GB) without @Lob, and @Lob causes OID reference storage instead of actual bytes, leading to type mismatch errors.


## Prompt 30
**Prompt:** everything is working fine thanks ,but image is not displaying on homepage fix it

**Use Case:** Fixed image display by adding token as query parameter to image URLs (since <img> tags can't send Authorization headers), updated JwtAuthenticationFilter to accept token from query parameter for /image endpoints, added cache headers for better performance.
