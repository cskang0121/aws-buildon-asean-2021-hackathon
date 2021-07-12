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
public class IFSController {
    /**
     * Connects to the service layer for item for sale listings
     */
    @Autowired
    private IFSService ifsService;

    Logger logger = LoggerFactory.getLogger(IFSController.class);

    @GetMapping("/ifs-listing")
    public List<ItemForSaleListing> getAllIFSListings() {
        return ifsService.findAll();
    }

    @PostMapping("/ifs-listing/post")
    public ItemForSaleListing postIFSListing(@RequestBody ItemForSaleListing newIFSListing) {
        ifsService.save(newIFSListing);
        return newIFSListing;
    }

}
