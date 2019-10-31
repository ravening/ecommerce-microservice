package com.jhipster.demo.invoice.domain;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.jhipster.demo.invoice.domain.enumeration.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Product
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Size size;

}