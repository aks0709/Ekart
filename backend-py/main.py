from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.exceptions import RequestValidationError
from app.core.config import settings
from app.core.database import engine
from app.core.exceptions import BusinessException, business_exception_handler, validation_exception_handler
from app.models import base
from app.routers import auth, product, cart

app = FastAPI(title="Ekart API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handlers
app.add_exception_handler(BusinessException, business_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)

# Mount static files for image serving
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Create database tables
base.Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router)
app.include_router(product.router)
app.include_router(cart.router)

@app.get("/")
def root():
    return {"message": "Ekart API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
