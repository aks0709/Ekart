from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.cart import CartResponse
from app.services.cart_service import CartService

router = APIRouter(prefix="/api/cart", tags=["cart"])

@router.post("/add")
def add_to_cart(
    userId: int,
    productId: int,
    quantity: int,
    db: Session = Depends(get_db)
):
    service = CartService(db)
    cart = service.add_to_cart(userId, productId, quantity)
    if not cart:
        return Response(status_code=404)
    return cart
