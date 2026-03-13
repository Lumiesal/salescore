package com.salescore.mapper;

import com.salescore.dto.StockMovementDto;
import com.salescore.entity.StockMovement;
import org.springframework.stereotype.Component;

@Component
public class StockMovementMapper {

    public StockMovementDto toDto(StockMovement movement) {
        return new StockMovementDto(
                movement.getId(),
                movement.getType().name(),
                movement.getQuantity(),
                movement.getNote(),
                movement.getCreatedAt(),
                movement.getProduct().getId(),
                movement.getProduct().getName()
        );
    }
}