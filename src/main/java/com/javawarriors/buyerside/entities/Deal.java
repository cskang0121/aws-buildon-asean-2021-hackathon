package com.javawarriors.buyerside.entities;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "deal")
public class Deal {
    @ManyToOne
    @JoinColumn(name = "uid")
    @Column(nullable = false, unique = true, length = 45)
    private Long sellerId;
    
    @ManyToOne
    @JoinColumn(name = "wtb_id")
    @Column(nullable = false, unique = true, length = 45)
    private Long wtbId;

    @ManyToOne
    @JoinColumn(name = "ifs_id")
    @Column(nullable = false, unique = true, length = 45)
    private Long ifsId;

    private Double priceToSellFor;

    private Date dateOfDeal;

    /** getters and setters for the variables of the Deal */

    public Long getSellerId() {
        return this.sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public Long getWtbId() {
        return this.wtbId;
    }

    public void setWtbId(Long wtbId) {
        this.wtbId = wtbId;
    }

    public Long getIfsId() {
        return this.ifsId;
    }

    public void setIfsId(Long ifsId) {
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
