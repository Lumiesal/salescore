package com.salescore.dto;

import java.util.List;

public class SaleRequestDto {

    private Long customerId;
    private List<SaleItemRequestDto> items;

    public SaleRequestDto() {
    }

    public Long getCustomerId() {
        return customerId;
    }

    public List<SaleItemRequestDto> getItems() {
        return items;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public void setItems(List<SaleItemRequestDto> items) {
        this.items = items;
    }
}