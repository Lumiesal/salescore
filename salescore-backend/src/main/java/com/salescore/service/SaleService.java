package com.salescore.service;

import com.salescore.dto.SaleDetailDto;
import com.salescore.dto.SaleDto;
import com.salescore.dto.SaleItemRequestDto;
import com.salescore.dto.SaleRequestDto;
import com.salescore.entity.*;
import com.salescore.repository.CustomerRepository;
import com.salescore.repository.ProductRepository;
import com.salescore.repository.SaleDetailRepository;
import com.salescore.repository.SaleRepository;
import com.salescore.repository.StockMovementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class SaleService {

    private final SaleRepository saleRepository;
    private final SaleDetailRepository saleDetailRepository;
    private final ProductRepository productRepository;
    private final StockMovementRepository stockMovementRepository;
    private final CustomerRepository customerRepository;

    public SaleService(SaleRepository saleRepository,
                       SaleDetailRepository saleDetailRepository,
                       ProductRepository productRepository,
                       StockMovementRepository stockMovementRepository,
                       CustomerRepository customerRepository) {
        this.saleRepository = saleRepository;
        this.saleDetailRepository = saleDetailRepository;
        this.productRepository = productRepository;
        this.stockMovementRepository = stockMovementRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public SaleDto createSale(SaleRequestDto request) {
        if (request.getCustomerId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La venta debe tener cliente");
        }

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La venta debe tener al menos un item");
        }

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));

        if (Boolean.FALSE.equals(customer.getActive())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede vender a un cliente inactivo");
        }

        Sale sale = new Sale();
        sale.setTotal(BigDecimal.ZERO);
        sale.setStatus(SaleStatus.COMPLETED);
        sale.setCustomer(customer);

        Sale savedSale = saleRepository.save(sale);

        BigDecimal total = BigDecimal.ZERO;
        List<SaleDetailDto> detailDtos = new ArrayList<>();

        for (SaleItemRequestDto item : request.getItems()) {
            if (item.getQuantity() == null || item.getQuantity() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cantidad debe ser mayor que cero");
            }

            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

            if (Boolean.FALSE.equals(product.getActive())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No se puede vender un producto inactivo");
            }

            if (product.getStock() < item.getQuantity()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Stock insuficiente para el producto: " + product.getName());
            }

            BigDecimal unitPrice = product.getPrice();
            BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(item.getQuantity()));

            SaleDetail detail = new SaleDetail();
            detail.setSale(savedSale);
            detail.setProduct(product);
            detail.setQuantity(item.getQuantity());
            detail.setUnitPrice(unitPrice);
            detail.setSubtotal(subtotal);

            saleDetailRepository.save(detail);

            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);

            StockMovement movement = new StockMovement();
            movement.setType(StockMovementType.OUT);
            movement.setQuantity(item.getQuantity());
            movement.setNote("Salida por venta ID " + savedSale.getId());
            movement.setProduct(product);

            stockMovementRepository.save(movement);

            total = total.add(subtotal);

            detailDtos.add(new SaleDetailDto(
                    product.getId(),
                    product.getName(),
                    item.getQuantity(),
                    unitPrice,
                    subtotal
            ));
        }

        savedSale.setTotal(total);
        Sale finalSale = saleRepository.save(savedSale);

        return new SaleDto(
                finalSale.getId(),
                finalSale.getTotal(),
                finalSale.getStatus().name(),
                finalSale.getCreatedAt(),
                customer.getId(),
                customer.getFullName(),
                detailDtos
        );
    }

    public List<SaleDto> getAllSales() {
        return saleRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    public SaleDto getSaleById(Long id) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada"));

        return mapToDto(sale);
    }

    private SaleDto mapToDto(Sale sale) {
        List<SaleDetailDto> items = saleDetailRepository.findBySaleId(sale.getId())
                .stream()
                .map(detail -> new SaleDetailDto(
                        detail.getProduct().getId(),
                        detail.getProduct().getName(),
                        detail.getQuantity(),
                        detail.getUnitPrice(),
                        detail.getSubtotal()
                ))
                .toList();

        Long customerId = sale.getCustomer() != null ? sale.getCustomer().getId() : null;
        String customerName = sale.getCustomer() != null ? sale.getCustomer().getFullName() : null;

        return new SaleDto(
                sale.getId(),
                sale.getTotal(),
                sale.getStatus().name(),
                sale.getCreatedAt(),
                customerId,
                customerName,
                items
        );
    }
}