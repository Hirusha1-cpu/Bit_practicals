package lk.bitprojectsungam.item.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.*;

import lk.bitprojectsungam.item.entity.Item;

public interface ItemDao extends JpaRepository<Item, Integer> {
    
    //define query for get item with selected column
    @Query(value="select new Item(i.id, i.itemcode, i.itemname, i.salesprice, i.purchaseprice ,i.itemstatus_id) from Item i order by i.id desc")
    public List<Item> findAll();
}
