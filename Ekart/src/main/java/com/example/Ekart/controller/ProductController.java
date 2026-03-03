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

    // CREATE with optional image
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Product> create(
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) org.springframework.web.multipart.MultipartFile image) throws Exception {
        log.info("POST /api/products - creating product: name={}", product.getName());
        Product saved = service.createWithImage(product, image);
        return ResponseEntity
                .created(URI.create("/api/products/" + saved.getId()))
                .body(saved);
    }

    // GET image
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        log.info("GET /api/products/{}/image - fetching image", id);
        Product product = service.getById(id);
        if (product.getImageData() != null) {
            return ResponseEntity.ok()
                    .header("Content-Type", product.getImageType())
                    .header("Cache-Control", "max-age=3600")
                    .body(product.getImageData());
        }
        return ResponseEntity.notFound().build();
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
    @PutMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<Product> update(
            @PathVariable Long id,
            @RequestBody Product product) throws Exception {
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

    // SEARCH
    @GetMapping("/search")
    public ResponseEntity<List<Product>> search(@RequestParam String keyword) {
        log.info("GET /api/products/search - searching with keyword={}", keyword);
        return ResponseEntity.ok(service.searchProducts(keyword));
    }
}
