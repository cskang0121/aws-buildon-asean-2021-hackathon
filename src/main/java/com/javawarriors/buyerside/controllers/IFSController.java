package com.javawarriors.buyerside.controllers;

import java.util.*;
import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.services.*;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Controller for want to buy listings
 */

@CrossOrigin
@RestController
@RequestMapping("/api/v1/ifs-listing/")
public class IFSController {
    /**
     * Connects to the service layer for item for sale listings
     */
    @Autowired
    private IFSService ifsService;

    Logger logger = LoggerFactory.getLogger(IFSController.class);

    @GetMapping("/get")
    public List<ItemForSaleListing> getAllIFSListings() {
        return ifsService.findAll();
    }

    @GetMapping("/get/user={id}")
    public List<ItemForSaleListing> getIFSListingsByUser(@PathVariable Long id) {
        return ifsService.findByUser(id);
    }

    @GetMapping("/get/id={id}")
    public ItemForSaleListing getIFSListingsById(@PathVariable Long id) {
        return ifsService.findByListingId(id);
    }

    @PostMapping("/post")
    public ItemForSaleListing postIFSListing(@RequestBody ItemForSaleListing newIFSListing) {
        ifsService.save(newIFSListing);
        return newIFSListing;
    }

    @PostMapping("/deleteIFS/post")
    public void deleteIFS(@RequestBody ItemForSaleListing toDeleteIFSListing) {
        ifsService.deleteById(toDeleteIFSListing.getIfsId());
    }

    @GetMapping("/searchIFS/get")
    public List<ItemForSaleListing> searchIFS(
            @RequestParam(name = "keyword") String Keyword,
            @RequestParam(name = "categoryName") String CategoryName,
            @RequestParam(name = "itemCondition") String itemCondition,
            @RequestParam(name = "searchLocation") String searchLocation) {
        List<ItemForSaleListing> listings = ifsService.getSearchResults(Keyword, CategoryName, itemCondition, searchLocation);
        return listings;
    }

    @PostMapping(path = "{ifsId}/image/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void uploadIFSImage(@PathVariable("ifsId") Long ifsId, @RequestParam("file") MultipartFile file) {
        ifsService.uploadIFSImage(ifsId, file);
    }

    @GetMapping(path = "{ifsId}/image/download")
    public String downloadIFSImage(@PathVariable("ifsId") Long ifsId) {
        return ifsService.downloadIFSImage(ifsId);
    }

}
