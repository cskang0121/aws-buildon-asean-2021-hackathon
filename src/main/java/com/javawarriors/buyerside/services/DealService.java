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

    public Deal saveDeal(Deal entity) {
        return dealRepo.save(entity);
    }
}
