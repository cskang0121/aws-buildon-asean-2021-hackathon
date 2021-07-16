package com.javawarriors.buyerside.configurations;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.amazonaws.regions.Regions;

@Configuration
public class AmazonConfig {
    
    @Bean
    public AmazonS3 s3() {

        Regions region = Regions.US_EAST_1;

        AWSCredentials awsCredentials = new BasicAWSCredentials(
            "ASIATS4ZLRAJU5CFK27E",
            "ItYftKgrXVIoJ/uNC06Jw6f/TGLQSt+d5UTgWUOW"
        );

        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
