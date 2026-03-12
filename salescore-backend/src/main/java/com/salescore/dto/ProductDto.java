package com.salescore.dto;

import java.math.BigDecimal;

public class ProductDto {

    private Long id;
    private String name;
    private String sku;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private Integer minStock;
    private Boolean active;
    private CategoryDto category;

    public ProductDto() {
    }

    public ProductDto(Long id, String name, String sku, String description,
                      BigDecimal price, Integer stock, Integer minStock,
                      Boolean active, CategoryDto category) {
        this.id = id;
        this.name = name;
        this.sku = sku;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.minStock = minStock;
        this.active = active;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSku() {
        return sku;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getStock() {
        return stock;
    }

    public Integer getMinStock() {
        return minStock;
    }

    public Boolean getActive() {
        return active;
    }

    public CategoryDto getCategory() {
        return category;
    }
}