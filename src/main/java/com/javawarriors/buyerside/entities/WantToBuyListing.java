package com.javawarriors.buyerside.entities;

import javax.persistence.*;

/**
 * Java class that represents users in the database
 */
@Entity
@Table(name = "wantToBuyListing")
public class WantToBuyListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wtbId;

    @ManyToOne
    @JoinColumn(name = "uid")
    @Column(nullable = false, unique = true, length = 45)
    private Long uid;

    private String picUri;

    private String title;

    private String desc;

    private Character status;

    private Double priceUpper;

    private Double priceLower;

    @ManyToOne
    @JoinColumn(name="category_name")
    private Category category;

    @ManyToMany
    @JoinTable(
        name="wtb_tags",
        joinColumns= {
            @JoinColumn(name="wtb_id", referencedColumnName ="wtb_id")
        },
        inverseJoinColumns = {
            @JoinColumn(name="tag_category_name", referencedColumnName = "tag_category_name"),
            @JoinColumn(name="tag_value", referencedColumnName = "tag_value")
        }
    )
    private Collection<Tag> tags;

    /** getters and setters for the variables of the WTBlisting */

    public Long getWtbid() {
        return this.wtbid;
    }

    public void setWtbid(Long wtbid) {
        this.wtbid = wtbid;
    }
    
    public Long getUid() {
        return this.uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
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

    public String getDesc() {
        return this.desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Character getStatus() {
        return this.status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Double getPriceUpper() {
		return this.priceUpper;
	}

	public void setPriceUpper(Double priceUpper) {
		this.priceUpper = priceUpper;
	}

	public Double getPriceLower() {
		return this.priceLower;
	}

	public void setPriceLower(Double priceLower) {
		this.priceLower = priceLower;
	}
    

}
