package lk.bitprojectsungam.item.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import lk.bitprojectsungam.item.entity.ItemStatus;

public interface ItemStatusDao extends JpaRepository<ItemStatus, Integer> {

    
} 