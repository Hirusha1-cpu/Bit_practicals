package lk.bitprojectsungam.supplier.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.bitprojectsungam.supplier.entity.Supplier;

public interface SupplierDao extends JpaRepository<Supplier, Integer>{
    
    
} 