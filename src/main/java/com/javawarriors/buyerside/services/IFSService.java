package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

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

    public List<ItemForSaleListing> findAll() {
        return ifsRepo.findAll();
    }

    public List<ItemForSaleListing> findAllById(Iterable<Long> ids) {
        return ifsRepo.findAllById(ids);
    }

    public ItemForSaleListing save(ItemForSaleListing entity) {
        entity.setDateOfCreation(new Date());
        return ifsRepo.save(entity);
    }

    public void deleteById(Long ifsId) {
        sellerQnAService.deleteByIfsListing(ifsId);
        dealService.deleteByIfsId(ifsId);
        offerService.deleteByIfsId(ifsId);
        ifsRepo.deleteById(ifsId);
    }
    public List<ItemForSaleListing> findByUser(Long userId) {
        User user = userService.findInRepoById(userId);
        return ifsRepo.findByUser(user);
    }

    public List<ItemForSaleListing> getSearchResults(String keyword, String categoryName, String itemCondition,
            String searchLocation) {
        if (itemCondition.equals("")) {
            return ifsRepo.findByTitleAndCategoryAndLocationContaining(keyword, categoryName, searchLocation);
        }

        String[] conditionArr = itemCondition.split("\\|");
        List<String> conditionList = Arrays.asList(conditionArr);

        return ifsRepo.findByTitleAndCategoryAndConditionAndLocationContaining(keyword, categoryName, conditionList,
                searchLocation);
    }

    public ItemForSaleListing findByListingId(Long id) {
        return ifsRepo.findById(id).get();
    }

    public void uploadIFSImage(Long ifsId, MultipartFile file) {
        String picUri = s3UploadService.upload(ifsId, "IFS", file);

        ItemForSaleListing itemForSaleListing = findByListingId(ifsId);
        itemForSaleListing.setPicUri(picUri);
        save(itemForSaleListing);
    }

    public String downloadIFSImage(Long ifsId) {
        ItemForSaleListing itemForSaleListing = findByListingId(ifsId);
        String picUri = itemForSaleListing.getPicUri();
        byte[] byteArr = s3UploadService.download(picUri);
        String encodedMime = Base64.getMimeEncoder().encodeToString(byteArr);
        return encodedMime;
    }

}
