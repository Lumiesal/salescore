package com.salescore.service;

import com.salescore.dto.CategoryDto;
import com.salescore.dto.CategoryRequestDto;
import com.salescore.entity.Category;
import com.salescore.mapper.CategoryMapper;
import com.salescore.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toDto)
                .toList();
    }

    public CategoryDto getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));

        return categoryMapper.toDto(category);
    }

    public CategoryDto createCategory(CategoryRequestDto request) {
        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setActive(request.getActive());

        Category savedCategory = categoryRepository.save(category);

        return categoryMapper.toDto(savedCategory);
    }

    public CategoryDto updateCategory(Long id, CategoryRequestDto request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setActive(request.getActive());

        Category updatedCategory = categoryRepository.save(category);

        return categoryMapper.toDto(updatedCategory);
    }

    public CategoryDto deactivateCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));

        category.setActive(false);

        Category updatedCategory = categoryRepository.save(category);

        return categoryMapper.toDto(updatedCategory);
    }
}