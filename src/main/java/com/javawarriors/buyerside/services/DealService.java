package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.entities.compositeKeys.DealPK;
import com.javawarriors.buyerside.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service layer for handling logic related to proposing deals for WTB listings
 */
@Service
public class DealService {
    @Autowired
    private DealRepo dealRepo;
    @Autowired
    private WTBService wtbService;
    @Autowired
    private IFSService ifsService;
    @Autowired
    private BuyerQnAService buyerQnAService;
    @Autowired
    private AnswerQnARepo answerQnARepo;
    @Autowired
    private JwtUserDetailsService userService;

    public Deal saveDeal(Deal entity) {
        return dealRepo.save(entity);
    }

    public Deal findById(DealPK id) {
        return dealRepo.findById(id).get();
    }

    public List<Deal> findByWtbId(Long id) {
        WantToBuyListing wtbListing = wtbService.findById(id);
        return dealRepo.findByWtbId(wtbListing);
    }

    public List<Deal> findByIfsId(Long id) {
        ItemForSaleListing ifsListing = ifsService.findByListingId(id);
        return dealRepo.findByIfsId(ifsListing);
    }

    public List<Deal> saveManyDeals(Iterable<Deal> deals) {
        return dealRepo.saveAll(deals);
    }

    public void deleteDeal(Deal deal) {
        List<AnswerQnA> toDelete = buyerQnAService.findAnswerQnAByDeal(deal.getSeller().getUid(), deal.getWtbId().getWtbId(), deal.getIfsId().getIfsId());
        for (AnswerQnA answerQnA : toDelete) {
            answerQnARepo.delete(answerQnA);
        }
        dealRepo.delete(deal);
    }

    public void deleteByWtbId(Long wtbId) {
        List<Deal> toDeleteDeal = findByWtbId(wtbId);
        for (Deal deal : toDeleteDeal) {
            deleteDeal(deal);
        }
    }

    public void deleteByIfsId(Long ifsId) {
        List<Deal> toDeleteDeal = findByIfsId(ifsId);
        for (Deal deal : toDeleteDeal) {
            deleteDeal(deal);
        }
    }

    public List<Deal> findByUser(Long userId) {
        User user = userService.findInRepoById(userId);
        return dealRepo.findBySeller(user);
    }

    public List<Deal> findByWtbIdIn(Collection<WantToBuyListing> wtbListings) {
        return dealRepo.findByWtbIdIn(wtbListings);
    }
}
