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
@RequestMapping("/api/v1/buyer-qna/")
public class BuyerQnAController {
    @Autowired
    private BuyerQnAService buyerQnAService;

    @PostMapping("/post/many")
    public List<BuyerQnA> postBuyerQnAs(@RequestBody List<BuyerQnA> buyerQnAs) {
        return buyerQnAService.saveManyBuyerQnAs(buyerQnAs);
    }

    @GetMapping("/get/wtblisting={id}")
    public List<BuyerQnA> getQnAsByWtbListing(@PathVariable Long id) {
        return buyerQnAService.findByWtbId(id);
    }

    @PostMapping("/post/many-answers")
    public List<AnswerQnA> postAnswerQnAs(@RequestBody List<AnswerQnA> answerQnAs) {
        return buyerQnAService.saveManyAnswerQnAs(answerQnAs);
    }

    @GetMapping("/get/answer/seller={sellerId}&wtbid={wtbId}&ifsid={ifsId}")
    public List<AnswerQnA> getAnswerQnAByDeal(@PathVariable Long sellerId, @PathVariable Long wtbId,
            @PathVariable Long ifsId) {
        return buyerQnAService.findAnswerQnAByDeal(sellerId, wtbId, ifsId);
    }
}
