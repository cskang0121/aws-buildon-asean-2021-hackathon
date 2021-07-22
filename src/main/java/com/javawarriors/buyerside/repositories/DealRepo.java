package com.javawarriors.buyerside.repositories;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.entities.compositeKeys.*;

import java.util.*;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring JPA Repository programming model
 */
@Repository
public interface DealRepo extends JpaRepository<Deal, DealPK> {
    public List<Deal> findByWtbId(WantToBuyListing wtbId);
    public List<Deal> findByIfsId(ItemForSaleListing ifsId);
}