package lk.bitprojectsungam.supplier.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lk.bitprojectsungam.supplier.entity.Supplier;

public interface SupplierDao extends JpaRepository<Supplier, Integer>{
    @Query("select new Supplier(s.id, s.suppliername) from Supplier s where s.supplierstatus_id.id = 1")
    public List<Supplier> List();
    
    
} 