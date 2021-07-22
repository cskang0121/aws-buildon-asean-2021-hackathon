package com.javawarriors.buyerside.controllers;
import com.javawarriors.buyerside.entities.*;
import com.javawarriors.buyerside.services.*;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Date;
import java.util.List;

/**
 * Controller for Deals
 */

@CrossOrigin
@RestController
@RequestMapping("/api/v1/deal/")
public class DealController {
    @Autowired
    private DealService dealService;

    @Autowired
    private IFSController ifsController;
    @Autowired
    private WTBController wtbController;

    @PostMapping("/post")
    public Deal postDeal(@RequestBody Deal newDeal) {
        newDeal.setDateOfDeal(new Date());
        dealService.saveDeal(newDeal);
        return newDeal;
    }

    @GetMapping("/get/wtblisting={id}")
    public List<Deal> getDealsByWtbId(@PathVariable Long id) {
        return dealService.findByWtbId(id);
    }

    @GetMapping("/get/ifslisting={id}")
    public List<Deal> getDealsByIfsId(@PathVariable Long id) {
        return dealService.findByIfsId(id);
    }

    @PostMapping("/post/accept")
    public List<Deal> postAcceptedDeals(@RequestBody List<Deal> deals) {
        // logger.info(String.valueOf(ifsListing.getStatus()));
        ItemForSaleListing ifsListing = deals.get(0).getIfsId();
        ifsListing.setStatus('p');
        ifsController.postIFSListing(ifsListing);
        WantToBuyListing wtbListing = deals.get(0).getWtbId();
        wtbListing.setStatus('p');
        wtbController.postWTBListing(wtbListing);
        return dealService.saveManyDeals(deals);
    }

}
