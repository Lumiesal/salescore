package com.salescore.controller;

import com.salescore.dto.CustomerDto;
import com.salescore.dto.CustomerRequestDto;
import com.salescore.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<CustomerDto> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public CustomerDto getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping
    public CustomerDto createCustomer(@RequestBody CustomerRequestDto request) {
        return customerService.createCustomer(request);
    }

    @PutMapping("/{id}")
    public CustomerDto updateCustomer(@PathVariable Long id, @RequestBody CustomerRequestDto request) {
        return customerService.updateCustomer(id, request);
    }

    @PatchMapping("/{id}/deactivate")
    public CustomerDto deactivateCustomer(@PathVariable Long id) {
        return customerService.deactivateCustomer(id);
    }
}