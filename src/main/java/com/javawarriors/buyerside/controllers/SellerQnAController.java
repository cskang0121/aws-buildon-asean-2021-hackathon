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
 * Controller for Buyer QnA
 */
@CrossOrigin
@RestController
@RequestMapping("/api/v1/seller-qna/")
public class SellerQnAController {
    @Autowired
    private SellerQnAService sellerQnAService;

    @PostMapping("/post")
    public SellerQnA postSellerQnA(@RequestBody SellerQnA sellerQnA) {
        return sellerQnAService.saveSellerQnA(sellerQnA);
    }

    @GetMapping("/get/ifslisting={id}")
    public List<SellerQnA> getQnAsByIfsListing(@PathVariable Long id) {
        return sellerQnAService.findByIfsListing(id);
    }
}
