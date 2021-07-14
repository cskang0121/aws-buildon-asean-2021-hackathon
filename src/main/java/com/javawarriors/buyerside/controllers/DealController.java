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

/**
 * Controller for Deals
 */

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class DealController {
    @Autowired
    private DealService dealService;

    @PostMapping("/deal/post")
    public Deal postDeal(@RequestBody Deal newDeal) {
        dealService.saveDeal(newDeal);
        return newDeal;
    }
}
