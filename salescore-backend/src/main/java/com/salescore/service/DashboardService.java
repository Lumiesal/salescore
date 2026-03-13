package com.salescore.service;

import com.salescore.dto.DashboardSummaryDto;
import com.salescore.entity.Product;
import com.salescore.entity.Sale;
import com.salescore.repository.CustomerRepository;
import com.salescore.repository.ProductRepository;
import com.salescore.repository.SaleRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DashboardService {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final SaleRepository saleRepository;

    public DashboardService(CustomerRepository customerRepository,
                            ProductRepository productRepository,
                            SaleRepository saleRepository) {
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.saleRepository = saleRepository;
    }

    public DashboardSummaryDto getSummary() {
        long totalCustomers = customerRepository.countByActiveTrue();

        List<Product> products = productRepository.findAll();
        long totalProducts = products.stream()
                .filter(product -> Boolean.TRUE.equals(product.getActive()))
                .count();

        long lowStockProducts = products.stream()
                .filter(product -> Boolean.TRUE.equals(product.getActive()))
                .filter(product -> product.getStock() != null && product.getMinStock() != null)
                .filter(product -> product.getStock() <= product.getMinStock())
                .count();

        List<Sale> sales = saleRepository.findAll();
        long totalSales = sales.size();

        BigDecimal totalRevenue = sales.stream()
                .map(Sale::getTotal)
                .filter(total -> total != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new DashboardSummaryDto(
                totalCustomers,
                totalProducts,
                lowStockProducts,
                totalSales,
                totalRevenue
        );
    }
}