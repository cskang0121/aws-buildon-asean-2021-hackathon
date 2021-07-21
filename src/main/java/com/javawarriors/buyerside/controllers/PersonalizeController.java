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
import java.util.Map;

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
        return personalizeService.getSIMSRecs(itemId);
    }

    @GetMapping("/get/wtb/user={userId}")
    public List<WantToBuyListing> getWTBRecsForUser(@PathVariable Long userId) {
        return personalizeService.getUserWTBRecs(userId);
    }

    @GetMapping("/get/ifs/user={userId}")
    public List<ItemForSaleListing> getIFSRecsForUser(@PathVariable Long userId) {
        return personalizeService.getUserIFSRecs(userId);
    }

    @PostMapping("/post/event/create/ifs")
    public void deleteIFS(@RequestHeader Map<String, String> headers,
    @RequestBody ItemForSaleListing toDeleteIFSListing) {
        //personalizeService.deleteById(toDeleteIFSListing.getIfsId());
    }


}
