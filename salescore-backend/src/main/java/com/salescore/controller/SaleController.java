package com.salescore.controller;

import com.salescore.dto.SaleDto;
import com.salescore.dto.SaleRequestDto;
import com.salescore.service.SaleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping
    public List<SaleDto> getAllSales() {
        return saleService.getAllSales();
    }

    @GetMapping("/{id}")
    public SaleDto getSaleById(@PathVariable Long id) {
        return saleService.getSaleById(id);
    }

    @PostMapping
    public SaleDto createSale(@RequestBody SaleRequestDto request) {
        return saleService.createSale(request);
    }
}