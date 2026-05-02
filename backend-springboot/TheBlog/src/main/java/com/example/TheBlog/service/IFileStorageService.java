package com.example.TheBlog.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;


public interface IFileStorageService {
    String upload(MultipartFile file) throws IOException;
}
