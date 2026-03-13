package com.salescore.service;

import com.salescore.dto.CustomerDto;
import com.salescore.dto.CustomerRequestDto;
import com.salescore.entity.Customer;
import com.salescore.mapper.CustomerMapper;
import com.salescore.repository.CustomerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    public CustomerService(CustomerRepository customerRepository, CustomerMapper customerMapper) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
    }

    public List<CustomerDto> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(customerMapper::toDto)
                .toList();
    }

    public CustomerDto getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));

        return customerMapper.toDto(customer);
    }

    public CustomerDto createCustomer(CustomerRequestDto request) {
        Customer customer = new Customer();
        customer.setFullName(request.getFullName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setActive(request.getActive());

        Customer savedCustomer = customerRepository.save(customer);

        return customerMapper.toDto(savedCustomer);
    }

    public CustomerDto updateCustomer(Long id, CustomerRequestDto request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));

        customer.setFullName(request.getFullName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setActive(request.getActive());

        Customer updatedCustomer = customerRepository.save(customer);

        return customerMapper.toDto(updatedCustomer);
    }

    public CustomerDto deactivateCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));

        customer.setActive(false);

        Customer updatedCustomer = customerRepository.save(customer);

        return customerMapper.toDto(updatedCustomer);
    }
}