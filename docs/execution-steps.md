# Execution Steps - EKART Application

## Prerequisites

### Required Software
- **Java**: JDK 21 or higher
- **PostgreSQL**: Version 17.6 or higher
- **Maven**: 3.6+ (or use included Maven wrapper)
- **Node.js**: 16+ and npm
- **VS Code** (optional): With extensions
- **Web Browser**: Chrome, Firefox, or Edge

---

## 1. Database Setup

### 1.1 Install PostgreSQL
Download and install PostgreSQL from: https://www.postgresql.org/download/

### 1.2 Create Database
Open PostgreSQL command line (psql) or pgAdmin and run:

```sql
CREATE DATABASE ekart;
```

### 1.3 Verify Database Connection
```sql
\c ekart
\dt
```

### 1.4 Configure Database Credentials
Edit `Ekart/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ekart
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD_HERE
```

**Note**: Replace `YOUR_PASSWORD_HERE` with your PostgreSQL password.

---

## 2. Backend Setup & Execution

### Method 1: Using VS Code

#### Step 1: Open Project
1. Open VS Code
2. File → Open Folder
3. Select `Ekart/Ekart` folder

#### Step 2: Install Extensions
- Extension Pack for Java (Microsoft)
- Spring Boot Extension Pack (VMware)

#### Step 3: Run Application
1. Open `EkartApplication.java`
2. Click "Run" button above the main method
3. Or press `F5`

**Expected Output**:
```
Ekart Application Started Successfully!
```

---

### Method 2: Using Command Line (Windows)

#### Navigate to Project Directory
```cmd
cd C:\Users\akum1183\OneDrive - Capgemini\Documents\Ekart\Ekart
```

#### Run with Maven Wrapper
```cmd
mvnw.cmd spring-boot:run
```

#### Alternative: Build and Run JAR
```cmd
mvnw.cmd clean package
java -jar target\Ekart-0.0.1-SNAPSHOT.jar
```

---

### Method 3: Using Command Line (Linux/Mac)

#### Navigate to Project Directory
```bash
cd /path/to/Ekart/Ekart
```

#### Run with Maven Wrapper
```bash
./mvnw spring-boot:run
```

#### Alternative: Build and Run JAR
```bash
./mvnw clean package
java -jar target/Ekart-0.0.1-SNAPSHOT.jar
```

---

### Method 4: Using Maven (if installed globally)

```cmd
mvn spring-boot:run
```

---

### Verify Backend is Running

**Check Console Output**:
```
Started EkartApplication in X.XXX seconds
Ekart Application Started Successfully!
```

**Test API**:
Open browser and navigate to:
```
http://localhost:8080/auth/login
```

You should see a 405 error (Method Not Allowed) - this is expected for GET request.

---

## 3. React Frontend Setup & Execution

### Step 1: Navigate to React Frontend Directory
```cmd
cd C:\Users\akum1183\OneDrive - Capgemini\Documents\Ekart\ReactFrontEnd
```

### Step 2: Install Dependencies
```cmd
npm install
```

This will install:
- React 18.2
- React Router 6
- TailwindCSS 3.4
- All required dependencies

### Step 3: Start React Development Server
```cmd
npm start
```

**Expected Output**:
```
Compiled successfully!

You can now view ekart-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Access URL**: `http://localhost:3000`

### Step 4: Verify React App
- Browser should automatically open to `http://localhost:3000`
- You should see the Login page
- Check browser console for any errors

---

## 4. Running Backend & Frontend Together

### Option 1: VS Code Split Terminal

#### Terminal 1 (Backend)
```cmd
cd C:\Users\akum1183\OneDrive - Capgemini\Documents\Ekart\Ekart
mvnw.cmd spring-boot:run
```

#### Terminal 2 (React Frontend)
```cmd
cd C:\Users\akum1183\OneDrive - Capgemini\Documents\Ekart\ReactFrontEnd
npm start
```

---

### Option 2: Separate Command Windows

#### Window 1: Backend
```cmd
cd C:\Users\akum1183\OneDrive - Capgemini\Documents\Ekart\Ekart
mvnw.cmd spring-boot:run
```

#### Window 2: React Frontend
```cmd
cd C:\Users\akum1183\OneDrive - Capgemini\Documents\Ekart\ReactFrontEnd
npm start
```

---

## 5. Application Usage Flow

### Step 1: Start Backend
Ensure backend is running on `http://localhost:8080`

### Step 2: Start React Frontend
Ensure React app is running on `http://localhost:3000`

### Step 3: Register User
1. Navigate to `http://localhost:3000`
2. Click "Register" link
3. Fill in details:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Role: CUSTOMER or ADMIN
4. Click "Register"
5. You'll be redirected to home page

### Step 4: Login (if already registered)
1. Enter email and password
2. Click "Login"
3. Redirected to home page

### Step 5: Browse Products (All Users)
- View all products with images
- Use search bar to filter products
- Apply category/brand filters
- Sort by price (low to high, high to low)
- Click product card to view details

### Step 6: Manage Products (Admin Only)
- Click "Add Product" in navbar
- Fill form with product details and upload image
- Click "Update" on product cards to edit
- Click "Delete" to remove products

### Step 7: Shopping Cart (Customer)
- Click "Add to Cart" on product cards
- Navigate to Cart page
- Adjust quantities with +/- buttons
- Remove items or clear entire cart
- Click "Place Order" (shows confirmation dialog)

### Step 8: Logout
Click "Logout" button in navigation bar

---

## 6. React App Features

### Pages
- `/login` - User authentication
- `/register` - User registration with role selection
- `/` - Home page with product listing
- `/product/:id` - Product detail view
- `/cart` - Shopping cart
- `/add-product` - Add new product (Admin only)
- `/edit-product/:id` - Edit product (Admin only)

### Key Features
- **Authentication**: JWT token stored in localStorage
- **Role-Based Access**: Admin sees CRUD controls, Customer sees cart
- **Live Search**: Filter products as you type
- **Filters**: Category, Brand
- **Sort**: Price low to high, high to low
- **Cart Management**: Add, remove, update quantity, clear cart
- **Image Upload**: Multipart form data with preview
- **Toast Notifications**: Success/error feedback
- **Responsive Design**: TailwindCSS mobile-first approach

---

## 7. Postman Setup

### Step 1: Import Collection

#### Create New Collection
1. Open Postman
2. Click "New" → "Collection"
3. Name it "EKART API"

#### Add Requests

**Register**:
- Method: POST
- URL: `http://localhost:8080/auth/register`
- Body (raw JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

**Login**:
- Method: POST
- URL: `http://localhost:8080/auth/login`
- Body (raw JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get All Products**:
- Method: GET
- URL: `http://localhost:8080/api/products`
- Headers: `Authorization: Bearer <token>`

**Create Product**:
- Method: POST
- URL: `http://localhost:8080/api/products`
- Headers: `Authorization: Bearer <token>`
- Body (raw JSON):
```json
{
  "name": "Laptop",
  "price": 999.99,
  "description": "Gaming laptop",
  "stock": 10
}
```

---

### Step 2: Setup Environment Variables

1. Click "Environments" → "Create Environment"
2. Name: "EKART Local"
3. Add variables:
   - `base_url`: `http://localhost:8080`
   - `token`: (leave empty, will be set automatically)

---

### Step 3: Auto-Save Token

Add to Login/Register request "Tests" tab:
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.environment.set('token', jsonData.token);
}
```

---

### Step 4: Use Token in Requests

For authenticated endpoints, add header:
```
Authorization: Bearer {{token}}
```

---

## 8. Troubleshooting

### React Frontend Issues

#### Port 3000 Already in Use
```cmd
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

#### npm install fails
```cmd
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Reinstall
npm install
```

#### CORS Error
- Verify backend is running on port 8080
- Check SecurityConfig has `http://localhost:3000` in allowed origins
- Restart backend after CORS changes

#### Images Not Loading
- Check browser console for 401 errors
- Verify JWT token is in localStorage
- Check image endpoint returns data in Postman
- Ensure token is appended to image URL as query parameter

---

### Backend Issues

#### Port 8080 Already in Use
```cmd
# Find process using port 8080
netstat -ano | findstr :8080

# Kill process (replace PID)
taskkill /PID <PID> /F
```

#### Database Connection Failed
- Verify PostgreSQL is running
- Check credentials in `application.properties`
- Ensure database `ekart` exists

#### Maven Build Failed
```cmd
# Clean and rebuild
mvnw.cmd clean install
```

---

### Frontend Issues

#### CORS Error
- Ensure backend is running
- Use Live Server instead of file:// protocol
- Check browser console for errors

#### Token Not Stored
- Check browser localStorage (F12 → Application → Local Storage)
- Verify login/register response contains token

#### API Calls Failing
- Verify backend URL in JavaScript files (`API_URL`)
- Check token is present in localStorage
- Verify token hasn't expired (24 hours)

---

### Database Issues

#### Tables Not Created
- Check `spring.jpa.hibernate.ddl-auto=update` in application.properties
- Verify database connection
- Check console logs for Hibernate errors

#### Data Not Persisting
- Verify transaction management
- Check for validation errors in console

---

## 8. Testing the Application

### Manual Testing Checklist

- [ ] Backend starts successfully
- [ ] Database connection established
- [ ] User registration works
- [ ] User login works
- [ ] JWT token generated
- [ ] Products list loads
- [ ] Create product works
- [ ] Update product works
- [ ] Delete product works
- [ ] Add to cart works
- [ ] Cart displays correctly
- [ ] Quantity adjustment works
- [ ] Remove from cart works
- [ ] Clear cart works
- [ ] Logout works

---

### Automated Testing

#### Run Unit Tests
```cmd
mvnw.cmd test
```

#### Expected Output
```
Tests run: 7, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
```

---

## 9. Stopping the Application

### Stop Backend

#### VS Code
- Click "Stop" button in debug toolbar
- Or press `Shift+F5`

#### Command Line
- Press `Ctrl+C` in terminal

---

### Stop Frontend

#### Live Server
- Click "Port: 5500" in VS Code status bar
- Select "Stop Live Server"

#### HTTP Server
- Press `Ctrl+C` in terminal

---

## 11. Quick Start Commands

### Complete Setup (Windows)
```cmd
# Terminal 1: Start Backend
cd C:\Users\akum1183\OneDrive - Capgemini\Documents\Ekart\Ekart
mvnw.cmd spring-boot:run

# Terminal 2: Start React Frontend
cd C:\Users\akum1183\OneDrive - Capgemini\Documents\Ekart\ReactFrontEnd
npm start
```

### Access URLs
- **Backend API**: http://localhost:8080
- **React Frontend**: http://localhost:3000

---

## 12. Building for Production

### Build React App
```cmd
cd ReactFrontEnd
npm run build
```

This creates optimized production build in `build/` folder.

### Serve Production Build
```cmd
npm install -g serve
serve -s build -l 3000
```

### Build Backend JAR
```cmd
mvnw.cmd clean package -DskipTests
```

### Run Production JAR
```cmd
java -jar target/Ekart-0.0.1-SNAPSHOT.jar
```

### Environment Variables
```cmd
set SPRING_DATASOURCE_URL=jdbc:postgresql://prod-host:5432/ekart
set SPRING_DATASOURCE_USERNAME=prod_user
set SPRING_DATASOURCE_PASSWORD=prod_password
java -jar target/Ekart-0.0.1-SNAPSHOT.jar
```

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-27
