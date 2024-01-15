package lk.bitprojectsungam.item.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;
import lk.bitprojectsungam.item.entity.Brand;



public interface BrandDao extends JpaRepository<Brand, Integer> {
    
    @Query(value = "select b from Brand b where b.id in (select bhc.brand_id.id from BrandHasCategory bhc where bhc.category_id.id = ?1)")
    List<Brand> getByCategory(Integer categoryid);
    
} 
