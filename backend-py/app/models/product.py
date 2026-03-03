from sqlalchemy import Column, Integer, String, Numeric, Date, Boolean, LargeBinary
from app.models.base import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Numeric(19, 2), nullable=False)
    description = Column(String(1000))
    stock = Column(Integer)
    brand = Column(String)
    category = Column(String)
    release_date = Column(Date)
    product_available = Column(Boolean)
    image_name = Column(String)
    image_type = Column(String)
    image_data = Column(LargeBinary)
