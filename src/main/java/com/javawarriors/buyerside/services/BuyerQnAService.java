package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.repositories.*;

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

    public List<BuyerQnA> saveManyBuyerQnAs(Iterable<BuyerQnA> buyerQnAs) {
        return buyerQnARepo.saveAll(buyerQnAs);
    }
}
