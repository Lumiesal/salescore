package com.salescore.service;

import com.salescore.dto.StockMovementDto;
import com.salescore.dto.StockMovementRequestDto;
import com.salescore.entity.Product;
import com.salescore.entity.StockMovement;
import com.salescore.entity.StockMovementType;
import com.salescore.mapper.StockMovementMapper;
import com.salescore.repository.ProductRepository;
import com.salescore.repository.StockMovementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class StockMovementService {

    private final StockMovementRepository stockMovementRepository;
    private final ProductRepository productRepository;
    private final StockMovementMapper stockMovementMapper;

    public StockMovementService(StockMovementRepository stockMovementRepository,
                                ProductRepository productRepository,
                                StockMovementMapper stockMovementMapper) {
        this.stockMovementRepository = stockMovementRepository;
        this.productRepository = productRepository;
        this.stockMovementMapper = stockMovementMapper;
    }

    public List<StockMovementDto> getAllMovements() {
        return stockMovementRepository.findAll()
                .stream()
                .map(stockMovementMapper::toDto)
                .toList();
    }

    public StockMovementDto createMovement(StockMovementRequestDto request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        StockMovementType type;
        try {
            type = StockMovementType.valueOf(request.getType().toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de movimiento inválido");
        }

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cantidad debe ser mayor que cero");
        }

        switch (type) {
            case IN -> product.setStock(product.getStock() + request.getQuantity());
            case OUT -> {
                if (product.getStock() < request.getQuantity()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock insuficiente para salida");
                }
                product.setStock(product.getStock() - request.getQuantity());
            }
            case ADJUST -> {
                if (request.getQuantity() < 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El ajuste no puede ser negativo");
                }
                product.setStock(request.getQuantity());
            }
        }

        productRepository.save(product);

        StockMovement movement = new StockMovement();
        movement.setType(type);
        movement.setQuantity(request.getQuantity());
        movement.setNote(request.getNote());
        movement.setProduct(product);

        StockMovement savedMovement = stockMovementRepository.save(movement);

        return stockMovementMapper.toDto(savedMovement);
    }
}