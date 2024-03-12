package lk.bitprojectsungam.purcahse.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.bitprojectsungam.purcahse.entity.PurchaseOrder;

public interface PurchaseOrderDao extends JpaRepository<PurchaseOrder, Integer>{

    
} 
