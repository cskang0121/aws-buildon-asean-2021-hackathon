package com.javawarriors.buyerside.controllers;
import javax.servlet.http.HttpServletRequest;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.services.*;

import org.slf4j.*;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;
import java.util.List;

/**
 * Controller for Offers
 */

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @Autowired
    private IFSController ifsController;

    @PostMapping("/offer/post")
    public Offer postOffer(@RequestBody Offer newOffer) {
        newOffer.setDateOfOffer(new Date());
        offerService.saveOffer(newOffer);
        return newOffer;
    }

    @GetMapping("/offer/get/madeby={id}")
    public List<Offer> getOffersMadeByUser(@PathVariable Long id) {
        return offerService.findByUser(id);
    }

    @GetMapping("/offer/get/receivedby={id}")
    public List<Offer> getOffersReceivedByUser(@PathVariable Long id) {
        List<ItemForSaleListing> ifsListings = ifsController.getIFSListingsByUser(id);
        return offerService.findByIfsListingIn(ifsListings);
    }
    
}
