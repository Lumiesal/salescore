package com.salescore.controller;

import com.salescore.dto.ProductDto;
import com.salescore.dto.ProductRequestDto;
import com.salescore.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductDto getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public ProductDto createProduct(@RequestBody ProductRequestDto request) {
        return productService.createProduct(request);
    }

    @PutMapping("/{id}")
    public ProductDto updateProduct(@PathVariable Long id, @RequestBody ProductRequestDto request) {
        return productService.updateProduct(id, request);
    }

    @PatchMapping("/{id}/deactivate")
    public ProductDto deactivateProduct(@PathVariable Long id) {
        return productService.deactivateProduct(id);
    }
}