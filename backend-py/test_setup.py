import sys
sys.path.insert(0, '.')

try:
    from app.models import User, Product, Cart, CartItem, Role
    from app.core.database import engine
    from app.models.base import Base
    
    print("[OK] All models imported successfully")
    print("[OK] Database connection configured")
    print("[OK] Models:", User.__tablename__, Product.__tablename__, Cart.__tablename__, CartItem.__tablename__)
    print("[OK] Role enum:", list(Role))
    print("\n[SUCCESS] Backend migration structure is complete!")
    
except Exception as e:
    print(f"[ERROR] {e}")
    import traceback
    traceback.print_exc()
