package com.javawarriors.buyerside.entities;

import javax.persistence.*;

import com.javawarriors.buyerside.entities.compositeKeys.*;

@Entity
@Table(name = "answer_qna")
@IdClass(AnswerQnAPK.class)
public class AnswerQnA {
    @Id
    @ManyToOne
    @JoinColumns({
        @JoinColumn(name="ifs_id", referencedColumnName="ifs_id"),
        @JoinColumn(name="seller_id", referencedColumnName="seller_id"),
        @JoinColumn(name="wtb_id", referencedColumnName="wtb_id")
    })
    private Deal deal;
    @Id
    private Long answerId;

    private String answer;

    /** getters and setters for the variables of the AnswerQnA */

    public Deal getDeal() {
		return this.deal;
	}

	public void setDeal(Deal deal) {
		this.deal = deal;
	}

	public Long getAnswerId() {
		return this.answerId;
	}

	public void setAnswerId(Long answerId) {
		this.answerId = answerId;
	}

	public String getAnswer() {
		return this.answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

    

    

   
}
