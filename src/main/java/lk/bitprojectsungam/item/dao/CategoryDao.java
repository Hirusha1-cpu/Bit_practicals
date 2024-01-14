package lk.bitprojectsungam.item.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.bitprojectsungam.item.entity.Category;


public interface CategoryDao extends JpaRepository<Category, Integer> {
    //define query for get category by brand
    @Query(value = "select c from Category c where c.id in (select bhc from BrandHasCategory bhc where bhc.brand_id.id = ?1)")
    List<Category> getByBrand(Integer brandid);
    
} 
