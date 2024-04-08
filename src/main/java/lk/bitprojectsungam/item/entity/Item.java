package lk.bitprojectsungam.item.entity;

import org.hibernate.validator.constraints.Length;

import java.math.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lk.bitprojectsungam.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity // apply as an entity class
@Table(name = "item") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Item {
        @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    // @NotNull 
    private Integer id;

    @Column(name = "itemcode", unique = true)
    @NotNull
    @Length(max = 10)
    private String itemcode;

    @Column(name = "itemname")
    @NotNull
    private String itemname;

    @Column(name = "itemsize")
    @NotNull
    private BigDecimal itemsize;

    @Column(name = "rop")
    private Integer rop;
    
    @Column(name = "roq")
    private Integer roq;
    
    @Column(name = "note")
    private String note;

    @Column(name = "addeddatetime")
    @NotNull
    private LocalDate addeddatetime;

    @Column(name = "lastmodifytime")
    private LocalDate lastmodifytime;

    @Column(name = "deleteddatetime")
    private LocalDate deleteddatetime;

    @Column(name = "salesprice")
    @NotNull
    private BigDecimal salesprice;

    @Column(name = "purchaseprice")
    @NotNull
    private BigDecimal purchaseprice;

    @ManyToOne(optional = false) // relationship format //optional true dammot null yawanna puluwan
    @JoinColumn(name = "brand_id", referencedColumnName = "id") //join column condition
    private Brand brand_id ;

    @ManyToOne(optional = false) // relationship format
    @JoinColumn(name = "subcategory_id", referencedColumnName = "id") //join column condition
    private SubCategory subcategory_id ;

    @ManyToOne(optional = false)
    @JoinColumn(name = "unittype_id", referencedColumnName = "id")
    private UnitType unittype_id ;

    @ManyToOne(optional = false)
    @JoinColumn(name = "itemstatus_id", referencedColumnName = "id")
    private ItemStatus itemstatus_id ;

    @ManyToOne(optional = false)
    @JoinColumn(name = "packagetype_id", referencedColumnName = "id")
    private PackageType packagetype_id ;

    @ManyToOne(optional = false)
    @JoinColumn(name = "added_user_id", referencedColumnName = "id")
    private User added_user_id ;

    @ManyToOne(optional = true)
    @JoinColumn(name = "update_user_id", referencedColumnName = "id")
    private User update_user_id ;

    @Column(name="delete_user")
    private Integer delete_user;

    public Item(Integer id,String itemcode,String itemname,BigDecimal salesprice,BigDecimal purchaseprice , ItemStatus itemstatus_id,
    User added_user_id, Integer delete_user){
        this.id = id;
        this.itemcode = itemcode;
        this.itemname = itemname;
        this.salesprice = salesprice;
        this.purchaseprice = purchaseprice;
        this.itemstatus_id = itemstatus_id;
        this.added_user_id = added_user_id;
        this.delete_user = delete_user;
      
    }

    public Item(Integer id,String itemcode,String itemname, BigDecimal purchaseprice){
        this.id = id;
        this.itemcode = itemcode;
        this.itemname = itemname;
        this.purchaseprice = purchaseprice;
   
      
    }


}
