package com.example.Ekart.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product name must not be blank")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Price must be >= 0")
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal price;

    @Size(max = 1000, message = "Description can be at most 1000 characters")
    @Column(length = 1000)
    private String description;

    @Min(value = 0, message = "Stock must be >= 0")
    private Integer stock;

    private String brand;
    
    private String category;
    
    private LocalDate releaseDate;
    
    private Boolean productAvailable;
    
    private String imageName;
    
    // private String imageName;
    
    private String imageType;
    
    @Lob
    @Column(columnDefinition = "BYTEA")
    private byte[] imageData;
}