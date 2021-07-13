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

    public Collection<ItemForSaleListing> getIfsListings() {
        return this.ifsListings;
    }

    public void setIfsListings(Collection<ItemForSaleListing> ifsListings) {
        this.ifsListings = ifsListings;
    }

    public String getCategoryName() {
        return this.categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}