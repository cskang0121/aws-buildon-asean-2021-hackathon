package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service layer for handling logic related to want to buy listings
 */
@Service
public class WTBService {

    @Autowired
    private WTBRepo wtbRepo;
    @Autowired
    private JwtUserDetailsService userService;

    // public List<WantToBuyListing> saveAll(Iterable<WantToBuyListing> entities) {
    // return wtbRepo.saveAll(entities);
    // }

    public WantToBuyListing findById(Long id) {
        return wtbRepo.findById(id).get();
    }

    public List<WantToBuyListing> findAll() {
        return wtbRepo.findAll();
    }

    public List<WantToBuyListing> findByUser(Long userId) {
        User user = userService.findInRepoById(userId);
        return wtbRepo.findByUser(user);
    }

    public WantToBuyListing save(WantToBuyListing entity) {
        return wtbRepo.save(entity);
    }

    public void deleteById(Long wtbId) {
        wtbRepo.deleteById(wtbId);
    }

    public List<WantToBuyListing> getSearchResults(String keyword, String categoryName) {
        // return wtbRepo.findByTitleContaining(keyword);
        return wtbRepo.findByTitleAndCategoryContaining(keyword, categoryName);
    }
}
