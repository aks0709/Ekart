# High Level Design (HLD) - EKART FastAPI Backend

## 1. System Overview

EKART FastAPI backend is a Python-based REST API that provides identical functionality to the Java Spring Boot backend. It maintains 100% API contract compatibility while leveraging modern Python frameworks.

**Tech Stack:**
- Backend: FastAPI 0.115.0, Python 3.13
- Database: PostgreSQL (shared with Java backend)
- ORM: SQLAlchemy 2.0.36
- Security: JWT (python-jose)
- Validation: Pydantic 2.10.3
- Testing: pytest 8.3.4
- Server: Uvicorn 0.32.0

**Port:** 8001 (Java backend uses 8080)

---

## 2. Architecture Layers

### 2.1 FastAPI Backend Architecture
```
┌─────────────────────────────────────────────┐
│      FastAPI Application (Port 8001)        │
├─────────────────────────────────────────────┤
│            Router Layer                     │
│  - auth.py (/auth)                          │
│  - product.py (/api/products)               │
│  - cart.py (/api/cart)                      │
├─────────────────────────────────────────────┤
│            Service Layer                    │
│  - AuthService (User registration/login)    │
│  - ProductService (Business logic)          │
│  - CartService (Cart operations)            │
├─────────────────────────────────────────────┤
│          Repository Layer                   │
│  - UserRepository (Data access)             │
│  - ProductRepository (Data access)          │
│  - CartRepository (Data access)             │
├─────────────────────────────────────────────┤
│            Model Layer                      │
│  - SQLAlchemy Models (User, Product, etc.)  │
│  - Pydantic Schemas (Validation)            │
├─────────────────────────────────────────────┤
│            Core Layer                       │
│  - config.py (Settings)                     │
│  - database.py (DB connection)              │
│  - security.py (JWT, password hashing)      │
│  - exceptions.py (Error handling)           │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          Database (PostgreSQL)              │
│  - users, products, carts, cart_items       │
└─────────────────────────────────────────────┘
```

### 2.2 Project Structure
```
backend-py/
├── app/
│   ├── core/                    # Core infrastructure
│   │   ├── config.py           # Environment settings
│   │   ├── database.py         # SQLAlchemy setup
│   │   ├── security.py         # JWT & password hashing
│   │   └── exceptions.py       # Custom exceptions
│   ├── models/                  # SQLAlchemy models
│   │   ├── user.py             # User entity
│   │   ├── product.py          # Product entity
│   │   ├── cart.py             # Cart entity
│   │   ├── cart_item.py        # CartItem entity
│   │   └── role.py             # Role enum
│   ├── schemas/                 # Pydantic schemas
│   │   ├── auth.py             # Auth DTOs
│   │   ├── product.py          # Product DTOs
│   │   └── cart.py             # Cart DTOs
│   ├── routers/                 # API endpoints
│   │   ├── auth.py             # Auth routes
│   │   ├── product.py          # Product routes
│   │   └── cart.py             # Cart routes
│   ├── services/                # Business logic
│   │   ├── auth_service.py
│   │   ├── product_service.py
│   │   └── cart_service.py
│   ├── repositories/            # Data access
│   │   ├── user_repository.py
│   │   ├── product_repository.py
│   │   └── cart_repository.py
│   └── middleware/              # Custom middleware
├── tests/                       # Test files
├── uploads/                     # Image storage
├── main.py                      # Application entry
├── requirements.txt             # Dependencies
└── .env                         # Configuration
```

---

## 3. Component Details

### 3.1 Core Layer

#### config.py (Settings Management)
```python
class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10485760  # 10MB
```

#### database.py (SQLAlchemy Setup)
```python
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

#### security.py (JWT & Password)
```python
# Password hashing with bcrypt
pwd_context = CryptContext(schemes=["bcrypt"])

# JWT token creation/validation
def create_access_token(data: dict) -> str
def decode_token(token: str) -> dict
def get_current_user(credentials) -> User
```

#### exceptions.py (Error Handling)
```python
class BusinessException(Exception)
class NotFoundException(BusinessException)
class UnauthorizedException(BusinessException)
class BadRequestException(BusinessException)
```

### 3.2 Model Layer (SQLAlchemy)

#### User Model
```python
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(Role), nullable=False)
```

#### Product Model
```python
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Numeric(19, 2), nullable=False)
    description = Column(String(1000))
    stock = Column(Integer)
    brand = Column(String)
    category = Column(String)
    release_date = Column(Date)
    product_available = Column(Boolean)
    image_name = Column(String)
    image_type = Column(String)
    image_data = Column(LargeBinary)
```

#### Cart & CartItem Models
```python
class Cart(Base):
    __tablename__ = "carts"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    items = relationship("CartItem", cascade="all, delete-orphan")

class CartItem(Base):
    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey("carts.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer)
```

### 3.3 Schema Layer (Pydantic)

#### Auth Schemas
```python
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str (min_length=6)
    role: Role

class UserLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    token: str
    role: str
```

#### Product Schemas
```python
class ProductBase(BaseModel):
    name: str
    price: Decimal (ge=0)
    description: Optional[str] (max_length=1000)
    stock: Optional[int] (ge=0)
    brand: Optional[str]
    category: Optional[str]
    releaseDate: Optional[date]
    productAvailable: Optional[bool]

class ProductResponse(ProductBase):
    id: int
    imageName: Optional[str]
    imageType: Optional[str]
```

### 3.4 Repository Layer

#### UserRepository
```python
class UserRepository:
    def get_by_id(user_id: int) -> User
    def get_by_email(email: str) -> User
    def create(user: User) -> User
```

#### ProductRepository
```python
class ProductRepository:
    def get_by_id(product_id: int) -> Product
    def get_all() -> List[Product]
    def create(product: Product) -> Product
    def update(product: Product) -> Product
    def delete(product: Product) -> None
    def search(keyword: str) -> List[Product]
```

#### CartRepository
```python
class CartRepository:
    def get_by_user_id(user_id: int) -> Cart
    def create(cart: Cart) -> Cart
    def get_cart_item(cart_id, product_id) -> CartItem
    def add_item(cart_item: CartItem) -> CartItem
    def update_item(cart_item: CartItem) -> CartItem
```

### 3.5 Service Layer

#### AuthService
```python
class AuthService:
    def register(user_data: dict) -> dict:
        # 1. Check if email exists
        # 2. Hash password
        # 3. Create user
        # 4. Generate JWT token
        # 5. Return {token, role}
    
    def login(email: str, password: str) -> dict:
        # 1. Validate credentials
        # 2. Generate JWT token
        # 3. Return {token, role}
```

#### ProductService
```python
class ProductService:
    def create_with_image(product_data, image_data) -> Product
    def get_by_id(product_id: int) -> Product
    def get_all() -> List[Product]
    def update(product_id: int, product_data) -> Product
    def delete(product_id: int) -> None
    def search(keyword: str) -> List[Product]
```

#### CartService
```python
class CartService:
    def add_to_cart(user_id, product_id, quantity) -> Cart:
        # 1. Validate user and product
        # 2. Get or create cart
        # 3. Add/update cart item
        # 4. Return updated cart
```

### 3.6 Router Layer (API Endpoints)

#### Auth Router
```python
POST /auth/register
    Request: {name, email, password, role}
    Response: {token, role}

POST /auth/login
    Request: {email, password}
    Response: {token, role}
```

#### Product Router
```python
POST /api/products (multipart/form-data)
    Request: product (JSON file), image (optional file)
    Response: Product object

GET /api/products
    Response: List[Product]

GET /api/products/{id}
    Response: Product object

GET /api/products/{id}/image
    Response: Binary image data

GET /api/products/search?keyword={keyword}
    Response: List[Product]

PUT /api/products/{id}
    Request: Product object
    Response: Updated product

DELETE /api/products/{id}
    Response: 204 No Content
```

#### Cart Router
```python
POST /api/cart/add?userId={id}&productId={id}&quantity={n}
    Response: Cart object with items
```

---

## 4. JWT Authentication Flow

### 4.1 Registration Flow
```
Frontend
    │
    │ POST /auth/register
    │ {name, email, password, role}
    ↓
auth.router.register()
    │
    ↓
AuthService.register()
    │ 1. Check email uniqueness
    │ 2. Hash password (bcrypt)
    │ 3. Create User model
    │ 4. Save to DB via UserRepository
    │ 5. Generate JWT token
    ↓
security.create_access_token()
    │ Payload: {"sub": user_id}
    │ Algorithm: HS256
    │ Expiry: 24 hours
    ↓
Response: {token: "eyJhbGc...", role: "CUSTOMER"}
    │
    ↓
Frontend stores in localStorage
```

### 4.2 Login Flow
```
Frontend
    │
    │ POST /auth/login
    │ {email, password}
    ↓
auth.router.login()
    │
    ↓
AuthService.login()
    │ 1. Get user by email
    │ 2. Verify password (bcrypt)
    │ 3. Generate JWT token
    ↓
security.create_access_token()
    │
    ↓
Response: {token: "eyJhbGc...", role: "ADMIN"}
```

### 4.3 Protected Request Flow
```
Frontend
    │
    │ GET /api/products
    │ Header: Authorization: Bearer <token>
    ↓
FastAPI Dependency: get_current_user()
    │ 1. Extract token from header
    │ 2. Decode and validate token
    │ 3. Extract user_id from payload
    │ 4. Load user from DB
    │ 5. Return User object
    ↓
product.router.get_all_products()
    │ User is available as dependency
    ↓
ProductService.get_all()
    │
    ↓
ProductRepository.get_all()
    │
    ↓
Response: List[Product]
```

---

## 5. Database Integration

### 5.1 Connection Management
```python
# Connection pooling via SQLAlchemy
engine = create_engine(
    DATABASE_URL,
    pool_size=5,
    max_overflow=10
)

# Session management via dependency injection
def get_db():
    db = SessionLocal()
    try:
        yield db  # Request scope
    finally:
        db.close()  # Auto-cleanup
```

### 5.2 Field Name Mapping
SQLAlchemy automatically handles camelCase ↔ snake_case:

| JSON (Frontend)    | Python Model      | Database Column    |
|--------------------|-------------------|--------------------|
| releaseDate        | release_date      | release_date       |
| productAvailable   | product_available | product_available  |
| imageName          | image_name        | image_name         |
| imageType          | image_type        | image_type         |
| imageData          | image_data        | image_data         |

### 5.3 Database Schema
Uses the same PostgreSQL tables as Java backend:
- `users` (id, name, email, password, role)
- `products` (id, name, price, description, stock, brand, category, release_date, product_available, image_name, image_type, image_data)
- `carts` (id, user_id)
- `cart_items` (id, cart_id, product_id, quantity)

---

## 6. Security Architecture

### 6.1 Password Security
```python
# Hashing with bcrypt (strength: 12 rounds)
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash password
hashed = pwd_context.hash(plain_password)

# Verify password
is_valid = pwd_context.verify(plain_password, hashed)
```

### 6.2 JWT Token Structure
```
Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "sub": "123",           # User ID
  "exp": 1234654290       # Expiry timestamp
}

Signature:
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  SECRET_KEY
)
```

### 6.3 CORS Configuration
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # All origins (dev mode)
    allow_credentials=True,
    allow_methods=["*"],           # All HTTP methods
    allow_headers=["*"],           # All headers
)
```

### 6.4 Image Access
Images are served without authentication:
```python
# No Authorization header required
GET /api/products/{id}/image
    Response: Binary data with Content-Type header
    Cache-Control: max-age=3600
```

---

## 7. Request/Response Flow

### 7.1 Product Creation Flow
```
Frontend (React)
    │
    │ Create FormData
    │ - product: JSON Blob (application/json)
    │ - image: File (image/jpeg)
    ↓
POST /api/products (multipart/form-data)
    │
    ↓
product.router.create_product()
    │ 1. Parse product as UploadFile
    │ 2. Read and decode JSON
    │ 3. Read image bytes
    ↓
ProductService.create_with_image()
    │ 1. Create Product model
    │ 2. Attach image data
    ↓
ProductRepository.create()
    │ 1. Add to session
    │ 2. Commit transaction
    │ 3. Refresh model
    ↓
PostgreSQL INSERT
    │
    ↓
Response: ProductResponse (Pydantic)
    │ Automatic serialization
    ↓
Frontend receives JSON
```

### 7.2 Product Search Flow
```
Frontend
    │
    │ GET /api/products/search?keyword=laptop
    ↓
product.router.search_products()
    │
    ↓
ProductService.search()
    │
    ↓
ProductRepository.search()
    │ SQL: WHERE name ILIKE '%laptop%'
    │      OR description ILIKE '%laptop%'
    │      OR category ILIKE '%laptop%'
    ↓
PostgreSQL Query
    │
    ↓
Response: List[ProductResponse]
```

---

## 8. Error Handling

### 8.1 Exception Hierarchy
```
BusinessException (Base)
    ├── NotFoundException (404)
    ├── UnauthorizedException (401)
    └── BadRequestException (400)
```

### 8.2 Exception Handlers
```python
@app.exception_handler(BusinessException)
async def business_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.message}
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={
            "message": "Validation error",
            "details": [filtered errors]
        }
    )
```

### 8.3 Error Response Format
```json
{
  "message": "Product not found with id: 123",
  "status": 404
}
```

---

## 9. Middleware & Dependencies

### 9.1 Dependency Injection
```python
# Database session
db: Session = Depends(get_db)

# Current authenticated user
user: User = Depends(get_current_user)

# Usage in router
@router.get("/api/products")
def get_products(db: Session = Depends(get_db)):
    return ProductService(db).get_all()
```

### 9.2 Middleware Stack
```
Request
    ↓
CORS Middleware (allow all origins)
    ↓
Exception Handlers (catch errors)
    ↓
Router Matching
    ↓
Dependency Injection (DB, Auth)
    ↓
Route Handler
    ↓
Response Serialization (Pydantic)
    ↓
Response
```

---

## 10. Performance Optimizations

### 10.1 Database
- Connection pooling (5 connections, 10 overflow)
- Lazy loading for relationships
- Indexed columns (id, email)

### 10.2 Image Handling
- Cache-Control headers (1 hour)
- Direct binary response (no base64)
- Stored in database (bytea type)

### 10.3 Response Serialization
- Pydantic automatic validation
- JSON encoding via FastAPI
- Exclude None values

---

## 11. Testing Strategy

### 11.1 Unit Tests (pytest)
```python
# Test service layer
def test_auth_service_register()
def test_product_service_create()
def test_cart_service_add_to_cart()

# Test repository layer
def test_user_repository_get_by_email()
def test_product_repository_search()
```

### 11.2 Integration Tests
```python
# Test API endpoints
def test_register_endpoint()
def test_login_endpoint()
def test_create_product_endpoint()
```

### 11.3 Validation Scripts
- `validate.py` - Import and connection tests
- `test_api.py` - Live API endpoint tests
- `init_db.py` - Database initialization

---

## 12. Deployment Configuration

### 12.1 Environment Variables (.env)
```
DATABASE_URL=postgresql://user:pass@localhost:5432/ekart
SECRET_KEY=<256-bit-secret>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
```

### 12.2 Server Configuration
```python
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True  # Dev mode only
    )
```

### 12.3 Production Considerations
- Set `reload=False` in production
- Use environment-specific .env files
- Enable HTTPS/TLS
- Restrict CORS origins
- Add rate limiting
- Enable logging
- Use process manager (systemd, supervisor)

---

## 13. API Contract Compatibility

### 13.1 Endpoint Mapping
| Java Spring Boot          | FastAPI                   | Status |
|---------------------------|---------------------------|--------|
| POST /auth/register       | POST /auth/register       | ✅     |
| POST /auth/login          | POST /auth/login          | ✅     |
| POST /api/products        | POST /api/products        | ✅     |
| GET /api/products         | GET /api/products         | ✅     |
| GET /api/products/{id}    | GET /api/products/{id}    | ✅     |
| GET /api/products/{id}/image | GET /api/products/{id}/image | ✅  |
| GET /api/products/search  | GET /api/products/search  | ✅     |
| PUT /api/products/{id}    | PUT /api/products/{id}    | ✅     |
| DELETE /api/products/{id} | DELETE /api/products/{id} | ✅     |
| POST /api/cart/add        | POST /api/cart/add        | ✅     |

### 13.2 Request/Response Compatibility
- ✅ Same JSON structure
- ✅ Same field names (camelCase)
- ✅ Same data types
- ✅ Same HTTP status codes
- ✅ Same error format
- ✅ Same multipart handling
- ✅ Same JWT format

---

## 14. Migration Benefits

### 14.1 Code Simplicity
- Less boilerplate than Spring Boot
- Automatic API documentation (Swagger/ReDoc)
- Built-in validation (Pydantic)
- Async support (future enhancement)

### 14.2 Developer Experience
- Fast reload during development
- Interactive API docs at /docs
- Type hints throughout
- Simple dependency injection

### 14.3 Performance
- Lightweight framework
- Fast JSON serialization
- Efficient async I/O (when needed)
- Lower memory footprint

---

## 15. Monitoring & Logging

### 15.1 Logging
```python
import logging

logger = logging.getLogger(__name__)
logger.info("Product created: %s", product.name)
logger.error("Failed to create product: %s", error)
```

### 15.2 Health Check
```python
@app.get("/")
def root():
    return {"message": "Ekart API", "status": "healthy"}
```

### 15.3 Metrics (Future)
- Request count
- Response time
- Error rate
- Database query time

---

## 16. Summary

The FastAPI backend provides a modern, Python-based alternative to the Java Spring Boot backend while maintaining complete API compatibility. It uses industry-standard libraries (SQLAlchemy, Pydantic, python-jose) and follows clean architecture principles with clear separation of concerns across routers, services, repositories, and models.

**Key Achievements:**
- ✅ 100% API contract compatibility
- ✅ Same database schema
- ✅ Same JWT authentication
- ✅ Same business logic
- ✅ Zero frontend changes required
- ✅ All Postman collections work unchanged

**Access Points:**
- API: http://localhost:8001
- Swagger Docs: http://localhost:8001/docs
- ReDoc: http://localhost:8001/redoc
