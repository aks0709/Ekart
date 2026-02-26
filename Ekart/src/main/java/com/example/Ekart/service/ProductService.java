package com.example.Ekart.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Ekart.exception.ResourceNotFoundException;
import com.example.Ekart.model.Product;
import com.example.Ekart.repository.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository repository;

    public Product create(Product p) {
        log.info("ProductService.create name={}", p.getName());
        return repository.save(p);
    }

    public Product getById(Long id) {
        log.info("ProductService.getById id={}", id);
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public List<Product> getAll() {
        log.info("ProductService.getAll");
        return repository.findAll();
    }

    public Product update(Long id, Product p) {
        log.info("ProductService.update id={}", id);
        Product existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        existing.setName(p.getName());
        existing.setPrice(p.getPrice());
        existing.setDescription(p.getDescription());
        existing.setStock(p.getStock());
        return repository.save(existing);
    }

    public void delete(Long id) {
        log.info("ProductService.delete id={}", id);
        repository.deleteById(id);
    }
}