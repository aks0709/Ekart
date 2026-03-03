from pydantic import BaseModel
from typing import List
from app.schemas.product import ProductResponse

class CartItemResponse(BaseModel):
    id: int
    quantity: int
    product: ProductResponse

    class Config:
        from_attributes = True

class CartResponse(BaseModel):
    id: int
    items: List[CartItemResponse]

    class Config:
        from_attributes = True
