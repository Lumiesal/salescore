package com.salescore.mapper;

import com.salescore.dto.CategoryDto;
import com.salescore.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryDto toDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getActive()
        );
    }
}