package lk.bitprojectsungam.item.entity;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "brand_has_category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandHasCategory {
    @Id
 @ManyToOne // relationship format
    @JoinColumn(name = "brand_id", referencedColumnName = "id") //join column condition
    private Category brand_id ;

    @Id
    @ManyToOne // relationship format
    @JoinColumn(name = "category_id", referencedColumnName = "id") //join column condition
    private Category category_id ;
}
