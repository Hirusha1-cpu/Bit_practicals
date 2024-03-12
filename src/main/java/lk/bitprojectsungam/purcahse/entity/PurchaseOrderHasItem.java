package lk.bitprojectsungam.purcahse.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lk.bitprojectsungam.item.entity.Item;
import lk.bitprojectsungam.supplier.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "purchaseorder_has_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderHasItem {
        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(name = "id", unique = true)
    private Integer id;


    @Column(name = "purchaseprice")
    @NotNull
    private BigDecimal purchaseprice ;  

    @Column(name = "lineprice")
    @NotNull
    private BigDecimal lineprice ;  

    @Column(name = "orderedqty")
    @NotNull
    private BigDecimal orderedqty ;  

    @ManyToOne
    @JoinColumn(name ="purchaseorder_id", referencedColumnName="id")
    @JsonIgnore
    private PurchaseOrder purchaseorder_id;

    @ManyToOne
    @JoinColumn(name ="item_id", referencedColumnName="id")
    private Item item_id;



}
