# Quick Start Guide

## Prerequisites
- Python 3.11+
- PostgreSQL running on localhost:5432
- Database: `ekart` (same as Java backend)

## Setup

1. **Install dependencies** (already done):
```bash
pip install -r requirements.txt
```

2. **Initialize database**:
```bash
python init_db.py
```

3. **Start server**:
```bash
python main.py
```
Or use:
```bash
start.bat
```

## Access Points

- **API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Testing

Run API tests:
```bash
python test_api.py
```

## Port Configuration

- **Java Backend**: Port 8080
- **Python Backend**: Port 8000

Both can run simultaneously for comparison testing.

## Switching Frontend

Update frontend API base URL from:
```javascript
const API_URL = "http://localhost:8080";
```
To:
```javascript
const API_URL = "http://localhost:8000";
```

## Environment Variables

Edit `.env` file:
```
DATABASE_URL=postgresql://postgres:945725@localhost:5432/ekart
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

## Common Commands

**Stop server**: Ctrl+C

**Check logs**: Server logs print to console

**Reset database**: Drop tables in PostgreSQL and run `python init_db.py`

## Troubleshooting

**Port already in use**:
- Change port in `main.py`: `uvicorn.run(..., port=8001)`

**Database connection error**:
- Verify PostgreSQL is running
- Check credentials in `.env`
- Ensure `ekart` database exists

**Import errors**:
- Reinstall dependencies: `pip install -r requirements.txt`

## File Structure

```
backend-py/
├── app/
│   ├── core/          # Configuration & security
│   ├── models/        # Database models
│   ├── schemas/       # Request/response models
│   ├── routers/       # API endpoints
│   ├── services/      # Business logic
│   └── repositories/  # Data access
├── main.py            # Entry point
├── init_db.py         # Database setup
├── test_api.py        # API tests
└── start.bat          # Windows startup script
```
