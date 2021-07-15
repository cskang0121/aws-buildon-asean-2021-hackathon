package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
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

    public Deal saveDeal(Deal entity) {
        return dealRepo.save(entity);
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

    public void deleteByWtbId(Long wtbId) {
        List<Deal> toDeleteDeal = findByWtbId(wtbId);
        for (Deal deal : toDeleteDeal) {
            dealRepo.delete(deal);
        }
    }

    public void deleteByIfsId(Long ifsId) {
        List<Deal> toDeleteDeal = findByIfsId(ifsId);
        for (Deal deal : toDeleteDeal) {
            dealRepo.delete(deal);
        }
    }
}
