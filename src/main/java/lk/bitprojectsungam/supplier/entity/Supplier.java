package lk.bitprojectsungam.supplier.entity;

import java.util.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lk.bitprojectsungam.item.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "supplier")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Supplier {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy =GenerationType.IDENTITY )
    private Integer id;

    @Column(name = "regno")
    @NotNull
    private String regno;

    @Column(name = "brn") 
    @NotNull   
    private String brn;

    @Column(name = "suppliername")  
    @NotNull  
    private String suppliername;

    @ManyToOne(optional =  false)  //optional false = not null pass krnn ba  
    @JoinColumn(name = "supplierstatus_id", referencedColumnName = "id")
    private SupplierStatus supplierstatus_id;

    @ManyToMany
    @JoinTable(name = "supplier_has_item", joinColumns = @JoinColumn(name = "supplier_id"),inverseJoinColumns = @JoinColumn(name="item_id"))
    private Set<Item> items;
}   
