package com.javawarriors.buyerside.controllers;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.services.*;

import org.slf4j.*;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;
import java.util.List;

/**
 * Controller for Offers
 */

@CrossOrigin
@RestController
@RequestMapping("/api/v1/offer/")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @Autowired
    private IFSController ifsController;

    Logger logger = LoggerFactory.getLogger(OfferController.class);

    @PostMapping("/post")
    public Offer postOffer(@RequestBody Offer newOffer) {
        newOffer.setDateOfOffer(new Date());
        return offerService.saveOffer(newOffer);

    }

    @GetMapping("/get/madeby={id}")
    public List<Offer> getOffersMadeByUser(@PathVariable Long id) {
        return offerService.findByUser(id);
    }

    @GetMapping("/get/receivedby={id}")
    public List<Offer> getOffersReceivedByUser(@PathVariable Long id) {
        List<ItemForSaleListing> ifsListings = ifsController.getIFSListingsByUser(id);
        return offerService.findByIfsListingIn(ifsListings);
    }

    @GetMapping("/get/ifslisting={id}")
    public List<Offer> getOffersByIfsListing(@PathVariable Long id) {
        return offerService.findByIfsListing(id);
    }

    @PostMapping("/post/accept")
    public List<Offer> postAcceptedOffers(@RequestBody List<Offer> offers) {
        ItemForSaleListing ifsListing = offers.get(0).getIfsListing();
        ifsListing.setStatus('p');
        ifsController.postIFSListing(ifsListing);
        // logger.info(String.valueOf(ifsListing.getStatus()));
        return offerService.saveManyOffers(offers);
    }

    @PostMapping("/post/confirm")
    public Offer postConfirmOffer(@RequestBody Offer offer) {
        if (offer.getStatus().equals('c')) {
            ItemForSaleListing ifsListing = offer.getIfsListing();
            ifsListing.setStatus('u');
            ifsController.postIFSListing(ifsListing);
        }
        return offerService.saveOffer(offer);
    }

}
