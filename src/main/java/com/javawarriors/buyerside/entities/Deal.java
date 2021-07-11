package com.javawarriors.buyerside.entities;

import java.util.Date;
import com.javawarriors.buyerside.entities.compositeKeys.*;

import javax.persistence.*;

@Entity
@Table(name = "deal")
@IdClass(DealPK.class)
public class Deal {
    @Id
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    @Id
    @ManyToOne
    @JoinColumn(name = "wtb_id")
    private WantToBuyListing wtbId;

    @Id
    @ManyToOne
    @JoinColumn(name = "ifs_id")
    private ItemForSaleListing ifsId;

    private Double priceToSellFor;

    private Date dateOfDeal;

    /** getters and setters for the variables of the Deal */

    public User getSeller() {
		return this.seller;
	}

	public void setSeller(User seller) {
		this.seller = seller;
	}

    public WantToBuyListing getWtbId() {
		return this.wtbId;
	}

	public void setWtbId(WantToBuyListing wtbId) {
		this.wtbId = wtbId;
	}

	public ItemForSaleListing getIfsId() {
		return this.ifsId;
	}

	public void setIfsId(ItemForSaleListing ifsId) {
		this.ifsId = ifsId;
	}
    
    public Double getPriceToSellFor() {
        return this.priceToSellFor;
    }

    public void setPriceToSellFor(Double priceToSellFor) {
        this.priceToSellFor = priceToSellFor;
    }

    public Date getDateOfDeal() {
        return this.dateOfDeal;
    }

    public void setDateOfDeal(Date dateOfDeal) {
        this.dateOfDeal = dateOfDeal;
    }

}
