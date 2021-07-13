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

    public List<ItemForSaleListing> findByUser(User user);

}