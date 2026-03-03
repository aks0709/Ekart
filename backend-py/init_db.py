from app.core.database import engine
from app.models.base import Base
from app.models import User, Product, Cart, CartItem

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")
print("\nTables:")
for table in Base.metadata.sorted_tables:
    print(f"  - {table.name}")
