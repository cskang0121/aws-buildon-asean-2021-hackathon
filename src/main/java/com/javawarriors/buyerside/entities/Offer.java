package com.javawarriors.buyerside.entities;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "offer")
public class Offer {
    @ManyToOne
    @JoinColumn(name = "uid")
    @Column(nullable = false, unique = true, length = 45)
    private Long buyerId;
    
    @ManyToOne
    @JoinColumn(name = "ifs_id")
    @Column(nullable = false, unique = true, length = 45)
    private Long ifsId;

    private Integer offeredPrice;

    private Date dateOfOffer;

    private String desc;

    private Character status;

    /** getters and setters for the variables of the Offer */

    public Long getBuyerId() {
        return this.buyerId;
    }

    public void setBuyerId(Long buyerId) {
        this.buyerId = buyerId;
    }

    public Long getIfsId() {
        return this.ifsId;
    }

    public void setIfsId(Long ifsId) {
        this.ifsId = ifsId;
    }

    public Integer getOfferedPrice() {
        return this.offeredPrice;
    }

    public void setOfferedPrice(Integer offeredPrice) {
        this.offeredPrice = offeredPrice;
    }

    public Date getDateOfOffer() {
        return this.dateOfOffer;
    }

    public void setDateOfOffer(Date dateOfOffer) {
        this.dateOfOffer = dateOfOffer;
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
}
