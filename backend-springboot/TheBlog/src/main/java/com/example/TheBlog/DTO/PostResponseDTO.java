package com.example.TheBlog.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDTO {
    private Integer id;
    private String title;
    private String body;
    private String image;
    private LocalDateTime createdAt;
    private String authorName;
    private String authorImg;
    private List<String> categoryNames = new ArrayList<>();
}
