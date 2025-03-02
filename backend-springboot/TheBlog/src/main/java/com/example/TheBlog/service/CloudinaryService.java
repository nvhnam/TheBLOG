package com.example.TheBlog.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;


@Service
public class CloudinaryService implements ICloudinaryService {
//    private final Cloudinary cloudinary = new Cloudinary("${CLOUDINARY_URL}");
    private final Cloudinary cloudinary;

    @Autowired
    public CloudinaryService(
            @Value("${CLOUD_NAME}") String cloudName,
             @Value("${API_KEY}") String apiKey,
             @Value("${API_SECRET}") String apiSecret
    ) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public String upload(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("secure_url").toString();
    }

}
