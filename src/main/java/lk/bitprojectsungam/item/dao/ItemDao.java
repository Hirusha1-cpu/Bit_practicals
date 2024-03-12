package lk.bitprojectsungam.item.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import lk.bitprojectsungam.item.entity.Item;

public interface ItemDao extends JpaRepository<Item, Integer> {
    
    //define query for get item with selected column
    @Query(value="select new Item(i.id, i.itemcode, i.itemname, i.salesprice, i.purchaseprice ,i.itemstatus_id , i.added_user_id, i.delete_user) from Item i order by i.id desc")
    public List<Item> findAll();
    
    //define query for get item with selected column status active , 1
    @Query(value="select new Item(i.id, i.itemcode, i.itemname) from Item i where i.itemstatus_id.id = 1")
    public List<Item> getAvailableItemList();

    @Query(value="select new Item(i.id, i.itemcode, i.itemname) from Item i where i.itemstatus_id.id = 1 and i.id not in (select shi.item_id.id from SupplierHasItem shi where shi.supplier_id.id =?1)")
    public List<Item> getAvailableDataListWithoutSupplier(Integer supplierid);

    //get next item code
    @Query(value = "SELECT concat('I' , lpad(substring(max(i.itemcode),2)+1, 5,'0')) as itemcode  FROM bitproject123online.item as i;", nativeQuery = true)
    public String getNextItemCode();


}
