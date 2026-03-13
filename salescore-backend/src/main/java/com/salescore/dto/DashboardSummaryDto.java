package com.salescore.dto;

import java.math.BigDecimal;

public class DashboardSummaryDto {

    private Long totalCustomers;
    private Long totalProducts;
    private Long lowStockProducts;
    private Long totalSales;
    private BigDecimal totalRevenue;

    public DashboardSummaryDto() {
    }

    public DashboardSummaryDto(Long totalCustomers, Long totalProducts, Long lowStockProducts,
                               Long totalSales, BigDecimal totalRevenue) {
        this.totalCustomers = totalCustomers;
        this.totalProducts = totalProducts;
        this.lowStockProducts = lowStockProducts;
        this.totalSales = totalSales;
        this.totalRevenue = totalRevenue;
    }

    public Long getTotalCustomers() {
        return totalCustomers;
    }

    public Long getTotalProducts() {
        return totalProducts;
    }

    public Long getLowStockProducts() {
        return lowStockProducts;
    }

    public Long getTotalSales() {
        return totalSales;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }
}