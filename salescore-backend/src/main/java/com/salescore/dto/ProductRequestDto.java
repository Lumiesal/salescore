package com.salescore.dto;

import java.math.BigDecimal;

public class ProductRequestDto {

    private String name;
    private String sku;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private Integer minStock;
    private Boolean active;
    private Long categoryId;

    public ProductRequestDto() {
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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public void setMinStock(Integer minStock) {
        this.minStock = minStock;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}