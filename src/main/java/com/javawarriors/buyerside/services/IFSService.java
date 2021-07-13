package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service layer for handling logic related to item for sale listings
 */
@Service
public class IFSService {

    @Autowired
    private IFSRepo ifsRepo;

    // public List<ItemForSaleListing> saveAll(Iterable<ItemForSaleListing> entities) {
    //     return ifsRepo.saveAll(entities);
    // }

    public List<ItemForSaleListing> findAll() {
        return ifsRepo.findAll();
    }

    public ItemForSaleListing save(ItemForSaleListing entity) {
        return ifsRepo.save(entity);
    }

    public void deleteById(Long ifsId) {
        ifsRepo.deleteById(ifsId);
    }
}
