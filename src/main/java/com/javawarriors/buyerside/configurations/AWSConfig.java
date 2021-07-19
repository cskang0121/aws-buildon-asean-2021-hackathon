package com.javawarriors.buyerside.configurations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.personalizeruntime.PersonalizeRuntimeClient;

@Configuration
public class AWSConfig {
    @Value("${aws.s3.region}")
    private String region;

    @Value("${aws_access_key_id}")
    private String accessKey;

    @Value("${aws_secret_access_key}")
    private String secretKey;

    @Value("${aws_session_token}")
    private String sessionToken;

    @Bean(destroyMethod = "close")
    public S3Client s3Client() {
        return S3Client.builder().region(Region.of(region))
                // .credentialsProvider(DefaultCredentialsProvider.create())
                .credentialsProvider(StaticCredentialsProvider
                        .create(AwsSessionCredentials.create(accessKey, secretKey, sessionToken)))
                .build();
    }

    @Bean(destroyMethod = "close")
    public PersonalizeRuntimeClient personalizeClient() {
        return PersonalizeRuntimeClient.builder().region(Region.of(region)).credentialsProvider(
                StaticCredentialsProvider.create(AwsSessionCredentials.create(accessKey, secretKey, sessionToken)))
                .build();
    }
}