export const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock);
  } else {
    cart.push({ ...product, quantity: Math.min(quantity, product.stock) });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const updateQuantity = (id, quantity) => {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity = Math.max(1, Math.min(quantity, item.stock));
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const removeFromCart = (id) => {
  const cart = getCart().filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const clearCart = () => {
  localStorage.setItem('cart', '[]');
  return [];
};

export const getCartTotal = () => {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
};
