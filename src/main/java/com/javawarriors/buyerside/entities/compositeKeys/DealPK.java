package com.javawarriors.buyerside.entities.compositeKeys;

import java.io.Serializable;
import java.util.Objects;

/*
 * Java class that represents the composite primary key of History
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
     * Implementation of the hashCode method 
     * 
     * @return hash code
     */
    @Override
    public int hashCode() {
        return Objects.hash(seller, wtbId, ifsId);
    }
}