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
        newDeal.setDateOfDeal(new Date());
        dealService.saveDeal(newDeal);
        return newDeal;
    }

    @GetMapping("/deal/get/wtblisting={id}")
    public List<Deal> getDealsByWtbId(@PathVariable Long id) {
        return dealService.findByWtbId(id);
    }

    @GetMapping("/deal/get/ifslisting={id}")
    public List<Deal> getDealsByIfsId(@PathVariable Long id) {
        return dealService.findByIfsId(id);
    }

    @PostMapping("/deal/post/accept")
    public List<Deal> postAcceptedDeals(@RequestBody List<Deal> deals) {
        //logger.info(String.valueOf(ifsListing.getStatus()));
        return dealService.saveManyDeals(deals);
    }
    

}
