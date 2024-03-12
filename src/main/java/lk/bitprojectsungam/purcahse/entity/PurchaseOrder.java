package lk.bitprojectsungam.purcahse.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lk.bitprojectsungam.supplier.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.*;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "purchaseorder")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrder {
        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "purchaseordercode",unique = true)
    @NotNull
    private String purchaseordercode ;  

    @Column(name = "requireddate")
    @NotNull
    private LocalDate requireddate ;  

    @Column(name = "totalamount")
    @NotNull
    private BigDecimal totalamount ;  

    @Column(name = "note")
    private String note ;  

    @Column(name = "addeddatetime")
    @NotNull
    private LocalDate addeddatetime ;  

    @Column(name = "updadeddatetime")
    @NotNull
    private LocalDate updadeddatetime ;  

    @Column(name = "deleteddatetime")
    @NotNull
    private LocalDate deleteddatetime ;  

    @Column(name = "addeduser")
    private Integer addeduser ;  

    @Column(name = "updadeuser")
    private Integer updadeuser ;  

    @Column(name = "deleteduser")
    private Integer deleteduser ;  

    @ManyToOne
    @JoinColumn(name ="porderstatus_id", referencedColumnName="id")
    private PurchaseStatus porderstatus_id;

    @ManyToOne
    @JoinColumn(name ="supplier_id", referencedColumnName="id")
    private Supplier supplier_id;

    @OneToMany(mappedBy = "purchaseorder_id")
    private List<PurchaseOrderHasItem> purchaseOrderHasItemList;


}
