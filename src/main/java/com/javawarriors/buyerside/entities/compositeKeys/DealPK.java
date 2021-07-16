package com.javawarriors.buyerside.entities.compositeKeys;

import java.io.Serializable;
import java.util.Objects;

/*
 * Java class that represents the composite primary key of Deal
 */
public class DealPK implements Serializable {
    private Long seller;
    private Long wtbId;
    private Long ifsId;

    /**
     * No argument constructor
     */
    public DealPK() {

    }

    public DealPK(Long seller, Long wtbId, Long ifsId) {
        this.seller = seller;
        this.wtbId = wtbId;
        this.ifsId = ifsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        DealPK dealKey = (DealPK) o;
        return seller.equals(dealKey.seller) && wtbId.equals(dealKey.wtbId) && ifsId.equals(dealKey.ifsId);
    }

    /**
     * Getters and setters 
     */

    public Long getSeller() {
        return this.seller;
    }

    public void setSeller(Long seller) {
        this.seller = seller;
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

    /**
     * Implementation of the hashCode method 
     * 
     * @return hash code
     */
    @Override
    public int hashCode() {
        return Objects.hash(seller, wtbId, ifsId);
    }
}