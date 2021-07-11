package com.javawarriors.buyerside.entities;

import java.util.*;
import javax.persistence.*;

@Entity
@Table(name="category")
public class Category {
    @Id
    private String categoryName;

    @OneToMany(mappedBy="category")
    private Collection<ItemForSaleListing> ifsListings;
}