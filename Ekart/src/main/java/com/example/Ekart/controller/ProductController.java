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
        return ResponseEntity
                .created(URI.create("/api/products/" + saved.getId()))
                .body(saved);
    }

    // CREATE with image
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<Product> createWithImage(
            @RequestParam("name") String name,
            @RequestParam("price") String price,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "brand", required = false) String brand,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "stock", required = false) String stock,
            @RequestParam(value = "productAvailable", required = false) String productAvailable,
            @RequestParam(value = "releaseDate", required = false) String releaseDate,
            @RequestParam(value = "image", required = false) org.springframework.web.multipart.MultipartFile image) throws Exception {
        log.info("POST /api/products/upload - creating product with image: name={}", name);
        Product saved = service.createWithImage(name, price, description, brand, category, stock, productAvailable, releaseDate, image);
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

    // SEARCH
    @GetMapping("/search")
    public ResponseEntity<List<Product>> search(@RequestParam String keyword) {
        log.info("GET /api/products/search - searching with keyword={}", keyword);
        return ResponseEntity.ok(service.searchProducts(keyword));
    }
}
