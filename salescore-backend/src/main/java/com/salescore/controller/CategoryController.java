package com.salescore.controller;

import com.salescore.dto.CategoryDto;
import com.salescore.dto.CategoryRequestDto;
import com.salescore.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CategoryDto> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryDto getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @PostMapping
    public CategoryDto createCategory(@RequestBody CategoryRequestDto request) {
        return categoryService.createCategory(request);
    }

    @PutMapping("/{id}")
    public CategoryDto updateCategory(@PathVariable Long id, @RequestBody CategoryRequestDto request) {
        return categoryService.updateCategory(id, request);
    }

    @PatchMapping("/{id}/deactivate")
    public CategoryDto deactivateCategory(@PathVariable Long id) {
        return categoryService.deactivateCategory(id);
    }
}