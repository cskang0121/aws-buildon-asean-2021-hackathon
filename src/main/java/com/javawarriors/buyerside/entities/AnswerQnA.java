package com.javawarriors.buyerside.entities;

import javax.persistence.*;

import com.javawarriors.buyerside.entities.BuyerQnA;

@Entity
@Table(name = "AnswerQnA")
public class AnswerQnA {
    @ManyToOne
    @JoinColumn(name = "wtb_id")
    @Column(nullable = false, unique = true, length = 45)
    private BuyerQnA buyerQnA;
    
    @ManyToOne
    @JoinColumn(name = "wtb_id")
    @Column(nullable = false, unique = true, length = 45)
    private Long qnaId;

    ManyToOne
    @JoinColumn(name = "seller_id")
    @Column(nullable = false, unique = true, length = 45)
    private Long sellerId;
    
    @ManyToOne
    @JoinColumn(name = "wtb_id")
    @Column(nullable = false, unique = true, length = 45)
    private Long wtbId;

    @ManyToOne
    @JoinColumn(name = "ifs_id")
    @Column(nullable = false, unique = true, length = 45)
    private Long ifsId;

    /** getters and setters for the variables of the AnswerQnA */

   
}
