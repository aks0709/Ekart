from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.auth import UserRegister, UserLogin
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    service = AuthService(db)
    return service.register(user.model_dump())

@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    service = AuthService(db)
    return service.login(credentials.email, credentials.password)
