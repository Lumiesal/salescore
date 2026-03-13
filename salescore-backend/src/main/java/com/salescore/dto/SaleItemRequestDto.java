package com.salescore.dto;

public class SaleItemRequestDto {

    private Long productId;
    private Integer quantity;

    public SaleItemRequestDto() {
    }

    public Long getProductId() {
        return productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}