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

    @Query(value = "select * from want_to_buy_listing wtb where (wtb.title like %:keyword% or wtb.category_name like %:keyword%) and wtb.category_name like %:categoryName% and wtb.preferred_meet_up_location like %:searchLocation%", nativeQuery = true)
    public List<WantToBuyListing> findByTitleAndCategoryAndLocationContaining(@Param("keyword") String keyword,
            @Param("categoryName") String categoryName, @Param("searchLocation") String searchLocation);

    @Query(value = "select * from want_to_buy_listing wtb where (wtb.title like %:keyword% or wtb.category_name like %:keyword%) and wtb.category_name like %:categoryName% and wtb.preferred_item_condition in :conditionList and wtb.preferred_meet_up_location like %:searchLocation%", nativeQuery = true)
    public List<WantToBuyListing> findByTitleAndCategoryAndConditionAndLocationContaining(
            @Param("keyword") String keyword, @Param("categoryName") String categoryName,
            @Param("conditionList") Collection<String> conditionList, @Param("searchLocation") String searchLocation);

    public List<WantToBuyListing> findByUser(User user);

    public List<WantToBuyListing> findByUserAndStatus(User user, Character status);

}