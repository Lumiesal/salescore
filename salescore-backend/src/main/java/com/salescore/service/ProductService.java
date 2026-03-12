package com.salescore.service;

import com.salescore.entity.Category;
import com.salescore.entity.Product;
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

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    public Product createProduct(Product product) {
        Long categoryId = product.getCategory().getId();

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));

        product.setCategory(category);

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productData) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        Long categoryId = productData.getCategory().getId();

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));

        product.setName(productData.getName());
        product.setSku(productData.getSku());
        product.setDescription(productData.getDescription());
        product.setPrice(productData.getPrice());
        product.setStock(productData.getStock());
        product.setMinStock(productData.getMinStock());
        product.setActive(productData.getActive());
        product.setCategory(category);

        return productRepository.save(product);
    }

    public Product deactivateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        product.setActive(false);

        return productRepository.save(product);
    }
}