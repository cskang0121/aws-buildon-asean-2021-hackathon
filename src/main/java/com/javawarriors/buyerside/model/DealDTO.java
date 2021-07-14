package com.javawarriors.buyerside.model;
import java.util.*;
import com.javawarriors.buyerside.entities.*;

public class DealDTO {
    private Long ifsId;
    private User seller;
    private Long wtbId;
    private Double priceToSellFor;
    private Date dateOfDeal;

    public Long getIfsId() {
        return this.ifsId;
    }

    public void setIfsId(Long ifsId) {
        this.ifsId = ifsId;
    }

    public User getSeller() {
        return this.seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public Long getWtbId() {
        return this.wtbId;
    }

    public void setWtbId(Long wtbId) {
        this.wtbId = wtbId;
    }

    public Double getPriceToSellFor() {
        return this.priceToSellFor;
    }

    public void setPriceToSellFor(Double priceToSellFor) {
        this.priceToSellFor = priceToSellFor;
    }

    public Date getDateOfDeal() {
        return this.dateOfDeal;
    }

    public void setDateOfDeal(Date dateOfDeal) {
        this.dateOfDeal = dateOfDeal;
    }

}
