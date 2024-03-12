package lk.bitprojectsungam.item.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lk.bitprojectsungam.supplier.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "supplier_has_item")
@NoArgsConstructor
@AllArgsConstructor
public class SupplierHasItem {
    @Id
    @ManyToOne(optional = false)
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Supplier supplier_id;

    @Id
    @ManyToOne(optional = false)
    @JoinColumn(name = "item_id", referencedColumnName = "id")

    private Item item_id;
}
