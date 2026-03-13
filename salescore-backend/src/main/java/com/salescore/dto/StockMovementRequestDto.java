package com.salescore.dto;

public class StockMovementRequestDto {

    private String type;
    private Integer quantity;
    private String note;
    private Long productId;

    public StockMovementRequestDto() {
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

    public Long getProductId() {
        return productId;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}