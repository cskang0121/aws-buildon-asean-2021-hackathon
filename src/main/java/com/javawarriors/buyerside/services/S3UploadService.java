package com.javawarriors.buyerside.services;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.exception.SdkServiceException;
import org.springframework.beans.factory.annotation.Value;

import org.slf4j.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.apache.http.entity.ContentType.*;

@Service
public class S3UploadService {

    private static final Logger logger = LoggerFactory.getLogger(S3UploadService.class);

    @Autowired
    private S3Client s3;

    @Value("${aws.s3.bucket}")
    private String bucket;

    public String upload(Long id, String listingType, MultipartFile file) {
        // 1. Check if image is not empty
        isFileEmpty(file);

        // 2. Check if file is an image
        isImage(file);
        // int mB = 1024 * 1024;

        Map<String, String> metadata = extractMetadata(file);

        // 3. Make object key
        String key = String.format("%s/%s/%s-%s", listingType, id, UUID.randomUUID(), file.getOriginalFilename());

        // 4. Putting in S3 bucket
        try {
            PutObjectRequest objectRequest = PutObjectRequest.builder().bucket(bucket).key(key).metadata(metadata)
                    .build();

            s3.putObject(objectRequest, RequestBody.fromBytes(file.getBytes()));
        } catch (SdkServiceException ase) {
            logger.error("Caught an AmazonServiceException, which " + "means your request made it "
                    + "to Amazon S3, but was rejected with an error response" + " for some reason.", ase);
            logger.info("Error Message:    " + ase.getMessage());
            logger.info("Key:       " + key);
            throw ase;
        } catch (SdkClientException ace) {
            logger.error("Caught an AmazonClientException, which " + "means the client encountered "
                    + "an internal error while trying to " + "communicate with S3, "
                    + "such as not being able to access the network.", ace);
            logger.error("Error Message: {}, {}", key, ace.getMessage());
            throw ace;
        } catch (IOException e) {
            logger.error("Something", e);
        }

        // Return the filename
        // return String.format("%s/%s", bucket, key);

        // Return the key
        return key;
    }

    private void isImage(MultipartFile file) {
        if (!Arrays.asList(IMAGE_JPEG.getMimeType(), IMAGE_PNG.getMimeType(), IMAGE_GIF.getMimeType())
                .contains(file.getContentType())) {
            throw new IllegalStateException("File must be an image [" + file.getContentType() + "]");
        }
    }

    private void isFileEmpty(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file [" + file.getSize() + "]");
        }
    }

    private Map<String, String> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    public byte[] download(String picUri) {
        byte[] byteArr = new byte[0];
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucket)
                .key(picUri)
                .build();

            ResponseBytes<GetObjectResponse> s3Object = s3.getObject(getObjectRequest, ResponseTransformer.toBytes());
            byteArr = s3Object.asByteArray();
        } catch(Exception e) {
            throw new IllegalStateException("Download failed", e);
        }

        return byteArr;
    }

}