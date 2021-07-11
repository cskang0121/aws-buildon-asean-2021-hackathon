package com.javawarriors.buyerside.entities.compositeKeys;

import java.io.Serializable;
import java.util.Objects;

public class BuyerQnAPK implements Serializable {
    private Long wtbListing;
    private Long qnaId;

    /**
     * No argument constructor
     */
    public BuyerQnAPK() {

    }

    public BuyerQnAPK(Long wtbListing, Long qnaId) {
        this.wtbListing = wtbListing;
        this.qnaId = qnaId;
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
        BuyerQnAPK buyerQnaKey = (BuyerQnAPK) o;
        return wtbListing.equals(buyerQnaKey.wtbListing) && qnaId.equals(buyerQnaKey.qnaId);
    }

    /**
     * Implementation of the hashCode method 
     * 
     * @return hash code
     */
    @Override
    public int hashCode() {
        return Objects.hash(wtbListing, qnaId);
    }
}