package com.javawarriors.buyerside.repositories;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.entities.compositeKeys.*;

import java.util.*;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Spring JPA Repository programming model
 */
@Repository
public interface BuyerQnARepo extends JpaRepository<BuyerQnA, BuyerQnAPK> {
    // @Query(value = "select * from buyer_qna where wtb_id = :wtbId",
    // nativeQuery = true)
    // public List<BuyerQnA> findByWtbId(@Param("wtbId")WantToBuyListing wtbId);

    public List<BuyerQnA> findByWtbListing(WantToBuyListing wtbListing);

}