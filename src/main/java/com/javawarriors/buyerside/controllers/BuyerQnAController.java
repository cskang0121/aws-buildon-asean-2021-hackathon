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
@RequestMapping("/api/v1/")
public class BuyerQnAController {
    @Autowired
    private BuyerQnAService buyerQnAService;

    @PostMapping("/buyer-qna/post/many")
    public List<BuyerQnA> postBuyerQnAs(@RequestBody List<BuyerQnA> buyerQnAs) {
        return buyerQnAService.saveManyBuyerQnAs(buyerQnAs);
    }
}
