package com.javawarriors.buyerside.controllers;

import java.util.*;

import javax.servlet.http.HttpServletRequest;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.services.*;

import org.slf4j.*;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for want to buy listings
 */
@Controller
@RequestMapping("api/wtb-listing")
public class WTBController {
    /**
     * Connects to the service layer for want to buy listings
     */
    @Autowired
    private WTBService wtbService;

    Logger logger = LoggerFactory.getLogger(WTBController.class);

    @PostMapping("/post")
    public WantToBuyListing postWTBListing(@RequestBody WantToBuyListing newWTBListing) {
        wtbService.save(newWTBListing);
        return newWTBListing;
    }

}
