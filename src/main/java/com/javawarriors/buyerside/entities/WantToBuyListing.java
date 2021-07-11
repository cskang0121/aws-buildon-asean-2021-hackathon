package com.javawarriors.buyerside.entities;

import javax.persistence.*;

/**
 * Java class that represents users in the database
 */
@Entity
@Table(name = "wantToBuyListing")
public class WantToBuyListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wtbId;

    @ManyToOne
    @JoinColumn(name = "uid")
    @Column(nullable = false, unique = true, length = 45)
    private Long uid;

    private String picUri;

    private String title;

    private String desc;

    private Character status;

    private String category;

    /** getters and setters for the variables of the WTBlisting */

    public Long getWtbid() {
        return this.wtbid;
    }

    public void setWtbid(Long wtbid) {
        this.wtbid = wtbid;
    }
    
    public Long getUid() {
        return this.uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

    public String getPicUri() {
        return this.picUri;
    }

    public void setPicUri(String picUri) {
        this.picUri = picUri;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return this.desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Character getStatus() {
        return this.status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    

}
