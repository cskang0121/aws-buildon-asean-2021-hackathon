package com.javawarriors.buyerside.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import software.amazon.awssdk.services.personalizeruntime.PersonalizeRuntimeClient;
import software.amazon.awssdk.services.personalizeruntime.model.GetRecommendationsRequest;
import software.amazon.awssdk.services.personalizeruntime.model.GetRecommendationsResponse;
import software.amazon.awssdk.services.personalizeruntime.model.PredictedItem;
import software.amazon.awssdk.awscore.exception.AwsServiceException;

import java.util.List;
import java.util.ArrayList;

@Service
public class PersonalizeService {
    @Autowired
    private PersonalizeRuntimeClient personalizeRuntimeClient;

    @Value("${aws.personalize.campaign_arn}")
    private String campaignArn;

    public List<String> getRecs(Long itemId) {
        List<String> itemIdsList = new ArrayList<>();
        try {
            GetRecommendationsRequest recommendationsRequest = GetRecommendationsRequest.builder()
                    .campaignArn(campaignArn).numResults(20).itemId(String.valueOf(itemId)).build();

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
}
