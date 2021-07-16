package com.javawarriors.buyerside.entities.compositeKeys;

import java.io.Serializable;
import java.util.Objects;

/*
 * Java class that represents the composite primary key of History
 */
public class OfferPK implements Serializable {
    private Long buyer;
    private Long ifsListing;

    /**
     * No argument constructor
     */
    public OfferPK() {

    }

    public OfferPK(Long buyer, Long ifsListing) {
        this.buyer = buyer;
        this.ifsListing = ifsListing;
    }

    /**
     * Getters and setters
     */

    public Long getBuyer() {
        return this.buyer;
    }

    public void setBuyer(Long buyer) {
        this.buyer = buyer;
    }

    public Long getIfsListing() {
        return this.ifsListing;
    }

    public void setIfsListing(Long ifsListing) {
        this.ifsListing = ifsListing;
    }

    /**
     * Implementation of the equals method
     * 
     * @param o object to compare to
     */
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        OfferPK offerKey = (OfferPK) o;
        return buyer.equals(offerKey.buyer) && ifsListing.equals(offerKey.ifsListing);
    }

    /**
     * Implementation of the hashCode method
     * 
     * @return hash code
     */
    @Override
    public int hashCode() {
        return Objects.hash(buyer, ifsListing);
    }
}