import { useState, useEffect } from 'react';
import { getCart, addToCart as addItem, updateQuantity as updateQty, removeFromCart as removeItem, clearCart as clear } from '../utils/cart';

export const useCart = () => {
  const [cart, setCart] = useState(getCart());

  const refresh = () => setCart(getCart());

  const addToCart = (product, quantity) => {
    addItem(product, quantity);
    refresh();
  };

  const updateQuantity = (id, quantity) => {
    updateQty(id, quantity);
    refresh();
  };

  const removeFromCart = (id) => {
    removeItem(id);
    refresh();
  };

  const clearCart = () => {
    clear();
    refresh();
  };

  return { cart, addToCart, updateQuantity, removeFromCart, clearCart };
};
