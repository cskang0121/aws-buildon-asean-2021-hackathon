package com.javawarriors.buyerside.entities;

import javax.persistence.*;
import com.javawarriors.buyerside.entities.compositeKeys.*;

@Entity
@Table(name = "buyerQnA")
@IdClass(BuyerQnAPK.class)
public class BuyerQnA {
    @ManyToOne
    @JoinColumn(name = "wtb_id")
    @Id
    private WantToBuyListing wtbListing;

    @Id
    private Long qnaId;

    private String question;

    /** getters and setters for the variables of the BuyerQnA */

    public WantToBuyListing getWtbListing() {
        return this.wtbListing;
    }

    public void setWtbListing(WantToBuyListing wtbListing) {
        this.wtbListing = wtbListing;
    }

    public Long getQnaId() {
        return this.qnaId;
    }

    public void setQnaId(Long qnaId) {
        this.qnaId = qnaId;
    }

    public String getQuestion() {
        return this.question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
