package lk.bitprojectsungam.item.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.bitprojectsungam.item.entity.Category;


public interface CategoryDao extends JpaRepository<Category, Integer> {

    
} 
