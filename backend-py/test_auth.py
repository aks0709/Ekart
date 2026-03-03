from app.core.security import get_password_hash, verify_password

# Test bcrypt
password = "test123"
hashed = get_password_hash(password)
print(f"Hash: {hashed[:50]}...")
print(f"Verify: {verify_password(password, hashed)}")
print("Auth working!")
