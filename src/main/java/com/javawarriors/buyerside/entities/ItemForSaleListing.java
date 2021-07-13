package com.javawarriors.buyerside.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.javawarriors.buyerside.entities.compositeKeys.*;
import javax.persistence.*;
import java.util.*;

@JsonIgnoreProperties(ignoreUnknown = true) // Ignores any unknown field when parsing JSON
@Entity
@Table(name="item_for_sale_listing")
public class ItemForSaleListing {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name="ifs_id")
    private Long ifsId; 

    @ManyToOne
    @JoinColumn(name="uid")
    private User user;
 
    private String picUri;

    private String title;

    private String description;

    private Character status;

    private String listingType;

    private Double price;

    @ManyToMany
    @JoinTable(
        name="ifs_tags",
        joinColumns= {
            @JoinColumn(name="ifs_id", referencedColumnName ="ifs_id")
        },
        inverseJoinColumns = {
            @JoinColumn(name="tag_category_name", referencedColumnName = "tag_category_name"),
            @JoinColumn(name="tag_value", referencedColumnName = "tag_value")
        }
    )
    private Set<Tag> tags;

    @ManyToOne
    @JoinColumn(name="category_name")
    private Category category;

    public Long getIfsId() {
		return this.ifsId;
	}

	public void setIfsId(Long ifsId) {
		this.ifsId = ifsId;
	}

    public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getPicUri() {
		return this.picUri;
	}

	public void setPicUri(String picUri) {
		this.picUri = picUri;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Character getStatus() {
		return this.status;
	}

	public void setStatus(Character status) {
		this.status = status;
	}

	public String getListingType() {
		return this.listingType;
	}

	public void setListingType(String listingType) {
		this.listingType = listingType;
	}

	public Category getCategory() {
		return this.category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Double getPrice() {
		return this.price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

}
