package com.javawarriors.buyerside.entities;

import javax.persistence.*;

import com.javawarriors.buyerside.entities.compositeKeys.*;

@Entity
@Table(name = "seller_qna")
@IdClass(SellerQnAPK.class)
public class SellerQnA {
    @ManyToOne
    @JoinColumn(name = "ifs_id")
    @Id
    private ItemForSaleListing ifsListing;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long qnaId;

    private String question;

    @ManyToOne
    @JoinColumn(name = "asker_id")
    private User asker;

    @ManyToOne
    @JoinColumn(name = "answerer_id")
    private User answerer;

    private String answer;

    public ItemForSaleListing getIfsListing() {
        return this.ifsListing;
    }

    public void setIfsListing(ItemForSaleListing ifsListing) {
        this.ifsListing = ifsListing;
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

    public User getAsker() {
        return this.asker;
    }

    public void setAsker(User asker) {
        this.asker = asker;
    }

    public User getAnswerer() {
        return this.answerer;
    }

    public void setAnswerer(User answerer) {
        this.answerer = answerer;
    }

    public String getAnswer() {
        return this.answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

}
