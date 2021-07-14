package com.javawarriors.buyerside.controllers;

import java.util.*;

import javax.servlet.http.HttpServletRequest;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.services.*;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
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


@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class IFSController {
    /**
     * Connects to the service layer for item for sale listings
     */
    @Autowired
    private IFSService ifsService;

    Logger logger = LoggerFactory.getLogger(IFSController.class);

    @GetMapping("/ifs-listing/get")
    public List<ItemForSaleListing> getAllIFSListings() {
        return ifsService.findAll();
    }

    @GetMapping("/ifs-listing/get/user={id}")
    public List<ItemForSaleListing> getIFSListingsByUser(@PathVariable Long id) {
        return ifsService.findByUser(id);
    }

    @PostMapping("/ifs-listing/post")
    public ItemForSaleListing postIFSListing(@RequestBody ItemForSaleListing newIFSListing) {
        ifsService.save(newIFSListing);
        return newIFSListing;
    }

    @PostMapping("/ifs-listing/deleteIFS/post")
    public void deleteIFS(@RequestBody ItemForSaleListing toDeleteIFSListing) {
        ifsService.deleteById(toDeleteIFSListing.getIfsId());
    }

    @GetMapping("/ifs-listing/searchIFS/get")
    public List<ItemForSaleListing> searchIFS(@RequestParam(name = "keyword") String Keyword, @RequestParam(name = "categoryName") String CategoryName) {
        List<ItemForSaleListing> listings = ifsService.getSearchResults(Keyword, CategoryName);
        return listings;
    }

}
