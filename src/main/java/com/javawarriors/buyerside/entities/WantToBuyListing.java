package com.javawarriors.buyerside.entities;

import javax.persistence.*;
import java.util.*;

/**
 * Java class that represents users in the database
 */
@Entity
@Table(name = "want_to_buy_listing")
public class WantToBuyListing {

    @Id
    @Column(name="wtb_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wtbId;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    private String picUri;

    private String title;

    private String description;

    private Character status;

    private Double priceUpper;

    private Double priceLower;

    private String categoryName;

    private String preferredItemCondition;

    private Boolean isPreferredDeliveryMeet;

    private Boolean isPreferredDeliveryDeliver;

    private Boolean isPreferredPaymentCash;

    private Boolean isPreferredPaymentPayNow;
    
    private String preferredMeetUpLocation;

    private Date dateOfCreation;

	public Long getWtbId() {
		return this.wtbId;
	}

	public void setWtbId(Long wtbId) {
		this.wtbId = wtbId;
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

    public String getCategoryName() {
        return this.categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
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

    public String getPreferredItemCondition() {
        return this.preferredItemCondition;
    }

    public void setPreferredItemCondition(String preferredItemCondition) {
        this.preferredItemCondition = preferredItemCondition;
    }

    public Boolean getIsPreferredDeliveryMeet() {
        return this.isPreferredDeliveryMeet;
    }

    public void setIsPreferredDeliveryMeet(Boolean isPreferredDeliveryMeet) {
        this.isPreferredDeliveryMeet = isPreferredDeliveryMeet;
    }

    public Boolean getIsPreferredDeliveryDeliver() {
        return this.isPreferredDeliveryDeliver;
    }

    public void setIsPreferredDeliveryDeliver(Boolean isPreferredDeliveryDeliver) {
        this.isPreferredDeliveryDeliver = isPreferredDeliveryDeliver;
    }

    public Boolean getIsPreferredPaymentCash() {
        return this.isPreferredPaymentCash;
    }

    public void setIsPreferredPaymentCash(Boolean isPreferredPaymentCash) {
        this.isPreferredPaymentCash = isPreferredPaymentCash;
    }

    public Boolean getIsPreferredPaymentPayNow() {
        return this.isPreferredPaymentPayNow;
    }

    public void setIsPreferredPaymentPayNow(Boolean isPreferredPaymentPayNow) {
        this.isPreferredPaymentPayNow = isPreferredPaymentPayNow;
    }

    public String getPreferredMeetUpLocation() {
        return this.preferredMeetUpLocation;
    }

    public void setPreferredMeetUpLocation(String preferredMeetUpLocation) {
        this.preferredMeetUpLocation = preferredMeetUpLocation;
    }

    public Date getDateOfCreation() {
		return this.dateOfCreation;
	}

	public void setDateOfCreation(Date dateOfCreation) {
		this.dateOfCreation = dateOfCreation;
	}

}
