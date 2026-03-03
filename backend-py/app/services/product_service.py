from sqlalchemy.orm import Session
from app.models.product import Product
from app.repositories.product_repository import ProductRepository
from app.core.exceptions import NotFoundException

class ProductService:
    def __init__(self, db: Session):
        self.repo = ProductRepository(db)

    def create_with_image(self, product_data: dict, image_data: bytes = None, image_name: str = None, image_type: str = None):
        product = Product(**product_data)
        if image_data:
            product.image_name = image_name
            product.image_type = image_type
            product.image_data = image_data
        return self.repo.create(product)

    def get_by_id(self, product_id: int):
        product = self.repo.get_by_id(product_id)
        if not product:
            raise NotFoundException(f"Product not found with id: {product_id}")
        return product

    def get_all(self):
        return self.repo.get_all()

    def update(self, product_id: int, product_data: dict):
        existing = self.get_by_id(product_id)
        for key, value in product_data.items():
            if hasattr(existing, key):
                setattr(existing, key, value)
        return self.repo.update(existing)

    def delete(self, product_id: int):
        product = self.get_by_id(product_id)
        self.repo.delete(product)

    def search(self, keyword: str):
        return self.repo.search(keyword)
