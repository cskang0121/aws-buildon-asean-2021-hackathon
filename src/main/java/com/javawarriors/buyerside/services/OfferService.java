package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.repositories.*;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service layer for handling logic related to making offers for IFS listings
 */
@Service
public class OfferService {
    @Autowired
    private OfferRepo offerRepo;

    @Autowired
    private JwtUserDetailsService userService;

    public Offer saveOffer(Offer entity) {
        return offerRepo.save(entity);
    }

    public List<Offer> findByUser(Long userId) {
        User user = userService.findInRepoById(userId);
        return offerRepo.findByBuyer(user);
    }

    public List<Offer> findByIfsListingIn(Collection<ItemForSaleListing> ifsListings) {
        return offerRepo.findByIfsListingIn(ifsListings);
    }
}
