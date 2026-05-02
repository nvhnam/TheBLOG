package com.example.TheBlog.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.TheBlog.utils.AppConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
@ConditionalOnProperty(name = "use.local.config", havingValue = "false")
public class CloudinaryService implements IFileStorageService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${CLOUD_NAME}") String cloudName,
            @Value("${API_KEY}") String apiKey,
            @Value("${API_SECRET}") String apiSecret
    ) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                AppConstants.Cloudinary.CLOUD_NAME, cloudName,
                AppConstants.Cloudinary.API_KEY, apiKey,
                AppConstants.Cloudinary.API_SECRET, apiSecret
        ));
    }

    @Override
    public String upload(MultipartFile file) throws IOException {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        String url = uploadResult.get(AppConstants.Cloudinary.SECURE_URL).toString();
        log.info("Cloudinary upload complete: {}", url);
        return url;
    }
}
