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
public interface IFSRepo extends JpaRepository<ItemForSaleListing, Long> {

    public List<ItemForSaleListing> findByTitleContaining(String keyword);

    @Query(value = "select * from item_for_sale_listing ifs where ifs.title like %:keyword% and ifs.category_name like %:categoryName%", nativeQuery = true)
    public List<ItemForSaleListing> findByTitleAndCategoryContaining(@Param("keyword") String keyword, @Param("categoryName") String categoryName);

    public List<ItemForSaleListing> findByUser(User user);

}