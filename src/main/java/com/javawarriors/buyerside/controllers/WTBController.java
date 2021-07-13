package com.javawarriors.buyerside.controllers;

import java.util.*;

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

/**
 * Controller for want to buy listings
 */


@CrossOrigin(origins={ "http://localhost:3000" })
@RestController
@RequestMapping("/api/v1/")
public class WTBController {
    /**
     * Connects to the service layer for want to buy listings
     */
    @Autowired
    private WTBService wtbService;

    Logger logger = LoggerFactory.getLogger(WTBController.class);

    @GetMapping("/wtb-listing/get")
    public List<WantToBuyListing> getAllWTBListings() {
        return wtbService.findAll();
    }

    @GetMapping("/wtb-listing/get/{id}")
    public List<WantToBuyListing> getWTBListingsById(@PathVariable Long id) {
        return wtbService.findByUser(id);
    }

    @PostMapping("/wtb-listing/post")
    public WantToBuyListing postWTBListing(@RequestBody WantToBuyListing newWTBListing) {
        wtbService.save(newWTBListing);
        return newWTBListing;
    }

    @PostMapping("/wtb-listing/deleteWTB/post")
    public void deleteWTB(@RequestBody WantToBuyListing toDeleteWTBListing) {
        wtbService.deleteById(toDeleteWTBListing.getWtbId());
    }

    // @PostMapping("/wtb-listing/editWTB/post")
    // public void editWTB(@RequestBody WantToBuyListing toEditWTBListing) {
    // }

    @GetMapping("/wtb-listing/searchWTB/get")
    public List<WantToBuyListing> searchWTB(@RequestParam(name = "keyword") String Keyword) {
        List<WantToBuyListing> listings = wtbService.getSearchResults(Keyword);
        return listings;
    }

}
