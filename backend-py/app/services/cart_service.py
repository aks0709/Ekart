from sqlalchemy.orm import Session
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.repositories.cart_repository import CartRepository
from app.repositories.user_repository import UserRepository
from app.repositories.product_repository import ProductRepository

class CartService:
    def __init__(self, db: Session):
        self.cart_repo = CartRepository(db)
        self.user_repo = UserRepository(db)
        self.product_repo = ProductRepository(db)

    def add_to_cart(self, user_id: int, product_id: int, quantity: int):
        user = self.user_repo.get_by_id(user_id)
        if not user:
            return None

        product = self.product_repo.get_by_id(product_id)
        if not product:
            return None

        cart = self.cart_repo.get_by_user_id(user_id)
        if not cart:
            cart = Cart(user_id=user_id)
            cart = self.cart_repo.create(cart)

        existing_item = self.cart_repo.get_cart_item(cart.id, product_id)
        if existing_item:
            existing_item.quantity += quantity
            self.cart_repo.update_item(existing_item)
        else:
            item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)
            self.cart_repo.add_item(item)

        return self.cart_repo.get_by_user_id(user_id)
