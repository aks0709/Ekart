import sys
sys.path.insert(0, '.')

print("=" * 60)
print("FastAPI Backend Migration Validation")
print("=" * 60)

errors = []
warnings = []

# Test 1: Import all models
print("\n[1/8] Testing Models...")
try:
    from app.models import User, Product, Cart, CartItem, Role, Base
    print("  [OK] All models imported")
except Exception as e:
    errors.append(f"Models: {e}")
    print(f"  [ERROR] {e}")

# Test 2: Import all schemas
print("\n[2/8] Testing Schemas...")
try:
    from app.schemas.auth import UserRegister, UserLogin, TokenResponse
    from app.schemas.product import ProductCreate, ProductResponse
    from app.schemas.cart import CartResponse
    print("  [OK] All schemas imported")
except Exception as e:
    errors.append(f"Schemas: {e}")
    print(f"  [ERROR] {e}")

# Test 3: Import all repositories
print("\n[3/8] Testing Repositories...")
try:
    from app.repositories.user_repository import UserRepository
    from app.repositories.product_repository import ProductRepository
    from app.repositories.cart_repository import CartRepository
    print("  [OK] All repositories imported")
except Exception as e:
    errors.append(f"Repositories: {e}")
    print(f"  [ERROR] {e}")

# Test 4: Import all services
print("\n[4/8] Testing Services...")
try:
    from app.services.auth_service import AuthService
    from app.services.product_service import ProductService
    from app.services.cart_service import CartService
    print("  [OK] All services imported")
except Exception as e:
    errors.append(f"Services: {e}")
    print(f"  [ERROR] {e}")

# Test 5: Import all routers
print("\n[5/8] Testing Routers...")
try:
    from app.routers import auth, product, cart
    print("  [OK] All routers imported")
except Exception as e:
    errors.append(f"Routers: {e}")
    print(f"  [ERROR] {e}")

# Test 6: Import core modules
print("\n[6/8] Testing Core Modules...")
try:
    from app.core.config import settings
    from app.core.database import engine, get_db
    from app.core.security import create_access_token, verify_password
    from app.core.exceptions import BusinessException
    print("  [OK] All core modules imported")
except Exception as e:
    errors.append(f"Core: {e}")
    print(f"  [ERROR] {e}")

# Test 7: Test database connection
print("\n[7/8] Testing Database Connection...")
try:
    from app.core.database import engine
    with engine.connect() as conn:
        print("  [OK] Database connection successful")
except Exception as e:
    warnings.append(f"Database: {e}")
    print(f"  [WARNING] {e}")

# Test 8: Import main app
print("\n[8/8] Testing Main Application...")
try:
    from main import app
    print("  [OK] FastAPI app imported")
    print(f"  [INFO] Routes: {len(app.routes)}")
except Exception as e:
    errors.append(f"Main app: {e}")
    print(f"  [ERROR] {e}")

# Summary
print("\n" + "=" * 60)
print("VALIDATION SUMMARY")
print("=" * 60)

if not errors and not warnings:
    print("\n[SUCCESS] All validations passed!")
    print("\nYou can now start the server:")
    print("  python main.py")
    print("\nOr use:")
    print("  start.bat")
elif errors:
    print(f"\n[FAILED] {len(errors)} error(s) found:")
    for err in errors:
        print(f"  - {err}")
else:
    print(f"\n[WARNING] {len(warnings)} warning(s):")
    for warn in warnings:
        print(f"  - {warn}")
    print("\nServer can still run, but check warnings.")

print("\n" + "=" * 60)
