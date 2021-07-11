package com.javawarriors.buyerside.entities.compositeKeys;

import java.io.Serializable;
import java.util.Objects;

public class BuyerQnAPK implements Serializable {
    private Long wtbId;
    private Long qnaId;

    /**
     * No argument constructor
     */
    public BuyerQnAPK() {

    }

    public BuyerQnAPK(Long wtbId, Long qnaId) {
        this.wtbId = wtbId;
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
        return wtbId.equals(buyerQnaKey.wtbId) && qnaId.equals(buyerQnaKey.qnaId);
    }

    /**
     * Implementation of the hashCode method 
     * 
     * @return hash code
     */
    @Override
    public int hashCode() {
        return Objects.hash(wtbId, qnaId);
    }
}