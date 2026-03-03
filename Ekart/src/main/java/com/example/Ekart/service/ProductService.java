package com.example.Ekart.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public Product createWithImage(Product product, MultipartFile image) throws Exception {
        log.info("ProductService.createWithImage name={}", product.getName());
        if (image != null && !image.isEmpty()) {
            product.setImageName(image.getOriginalFilename());
            product.setImageType(image.getContentType());
            product.setImageData(image.getBytes());
        }
        return repository.save(product);
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
        if (p.getStock() != null) {
            existing.setStock(p.getStock());
        }
        existing.setBrand(p.getBrand());
        existing.setCategory(p.getCategory());
        existing.setReleaseDate(p.getReleaseDate());
        existing.setProductAvailable(p.getProductAvailable());
        return repository.save(existing);
    }

    public Product updateWithImage(Long id, Product p, MultipartFile image) throws Exception {
        log.info("ProductService.updateWithImage id={}", id);
        Product existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        existing.setName(p.getName());
        existing.setPrice(p.getPrice());
        existing.setDescription(p.getDescription());
        if (p.getStock() != null) {
            existing.setStock(p.getStock());
        }
        existing.setBrand(p.getBrand());
        existing.setCategory(p.getCategory());
        existing.setReleaseDate(p.getReleaseDate());
        existing.setProductAvailable(p.getProductAvailable());
        if (image != null && !image.isEmpty()) {
            existing.setImageName(image.getOriginalFilename());
            existing.setImageType(image.getContentType());
            existing.setImageData(image.getBytes());
        }
        return repository.save(existing);
    }

    public void delete(Long id) {
        log.info("ProductService.delete id={}", id);
        repository.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        log.info("ProductService.searchProducts keyword={}", keyword);
        return repository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                keyword, keyword, keyword);
    }
}