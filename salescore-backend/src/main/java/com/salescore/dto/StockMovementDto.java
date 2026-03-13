package com.salescore.dto;

import java.time.LocalDateTime;

public class StockMovementDto {

    private Long id;
    private String type;
    private Integer quantity;
    private String note;
    private LocalDateTime createdAt;
    private Long productId;
    private String productName;

    public StockMovementDto() {
    }

    public StockMovementDto(Long id, String type, Integer quantity, String note,
                            LocalDateTime createdAt, Long productId, String productName) {
        this.id = id;
        this.type = type;
        this.quantity = quantity;
        this.note = note;
        this.createdAt = createdAt;
        this.productId = productId;
        this.productName = productName;
    }

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getNote() {
        return note;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Long getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }
}