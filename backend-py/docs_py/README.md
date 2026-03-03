# Ekart FastAPI Backend

Python FastAPI backend for Ekart e-commerce application.

## Project Structure

```
backend-py/
├── app/
│   ├── core/           # Core configuration, database, security
│   ├── models/         # SQLAlchemy models (entities)
│   ├── schemas/        # Pydantic models (DTOs)
│   ├── routers/        # API endpoints (controllers)
│   ├── services/       # Business logic
│   ├── repositories/   # Data access layer
│   ├── middleware/     # Custom middleware
│   └── utils/          # Utility functions
├── tests/              # Test files
├── uploads/            # Uploaded files (images)
├── main.py             # Application entry point
├── requirements.txt    # Python dependencies
└── .env                # Environment variables
```

## Setup

1. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
- Update `.env` with your database credentials
- Ensure PostgreSQL is running

4. Run the application:
```bash
python main.py
```

Or with uvicorn directly:
```bash
uvicorn main:app --reload --port 8000
```

## API Documentation

Once running, access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing

```bash
pytest
```

## Migration Status

This is a direct migration from Java Spring Boot to Python FastAPI.
All API contracts, endpoints, and database schema remain unchanged.
