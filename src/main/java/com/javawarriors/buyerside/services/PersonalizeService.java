package com.javawarriors.buyerside.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import software.amazon.awssdk.services.personalizeruntime.PersonalizeRuntimeClient;
import software.amazon.awssdk.services.personalizeruntime.model.GetRecommendationsRequest;
import software.amazon.awssdk.services.personalizeruntime.model.GetRecommendationsResponse;
import software.amazon.awssdk.services.personalizeruntime.model.PredictedItem;
import software.amazon.awssdk.awscore.exception.AwsServiceException;

// import software.amazon.awssdk.services.personalizeevents.PersonalizeEventsClient;
// import software.amazon.awssdk.services.personalizeevents.model.Event;
// import software.amazon.awssdk.services.personalizeevents.model.PutEventsRequest;
// import software.amazon.awssdk.services.personalizeevents.model.PersonalizeEventsException;
//import java.time.Instant;

import java.util.List;

import com.javawarriors.buyerside.entities.ItemForSaleListing;
import com.javawarriors.buyerside.entities.WantToBuyListing;

import java.util.ArrayList;

@Service
public class PersonalizeService {
    @Autowired
    private PersonalizeRuntimeClient personalizeRuntimeClient;

    // @Autowired
    // private PersonalizeEventsClient personalizeEventsClient;

    @Value("${aws.personalize.wtb.campaign_arn_item}")
    private String campaignArnWTBSIMS;

    @Value("${aws.personalize.wtb.campaign_arn_user}")
    private String campaignArnWTBUser;

    @Value("${aws.personalize.wtb.filter_arn_user}")
    private String filterArnWTBUser;

    @Value("${aws.personalize.ifs.campaign_arn_user}")
    private String campaignArnIFSUser;

    @Value("${aws.personalize.ifs.filter_arn_user}")
    private String filterArnIFSUser;

    @Autowired
    private WTBService wtbService;

    @Autowired
    private IFSService ifsService;

    public List<WantToBuyListing> getUserWTBRecs(Long userId) {
        List<Long> itemIdsList = getUserRecs(userId, campaignArnWTBUser, filterArnWTBUser, "WTB");
        List<WantToBuyListing> recommendedListings = wtbService.findAllById(itemIdsList);
        return recommendedListings;
    }

    public List<ItemForSaleListing> getUserIFSRecs(Long userId) {
        List<Long> itemIdsList = getUserRecs(userId, campaignArnIFSUser, filterArnIFSUser, "IFS");
        List<ItemForSaleListing> recommendedListings = ifsService.findAllById(itemIdsList);
        return recommendedListings;
    }

    private List<Long> getUserRecs(Long userId, String campaignArn, String filterArn, String prefix) {
        List<Long> itemIdsList = new ArrayList<>();
        try {
            GetRecommendationsRequest recommendationsRequest = GetRecommendationsRequest.builder()
                    .campaignArn(campaignArn).filterArn(filterArn).numResults(10).userId(String.format("U%02d", userId))
                    .build();

            GetRecommendationsResponse recommendationsResponse = personalizeRuntimeClient
                    .getRecommendations(recommendationsRequest);
            List<PredictedItem> items = recommendationsResponse.itemList();

            for (PredictedItem item : items) {
                if (item.itemId().startsWith(prefix)) {
                    String formattedId = item.itemId().substring(3);
                    itemIdsList.add(Long.parseLong(formattedId));
                }
            }
        } catch (AwsServiceException e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            // System.exit(1);
        }
        return itemIdsList;
    }

    public List<String> getSIMSRecs(Long itemId) {
        List<String> itemIdsList = new ArrayList<>();
        try {
            GetRecommendationsRequest recommendationsRequest = GetRecommendationsRequest.builder()
                    .campaignArn(campaignArnWTBSIMS).numResults(5).itemId(String.valueOf(itemId)).build();

            GetRecommendationsResponse recommendationsResponse = personalizeRuntimeClient
                    .getRecommendations(recommendationsRequest);
            List<PredictedItem> items = recommendationsResponse.itemList();

            for (PredictedItem item : items) {
                itemIdsList.add(item.itemId());
            }
        } catch (AwsServiceException e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }
        return itemIdsList;
    }

    // public void putEventCreateIFS(ItemForSaleListing ifsListing, String
    // sessionId) {
    // String userId = String.format("U%02d", ifsListing.getUser().getUid());
    // String itemId = String.format("IFS%02d", ifsListing.getIfsId());
    // putEvents("f45457e5-5b91-4beb-9800-cd7665828eaa", sessionId, userId, itemId,
    // "post");
    // }

    // public void putEvents(String trackingId, String sessionId, String userId,
    // String itemId, String eventType) {
    // try {
    // Event event =
    // Event.builder().sentAt(Instant.ofEpochMilli(System.currentTimeMillis() + 10 *
    // 60 * 1000))
    // .itemId(itemId).eventType(eventType).build();

    // PutEventsRequest putEventsRequest =
    // PutEventsRequest.builder().trackingId(trackingId).userId(userId)
    // .sessionId(sessionId).eventList(event).build();

    // int responseCode =
    // personalizeEventsClient.putEvents(putEventsRequest).sdkHttpResponse().statusCode();
    // System.out.println("Response code: " + responseCode);

    // } catch (PersonalizeEventsException e) {
    // System.out.println(e.awsErrorDetails().errorMessage());
    // }
    // }
}
