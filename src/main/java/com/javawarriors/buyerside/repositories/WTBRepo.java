package com.javawarriors.buyerside.repositories;

import com.javawarriors.buyerside.entities.*;

import java.util.*;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Spring JPA Repository programming model
 */
@Repository
public interface WTBRepo extends JpaRepository<WantToBuyListing, Long> {
    
    public List<WantToBuyListing> findByTitleContaining(String keyword);

    @Query(value = "select * from want_to_buy_listing wtb where wtb.title like %:keyword% and wtb.category_name like %:categoryName%", nativeQuery = true)
    public List<WantToBuyListing> findByTitleAndCategoryContaining(@Param("keyword") String keyword, @Param("categoryName") String categoryName);

    public List<WantToBuyListing> findByUser(User user);

}