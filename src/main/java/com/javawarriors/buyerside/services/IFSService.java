package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.repositories.*;
// import com.javawarriors.buyerside.bucket.*;
// import com.javawarriors.buyerside.fileStore.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.apache.http.entity.ContentType.*;

/**
 * Service layer for handling logic related to item for sale listings
 */
@Service
public class IFSService {

    @Autowired
    private IFSRepo ifsRepo;
    @Autowired
    private JwtUserDetailsService userService;

    @Autowired
    private OfferService offerService;
    @Autowired
    private DealService dealService;
    @Autowired
    private SellerQnAService sellerQnAService;
    @Autowired
    private S3UploadService s3UploadService;

    // public List<ItemForSaleListing> saveAll(Iterable<ItemForSaleListing>
    // entities) {
    // return ifsRepo.saveAll(entities);
    // }

    public List<ItemForSaleListing> findAll() {
        return ifsRepo.findAll();
    }

    public ItemForSaleListing save(ItemForSaleListing entity) {
        return ifsRepo.save(entity);
    }

    public void deleteById(Long ifsId) {
        sellerQnAService.deleteByIfsListing(ifsId);
        dealService.deleteByIfsId(ifsId);
        offerService.deleteByIfsId(ifsId);
        ifsRepo.deleteById(ifsId);
    }

    public List<ItemForSaleListing> getSearchResults(String keyword) {
        return ifsRepo.findByTitleContaining(keyword);
    }

    public List<ItemForSaleListing> findByUser(Long userId) {
        User user = userService.findInRepoById(userId);
        return ifsRepo.findByUser(user);
    }

    public List<ItemForSaleListing> getSearchResults(String keyword, String categoryName) {
        // return ifsRepo.findByTitleContaining(keyword);
        return ifsRepo.findByTitleAndCategoryContaining(keyword, categoryName);
    }

    public ItemForSaleListing findByListingId(Long id) {
        return ifsRepo.findById(id).get();
    }

    public void uploadIFSImage(Long ifsId, MultipartFile file) {
        String picUri = "s3://" + s3UploadService.upload(ifsId, "IFS", file);

        ItemForSaleListing itemForSaleListing = findByListingId(ifsId);
        itemForSaleListing.setPicUri(picUri);
        save(itemForSaleListing);
    }

}
