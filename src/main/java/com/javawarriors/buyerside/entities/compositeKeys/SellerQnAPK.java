package com.javawarriors.buyerside.entities.compositeKeys;

import java.io.Serializable;
import java.util.Objects;

public class SellerQnAPK implements Serializable {
    private Long ifsListing;
    private Long qnaId;

    /**
     * No argument constructor
     */
    public SellerQnAPK() {

    }

    public SellerQnAPK(Long ifsListing, Long qnaId) {
        this.ifsListing = ifsListing;
        this.qnaId = qnaId;
    }

    /**
     * Getters and setters
     */

    public Long getIfsListing() {
        return this.ifsListing;
    }

    public void setIfsListing(Long ifsListing) {
        this.ifsListing = ifsListing;
    }

    public Long getQnaId() {
        return this.qnaId;
    }

    public void setQnaId(Long qnaId) {
        this.qnaId = qnaId;
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
        SellerQnAPK sellerQnaKey = (SellerQnAPK) o;
        return ifsListing.equals(sellerQnaKey.ifsListing) && qnaId.equals(sellerQnaKey.qnaId);
    }

    /**
     * Implementation of the hashCode method
     * 
     * @return hash code
     */
    @Override
    public int hashCode() {
        return Objects.hash(ifsListing, qnaId);
    }
}
