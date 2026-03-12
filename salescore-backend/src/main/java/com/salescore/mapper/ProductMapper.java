package com.salescore.mapper;

import com.salescore.dto.CategoryDto;
import com.salescore.dto.ProductDto;
import com.salescore.entity.Category;
import com.salescore.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductDto toDto(Product product) {
        Category category = product.getCategory();

        CategoryDto categoryDto = new CategoryDto(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getActive()
        );

        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getSku(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getMinStock(),
                product.getActive(),
                categoryDto
        );
    }
}