package com.javawarriors.buyerside.repositories;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.entities.compositeKeys.*;

import java.util.*;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Spring JPA Repository programming model
 */
@Repository
public interface OfferRepo extends JpaRepository<Offer, OfferPK> {
    public List<Offer> findByBuyer(User user);

    public List<Offer> findByIfsListingIn(Collection<ItemForSaleListing> ifsListings);

    public List<Offer> findByIfsListing(ItemForSaleListing ifsListing);
}