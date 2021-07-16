package com.javawarriors.buyerside.services;

import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.repositories.*;
import com.javawarriors.buyerside.bucket.*;
import com.javawarriors.buyerside.fileStore.*;

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
    private FileStore fileStore;

    @Autowired
    private IFSRepo ifsRepo;
    @Autowired
    private JwtUserDetailsService userService;

    @Autowired
    private OfferService offerService;
    @Autowired
    private DealService dealService;

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
        // 1. Check if image is not empty
        isFileEmpty(file);

        // 2. If file is an image
        isImage(file);

        // 4. Grab some metadata from file if any
        Map<String, String> metadata = extractMetadata(file);

        // 5. Store the image in s3 and update database (userProfileImageLink) with s3 image link
        String path = String.format("%s/%s", BucketName.LISTING_IMAGE.getBucketName(), ifsId);
        String filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

        ItemForSaleListing itemForSaleListing = findByListingId(ifsId);

        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
            itemForSaleListing.setPicUri(filename);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

    }

    private void isImage(MultipartFile file) {
        if (!Arrays.asList(
                IMAGE_JPEG.getMimeType(),
                IMAGE_PNG.getMimeType(),
                IMAGE_GIF.getMimeType()).contains(file.getContentType())) {
            throw new IllegalStateException("File must be an image [" + file.getContentType() + "]");
        }
    }

    private void isFileEmpty(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file [ " + file.getSize() + "]");
        }
    }

    private Map<String, String> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

}
