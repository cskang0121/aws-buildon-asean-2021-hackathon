package com.javawarriors.buyerside.entities;

import java.util.*;
import javax.persistence.*;

@Entity
@Table(name="tag_category")
public class TagCategory {
    @Id
    private String tagCategoryName;

    @OneToMany(mappedBy = "tagCategoryName")
    private Collection<Tag> tags;

}
