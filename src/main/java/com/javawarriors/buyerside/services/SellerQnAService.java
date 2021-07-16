package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.repositories.*;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service layer for handling logic related to buyer QnA
 */
@Service
public class SellerQnAService {
    @Autowired
    private SellerQnARepo sellerQnARepo;

    @Autowired
    private IFSService ifsService;

    public SellerQnA saveSellerQnA(SellerQnA sellerQnA) {
        return sellerQnARepo.save(sellerQnA);
    }

    public List<SellerQnA> findByIfsListing(Long ifsId) {
        ItemForSaleListing ifsListing = ifsService.findByListingId(ifsId);
        return sellerQnARepo.findByIfsListing(ifsListing);
    }

}
