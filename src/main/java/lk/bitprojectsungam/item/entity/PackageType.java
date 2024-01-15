package lk.bitprojectsungam.item.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "packagetype")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PackageType {
        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @NotNull
    @Column(name = "id", unique = true)
    private Integer id;


    @Column(name = "name")
    @NotNull
    private String name ;


    public List<PackageType> findAll() {
        return null;
    }
}
