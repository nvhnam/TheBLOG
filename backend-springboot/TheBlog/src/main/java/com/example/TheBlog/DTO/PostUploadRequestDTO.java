package com.example.TheBlog.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PostUploadRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Body is required")
    private String body;

    @NotBlank(message = "Created at timestamp is required")
    private String created_at;

    @NotNull(message = "Image is required")
    private MultipartFile img;

    @NotEmpty(message = "At least one category is required")
    private List<Integer> categoriesId;
}
