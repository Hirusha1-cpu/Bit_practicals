package lk.bitprojectsungam.item.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;
import lk.bitprojectsungam.item.entity.SubCategory;

public interface SubCategoryDao extends JpaRepository<SubCategory, Integer> {
    
    @Query(value="select subc from SubCategory subc where subc.category_id.id = ?1")
    List<SubCategory> getByCategory(Integer categoryid);
} 
