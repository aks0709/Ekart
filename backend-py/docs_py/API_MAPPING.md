# API Endpoint Mapping: Java Spring Boot → FastAPI

## Authentication Endpoints

### Register
- **Java**: `POST /auth/register`
- **Python**: `POST /auth/register`
- **Request**: `{"name": "string", "email": "string", "password": "string", "role": "ADMIN|CUSTOMER"}`
- **Response**: `{"token": "string", "role": "string"}`
- ✅ **Status**: Identical

### Login
- **Java**: `POST /auth/login`
- **Python**: `POST /auth/login`
- **Request**: `{"email": "string", "password": "string"}`
- **Response**: `{"token": "string", "role": "string"}`
- ✅ **Status**: Identical

## Product Endpoints

### Create Product
- **Java**: `POST /api/products` (multipart/form-data)
- **Python**: `POST /api/products` (multipart/form-data)
- **Request**: `product` (JSON) + `image` (file, optional)
- **Response**: Product object with id
- ✅ **Status**: Identical

### Get Product by ID
- **Java**: `GET /api/products/{id}`
- **Python**: `GET /api/products/{id}`
- **Response**: Product object
- ✅ **Status**: Identical

### Get Product Image
- **Java**: `GET /api/products/{id}/image`
- **Python**: `GET /api/products/{id}/image`
- **Response**: Binary image data with Content-Type header
- ✅ **Status**: Identical (no auth required)

### Get All Products
- **Java**: `GET /api/products`
- **Python**: `GET /api/products`
- **Response**: Array of products
- ✅ **Status**: Identical

### Update Product
- **Java**: `PUT /api/products/{id}` (application/json)
- **Python**: `PUT /api/products/{id}` (application/json)
- **Request**: Product object
- **Response**: Updated product
- ✅ **Status**: Identical

### Delete Product
- **Java**: `DELETE /api/products/{id}`
- **Python**: `DELETE /api/products/{id}`
- **Response**: 204 No Content
- ✅ **Status**: Identical

### Search Products
- **Java**: `GET /api/products/search?keyword={keyword}`
- **Python**: `GET /api/products/search?keyword={keyword}`
- **Response**: Array of matching products
- ✅ **Status**: Identical

## Cart Endpoints

### Add to Cart
- **Java**: `POST /api/cart/add?userId={id}&productId={id}&quantity={n}`
- **Python**: `POST /api/cart/add?userId={id}&productId={id}&quantity={n}`
- **Response**: Cart object with items
- ✅ **Status**: Identical

## Database Schema

All tables remain unchanged:
- `users` (id, name, email, password, role)
- `products` (id, name, price, description, stock, brand, category, release_date, product_available, image_name, image_type, image_data)
- `carts` (id, user_id)
- `cart_items` (id, cart_id, product_id, quantity)

## Field Name Mapping

JSON (camelCase) → Database (snake_case):
- `releaseDate` → `release_date`
- `productAvailable` → `product_available`
- `imageName` → `image_name`
- `imageType` → `image_type`
- `imageData` → `image_data`

SQLAlchemy handles this automatically.

## Authentication

- **Java**: JWT with Spring Security filter
- **Python**: JWT with FastAPI dependency injection
- **Token format**: Identical (HS256, same secret key)
- **Token expiration**: 24 hours (both)

## CORS

Both backends allow all origins for development.

## Image Handling

- Stored in database as bytea/LargeBinary
- Served directly without authentication
- Content-Type header preserved
- Cache-Control: max-age=3600

## Summary

✅ All API contracts preserved
✅ All endpoints identical
✅ All request/response formats identical
✅ Database schema unchanged
✅ Frontend requires ZERO changes
✅ Postman collections work without modification
