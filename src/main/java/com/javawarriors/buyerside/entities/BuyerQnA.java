package com.javawarriors.buyerside.entities;

import javax.persistence.*;

@Entity
@Table(name = "buyerQnA")
public class BuyerQnA {
    @ManyToOne
    @JoinColumn(name = "wtb_id")
    @Column(nullable = false, unique = true, length = 45)
    private Long wtbId;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qnaId;

    private String question;

    /** getters and setters for the variables of the BuyerQnA */

    public Long getWtbId() {
        return this.wtbId;
    }

    public void setWtbId(Long wtbId) {
        this.wtbId = wtbId;
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
