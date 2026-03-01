package com.example.Ekart.controller;


import com.example.Ekart.model.*;
import com.example.Ekart.service.*;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService service;

    // CREATE
    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody Product product) {
        log.info("POST /api/products - creating product: name={}", product.getName());
        Product saved = service.create(product);
        // Build location header like /api/products/{id}
        return ResponseEntity
                .created(URI.create("/api/products/" + saved.getId()))
                .body(saved);
    }

    // READ (by id)
    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        log.info("GET /api/products/{} - fetching product", id);
        return ResponseEntity.ok(service.getById(id));
    }

    // READ (all)
    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        log.info("GET /api/products - listing all products");
        return ResponseEntity.ok(service.getAll());
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @Valid @RequestBody Product product) {
        log.info("PUT /api/products/{} - updating product", id);
        return ResponseEntity.ok(service.update(id, product));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("DELETE /api/products/{} - deleting product", id);
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
