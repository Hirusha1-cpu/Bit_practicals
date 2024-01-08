package lk.bitprojectsungam.item.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.bitprojectsungam.item.entity.Item;

public interface ItemDao extends JpaRepository<Item, Integer> {
    
}
