package com.javawarriors.buyerside.entities.compositeKeys;

import java.io.Serializable;
import java.util.Objects;

public class AnswerQnAPK implements Serializable {
    private DealPK deal;
    private Long answerId;

    /**
     * No argument constructor
     */
    public AnswerQnAPK() {

    }

    public AnswerQnAPK(DealPK deal, Long answerId) {
        this.deal = deal;
        this.answerId = answerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        AnswerQnAPK answerQnaKey = (AnswerQnAPK) o;
        return deal.equals(answerQnaKey.deal) && answerId.equals(answerQnaKey.answerId);
    }

    /**
     * Implementation of the hashCode method 
     * 
     * @return hash code
     */
    @Override
    public int hashCode() {
        return Objects.hash(deal, answerId);
    }
}