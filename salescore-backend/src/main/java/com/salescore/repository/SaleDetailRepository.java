package com.salescore.repository;

import com.salescore.entity.SaleDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleDetailRepository extends JpaRepository<SaleDetail, Long> {
    List<SaleDetail> findBySaleId(Long saleId);
}