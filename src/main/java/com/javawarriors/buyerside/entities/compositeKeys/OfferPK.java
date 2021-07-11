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
     * Implementation of the equals method 
     * 
     * A History object will be equal to another
     * if their HistoryPK is equal 
     * A HistoryPK will be equal to another if their
     * vesselDetail and queryDate are the same
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