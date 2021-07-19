package com.javawarriors.buyerside.controllers;

import java.util.*;

import javax.servlet.http.HttpServletRequest;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.services.*;

import org.slf4j.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Controller for want to buy listings
 */


@CrossOrigin
@RestController
@RequestMapping("/api/v1/wtb-listing/")
public class WTBController {
    /**
     * Connects to the service layer for want to buy listings
     */
    @Autowired
    private WTBService wtbService;

    Logger logger = LoggerFactory.getLogger(WTBController.class);

    @GetMapping("/get")
    public List<WantToBuyListing> getAllWTBListings() {
        return wtbService.findAll();
    }

    @GetMapping("/get/user={id}")
    public List<WantToBuyListing> getWTBListingsByUser(@PathVariable Long id) {
        return wtbService.findByUser(id);
    }

    @PostMapping("/post")
    public WantToBuyListing postWTBListing(@RequestBody WantToBuyListing newWTBListing) {
        wtbService.save(newWTBListing);
        return newWTBListing;
    }

    @PostMapping("/deleteWTB/post")
    public void deleteWTB(@RequestBody WantToBuyListing toDeleteWTBListing) {
        wtbService.deleteById(toDeleteWTBListing.getWtbId());
    }

    // @PostMapping("/wtb-listing/editWTB/post")
    // public void editWTB(@RequestBody WantToBuyListing toEditWTBListing) {
    // }

    @GetMapping("/searchWTB/get")
    public List<WantToBuyListing> searchWTB(@RequestParam(name = "keyword") String Keyword, @RequestParam(name = "categoryName") String CategoryName) {
        List<WantToBuyListing> listings = wtbService.getSearchResults(Keyword, CategoryName);
        return listings;
    }

    @PostMapping(path = "{wtbId}/image/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void uploadWTBImage(@PathVariable("wtbId") Long wtbId, @RequestParam("file") MultipartFile file) {
        wtbService.uploadWTBImage(wtbId, file);
    }

    @GetMapping(path = "{wtbId}/image/download")
    public String downloadWTBImage(@PathVariable("wtbId") Long wtbId) {
        return wtbService.downloadWTBImage(wtbId);
    }

}
