package com.example.Ekart.service;

import com.example.Ekart.exception.ResourceNotFoundException;
import com.example.Ekart.model.Product;
import com.example.Ekart.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService service;

    @Test
    void testCreateProduct() {
        Product product = new Product(null, "Laptop", new BigDecimal("999.99"), "Gaming laptop", 10, null, null, null, null, null, null, null, null);
        Product saved = new Product(1L, "Laptop", new BigDecimal("999.99"), "Gaming laptop", 10, null, null, null, null, null, null, null, null);
        when(repository.save(any(Product.class))).thenReturn(saved);

        Product result = service.create(product);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Laptop", result.getName());
        verify(repository, times(1)).save(product);
    }

    @Test
    void testGetByIdSuccess() {
        Product product = new Product(1L, "Laptop", new BigDecimal("999.99"), "Gaming laptop", 10, null, null, null, null, null, null, null, null);
        when(repository.findById(1L)).thenReturn(Optional.of(product));

        Product result = service.getById(1L);

        assertNotNull(result);
        assertEquals("Laptop", result.getName());
    }

    @Test
    void testGetByIdNotFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> service.getById(1L));
    }

    @Test
    void testGetAll() {
        Product p1 = new Product(1L, "Laptop", new BigDecimal("999.99"), "Gaming laptop", 10, null, null, null, null, null, null, null, null);
        Product p2 = new Product(2L, "Mouse", new BigDecimal("29.99"), "Wireless mouse", 50, null, null, null, null, null, null, null, null);
        when(repository.findAll()).thenReturn(Arrays.asList(p1, p2));

        List<Product> result = service.getAll();

        assertEquals(2, result.size());
        assertEquals("Laptop", result.get(0).getName());
    }

    @Test
    void testUpdateProduct() {
        Product existing = new Product(1L, "Laptop", new BigDecimal("999.99"), "Gaming laptop", 10, null, null, null, null, null, null, null, null);
        Product updated = new Product(1L, "Updated Laptop", new BigDecimal("899.99"), "Updated desc", 5, null, null, null, null, null, null, null, null);
        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(any(Product.class))).thenReturn(updated);

        Product result = service.update(1L, updated);

        assertEquals("Updated Laptop", result.getName());
        assertEquals(new BigDecimal("899.99"), result.getPrice());
    }

    @Test
    void testDeleteProduct() {
        doNothing().when(repository).deleteById(1L);

        service.delete(1L);

        verify(repository, times(1)).deleteById(1L);
    }
}
