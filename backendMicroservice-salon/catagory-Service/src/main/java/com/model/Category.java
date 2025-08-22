
package com.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // Primary key, matches DB column

    @Column(nullable = false)
    private String name;

    private String image;

    @Column( nullable = false)
    private Long salonId; // Just store the ID instead of the full Salon object
}
