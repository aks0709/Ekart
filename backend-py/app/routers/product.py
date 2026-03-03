from fastapi import APIRouter, Depends, File, UploadFile, Form, Response
from sqlalchemy.orm import Session
from typing import Optional, List
from app.core.database import get_db
from app.schemas.product import ProductResponse
from app.services.product_service import ProductService
from decimal import Decimal
from datetime import date
import json

router = APIRouter(prefix="/api/products", tags=["products"])

@router.get("/search", response_model=List[ProductResponse])
def search_products(keyword: str, db: Session = Depends(get_db)):
    service = ProductService(db)
    return service.search(keyword)

@router.post("", response_model=ProductResponse, status_code=201)
async def create_product(
    product: UploadFile = File(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    # Handle product as either string or file
    if isinstance(product, UploadFile):
        product_json = await product.read()
        product_data = json.loads(product_json.decode('utf-8'))
    else:
        product_data = json.loads(product)
    
    service = ProductService(db)
    
    image_data = None
    image_name = None
    image_type = None
    if image:
        image_data = await image.read()
        image_name = image.filename
        image_type = image.content_type
    
    return service.create_with_image(product_data, image_data, image_name, image_type)

@router.get("/{id}/image")
def get_image(id: int, db: Session = Depends(get_db)):
    service = ProductService(db)
    product = service.get_by_id(id)
    if product.image_data:
        return Response(
            content=product.image_data,
            media_type=product.image_type,
            headers={"Cache-Control": "max-age=3600"}
        )
    return Response(status_code=404)

@router.get("/{id}", response_model=ProductResponse)
def get_product(id: int, db: Session = Depends(get_db)):
    service = ProductService(db)
    return service.get_by_id(id)

@router.get("", response_model=List[ProductResponse])
def get_all_products(db: Session = Depends(get_db)):
    service = ProductService(db)
    return service.get_all()

@router.put("/{id}", response_model=ProductResponse)
def update_product(id: int, product: dict, db: Session = Depends(get_db)):
    service = ProductService(db)
    return service.update(id, product)

@router.delete("/{id}", status_code=204)
def delete_product(id: int, db: Session = Depends(get_db)):
    service = ProductService(db)
    service.delete(id)
