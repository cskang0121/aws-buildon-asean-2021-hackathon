package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.repositories.*;

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

    public Offer saveOffer(Offer entity) {
        return offerRepo.save(entity);
    }
}
