package com.salescore.controller;

import com.salescore.dto.StockMovementDto;
import com.salescore.dto.StockMovementRequestDto;
import com.salescore.service.StockMovementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stock-movements")
public class StockMovementController {

    private final StockMovementService stockMovementService;

    public StockMovementController(StockMovementService stockMovementService) {
        this.stockMovementService = stockMovementService;
    }

    @GetMapping
    public List<StockMovementDto> getAllMovements() {
        return stockMovementService.getAllMovements();
    }

    @PostMapping
    public StockMovementDto createMovement(@RequestBody StockMovementRequestDto request) {
        return stockMovementService.createMovement(request);
    }
}