from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from decimal import Decimal

class ProductBase(BaseModel):
    name: str = Field(..., min_length=1)
    price: Decimal = Field(..., ge=0)
    description: Optional[str] = Field(None, max_length=1000)
    stock: Optional[int] = Field(None, ge=0)
    brand: Optional[str] = None
    category: Optional[str] = None
    releaseDate: Optional[date] = None
    productAvailable: Optional[bool] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    imageName: Optional[str] = None
    imageType: Optional[str] = None

    class Config:
        from_attributes = True
