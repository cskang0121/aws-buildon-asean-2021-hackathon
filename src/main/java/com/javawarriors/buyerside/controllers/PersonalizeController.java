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
 * Controller for Recommendations
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/recommend/")
public class PersonalizeController {
    @Autowired
    private PersonalizeService personalizeService;

    @GetMapping("/get/itemid={itemId}")
    public List<String> getRecommendationsForItem(@PathVariable Long itemId) {
        return personalizeService.getRecs(itemId);
    }
}
