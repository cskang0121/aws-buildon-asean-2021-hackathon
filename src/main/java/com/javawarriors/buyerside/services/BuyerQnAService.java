package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.repositories.*;
import com.javawarriors.buyerside.entities.compositeKeys.DealPK;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service layer for handling logic related to buyer QnA
 */
@Service
public class BuyerQnAService {
    @Autowired
    private BuyerQnARepo buyerQnARepo;
    @Autowired
    private AnswerQnARepo answerQnARepo;

    @Autowired
    private WTBService wtbService;
    @Autowired
    private DealService dealService;

    public List<BuyerQnA> saveManyBuyerQnAs(Iterable<BuyerQnA> buyerQnAs) {
        return buyerQnARepo.saveAll(buyerQnAs);
    }

    public List<BuyerQnA> findByWtbId(Long wtbId) {
        WantToBuyListing wtbListing = wtbService.findById(wtbId);
        return buyerQnARepo.findByWtbListing(wtbListing);
    }

    public void deleteByWtbId(Long wtbId) {
        List<BuyerQnA> toDeleteQnA = findByWtbId(wtbId);
        for (BuyerQnA buyerQnA : toDeleteQnA) {
            buyerQnARepo.delete(buyerQnA);
        }
    }

    public List<AnswerQnA> saveManyAnswerQnAs(Iterable<AnswerQnA> answerQnAs) {
        return answerQnARepo.saveAll(answerQnAs);
    }

    public List<AnswerQnA> findAnswerQnAByDeal(Long sellerId, Long wtbId, Long ifsId) {
        DealPK dealPK = new DealPK(sellerId, wtbId, ifsId);
        Deal deal = dealService.findById(dealPK);
        return answerQnARepo.findByDeal(deal);

    }
}
