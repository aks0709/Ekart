package com.example.Ekart.service;

import org.springframework.stereotype.Service;

import com.example.Ekart.model.Cart;
import com.example.Ekart.model.CartItem;
import com.example.Ekart.model.Product;
import com.example.Ekart.model.User;
import com.example.Ekart.repository.CartRepository;
import com.example.Ekart.repository.ProductRepository;
import com.example.Ekart.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository; // you will create simple repo

    public Cart addToCart(Long userId, Long productId, Integer quantity) {

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;

        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) return null;

        Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
            Cart c = new Cart();
            c.setUser(user);
            return cartRepository.save(c);
        });

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setQuantity(quantity);

        cart.getItems().add(item);
        return cartRepository.save(cart);
    }
}