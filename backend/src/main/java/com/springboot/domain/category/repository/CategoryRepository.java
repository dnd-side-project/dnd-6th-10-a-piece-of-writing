package com.springboot.domain.category.repository;

import com.springboot.domain.category.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    
}
