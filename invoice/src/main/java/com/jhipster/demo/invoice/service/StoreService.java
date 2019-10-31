package com.jhipster.demo.invoice.service;

import java.util.List;

import com.jhipster.demo.invoice.domain.Product;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * StoreService
 */
@FeignClient("STORE")
public interface StoreService {
    @GetMapping("/api/products")
    public List<Product> getAllProducts();
    
}