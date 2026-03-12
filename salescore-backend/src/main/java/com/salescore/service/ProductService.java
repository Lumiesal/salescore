package com.salescore.service;

import com.salescore.dto.ProductDto;
import com.salescore.dto.ProductRequestDto;
import com.salescore.entity.Category;
import com.salescore.entity.Product;
import com.salescore.mapper.ProductMapper;
import com.salescore.repository.CategoryRepository;
import com.salescore.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository,
                          ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
    }

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toDto)
                .toList();
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        return productMapper.toDto(product);
    }

    public ProductDto createProduct(ProductRequestDto request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));

        Product product = new Product();
        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setMinStock(request.getMinStock());
        product.setActive(request.getActive());
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);

        return productMapper.toDto(savedProduct);
    }

    public ProductDto updateProduct(Long id, ProductRequestDto request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));

        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setMinStock(request.getMinStock());
        product.setActive(request.getActive());
        product.setCategory(category);

        Product updatedProduct = productRepository.save(product);

        return productMapper.toDto(updatedProduct);
    }

    public ProductDto deactivateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        product.setActive(false);

        Product updatedProduct = productRepository.save(product);

        return productMapper.toDto(updatedProduct);
    }
}