package com.javawarriors.buyerside.entities;

import java.util.*;
import javax.persistence.*;
import com.javawarriors.buyerside.entities.compositeKeys.*;

@Entity
@Table(name="tag")
@IdClass(TagPK.class)
public class Tag {
    @Id
    @ManyToOne
    @JoinColumn(name="tag_category_name")
    private TagCategory tagCategoryName;

    @Id
    @Column(name="tag_value")
    private String tagValue;

    @ManyToMany(mappedBy="tags")
    private Set<ItemForSaleListing> ifsListings;

    @ManyToMany(mappedBy="tags")
    private Set<WantToBuyListing> wtbListings;
}
