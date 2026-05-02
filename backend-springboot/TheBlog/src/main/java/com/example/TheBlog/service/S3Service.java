package com.example.TheBlog.service;

import com.example.TheBlog.utils.AppConstants;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.BucketAlreadyExistsException;
import software.amazon.awssdk.services.s3.model.BucketAlreadyOwnedByYouException;
import software.amazon.awssdk.services.s3.model.HeadBucketRequest;
import software.amazon.awssdk.services.s3.model.NoSuchBucketException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import java.io.IOException;
import java.util.UUID;


@Slf4j
@Service
@Primary
@ConditionalOnProperty(name = "use.local.config", havingValue = "true", matchIfMissing = true)
public class S3Service implements IFileStorageService {

    private final S3Client s3Client;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.s3.public-url}")
    private String publicUrl;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @PostConstruct
    void ensureBucketExists() {
        try {
            try {
                s3Client.headBucket(HeadBucketRequest.builder().bucket(bucketName).build());
                log.info("S3 bucket '{}' already exists", bucketName);
            } catch (NoSuchBucketException e) {
                try {
                    s3Client.createBucket(b -> b.bucket(bucketName));
                    log.info("Created S3 bucket '{}'", bucketName);
                } catch (BucketAlreadyOwnedByYouException | BucketAlreadyExistsException already) {
                    log.info("S3 bucket '{}' already owned/exists", bucketName);
                }
            }
        } catch (Exception e) {
            throw new IllegalStateException(AppConstants.Errors.S3_CONNECTION_ERROR, e);
        }
    }

    @Override
    public String upload(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        log.info("Uploading {} to bucket {}", fileName, bucketName);

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
        } catch (Exception e) {
            log.error("Failed to upload {} to S3", fileName, e);
            throw new IOException(AppConstants.Errors.S3_UPLOAD_FAILED + e.getMessage(), e);
        }

        String url = String.format(AppConstants.Storage.S3_URL_FORMAT, publicUrl, bucketName, fileName);
        log.info("Upload complete: {}", url);
        return url;
    }
}
