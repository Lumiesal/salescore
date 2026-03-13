package com.salescore.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class SaleDto {

    private Long id;
    private BigDecimal total;
    private String status;
    private LocalDateTime createdAt;
    private Long customerId;
    private String customerName;
    private List<SaleDetailDto> items;

    public SaleDto() {
    }

    public SaleDto(Long id, BigDecimal total, String status, LocalDateTime createdAt,
                   Long customerId, String customerName, List<SaleDetailDto> items) {
        this.id = id;
        this.total = total;
        this.status = status;
        this.createdAt = createdAt;
        this.customerId = customerId;
        this.customerName = customerName;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public List<SaleDetailDto> getItems() {
        return items;
    }
}