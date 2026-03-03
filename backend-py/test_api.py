import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_health():
    print("\n=== Testing Health Check ===")
    r = requests.get(f"{BASE_URL}/")
    print(f"Status: {r.status_code}")
    print(f"Response: {r.json()}")
    return r.status_code == 200

def test_register():
    print("\n=== Testing User Registration ===")
    data = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123",
        "role": "CUSTOMER"
    }
    r = requests.post(f"{BASE_URL}/auth/register", json=data)
    print(f"Status: {r.status_code}")
    print(f"Response: {r.json()}")
    if r.status_code == 200:
        return r.json().get("token")
    return None

def test_login():
    print("\n=== Testing User Login ===")
    data = {"email": "test@example.com", "password": "password123"}
    r = requests.post(f"{BASE_URL}/auth/login", json=data)
    print(f"Status: {r.status_code}")
    print(f"Response: {r.json()}")
    if r.status_code == 200:
        return r.json().get("token")
    return None

def test_create_product():
    print("\n=== Testing Product Creation ===")
    product_data = {
        "name": "Test Product",
        "price": 99.99,
        "description": "Test description",
        "stock": 10,
        "brand": "TestBrand",
        "category": "Electronics",
        "releaseDate": "2024-01-01",
        "productAvailable": True
    }
    files = {"product": (None, json.dumps(product_data), "application/json")}
    r = requests.post(f"{BASE_URL}/api/products", files=files)
    print(f"Status: {r.status_code}")
    print(f"Response: {r.json()}")
    if r.status_code == 201:
        return r.json().get("id")
    return None

def test_get_products():
    print("\n=== Testing Get All Products ===")
    r = requests.get(f"{BASE_URL}/api/products")
    print(f"Status: {r.status_code}")
    print(f"Products count: {len(r.json())}")
    return r.status_code == 200

def test_search_products():
    print("\n=== Testing Product Search ===")
    r = requests.get(f"{BASE_URL}/api/products/search", params={"keyword": "Test"})
    print(f"Status: {r.status_code}")
    print(f"Results: {len(r.json())}")
    return r.status_code == 200

if __name__ == "__main__":
    print("Starting FastAPI Backend Tests...")
    print("Make sure the server is running on port 8000")
    time.sleep(1)
    
    try:
        test_health()
        token = test_register()
        if not token:
            token = test_login()
        product_id = test_create_product()
        test_get_products()
        test_search_products()
        
        print("\n=== All Tests Completed ===")
    except Exception as e:
        print(f"\nError: {e}")
