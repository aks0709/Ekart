from sqlalchemy.orm import Session
from app.models.cart import Cart
from app.models.cart_item import CartItem

class CartRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_user_id(self, user_id: int):
        return self.db.query(Cart).filter(Cart.user_id == user_id).first()

    def create(self, cart: Cart):
        self.db.add(cart)
        self.db.commit()
        self.db.refresh(cart)
        return cart

    def get_cart_item(self, cart_id: int, product_id: int):
        return self.db.query(CartItem).filter(
            CartItem.cart_id == cart_id,
            CartItem.product_id == product_id
        ).first()

    def add_item(self, cart_item: CartItem):
        self.db.add(cart_item)
        self.db.commit()
        self.db.refresh(cart_item)
        return cart_item

    def update_item(self, cart_item: CartItem):
        self.db.commit()
        self.db.refresh(cart_item)
        return cart_item
