package com.salescore.mapper;

import com.salescore.dto.CustomerDto;
import com.salescore.entity.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public CustomerDto toDto(Customer customer) {
        return new CustomerDto(
                customer.getId(),
                customer.getFullName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getAddress(),
                customer.getActive()
        );
    }
}