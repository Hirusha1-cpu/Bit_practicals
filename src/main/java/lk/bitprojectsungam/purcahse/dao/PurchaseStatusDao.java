package lk.bitprojectsungam.purcahse.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.bitprojectsungam.purcahse.entity.PurchaseStatus;

public interface PurchaseStatusDao extends JpaRepository<PurchaseStatus, Integer> {

    
} 