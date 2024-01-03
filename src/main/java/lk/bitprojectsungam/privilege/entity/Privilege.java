package lk.bitprojectsungam.privilege.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import lk.bitprojectsungam.employee.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity // apply as an entity class
@Table(name = "privilege") // for map with given table
@Data // generate getters and setters
@NoArgsConstructor // generate default constructor
@AllArgsConstructor // all arguments constructor
public class Privilege {
     @Id // for pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
    @Column(name = "id ", unique = true) // for map with column name
    @NotNull 
    private Integer id;

    @Column(name = "sel")
    @NotNull
    private Boolean sel;

    @Column(name = "inst")
    @NotNull
    private Boolean inst;

    @Column(name = "upd")
    @NotNull
    private Boolean upd;

    @Column(name = "del")
    @NotNull
    private Boolean del;

    @Column(name = "status")
    @NotNull
    private Boolean status;

    @ManyToOne // relationship format
    @JoinColumn(name = "role_id", referencedColumnName = "id") //join column condition
    private Role role_id ;
    
    @ManyToOne // relationship format
    @JoinColumn(name = "module_id", referencedColumnName = "id") //join column condition
    private Module module_id ;
}
