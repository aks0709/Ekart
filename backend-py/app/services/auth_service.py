from sqlalchemy.orm import Session
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.exceptions import BadRequestException, UnauthorizedException

class AuthService:
    def __init__(self, db: Session):
        self.user_repo = UserRepository(db)

    def register(self, user_data: dict):
        if self.user_repo.get_by_email(user_data["email"]):
            raise BadRequestException("Email already registered")
        
        user = User(
            name=user_data["name"],
            email=user_data["email"],
            password=get_password_hash(user_data["password"]),
            role=user_data["role"]
        )
        saved_user = self.user_repo.create(user)
        token = create_access_token({"sub": str(saved_user.id)})
        return {"token": token, "role": saved_user.role.value}

    def login(self, email: str, password: str):
        user = self.user_repo.get_by_email(email)
        if not user or not verify_password(password, user.password):
            raise UnauthorizedException("Invalid credentials")
        
        token = create_access_token({"sub": str(user.id)})
        return {"token": token, "role": user.role.value}
