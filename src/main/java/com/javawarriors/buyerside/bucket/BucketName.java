package com.javawarriors.buyerside.bucket;

public enum BucketName {
    
    LISTING_IMAGE("build-on-asean-javawarriors-image-upload");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }

}
