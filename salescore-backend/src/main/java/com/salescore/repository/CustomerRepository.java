package com.salescore.repository;

import com.salescore.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    long countByActiveTrue();
}
