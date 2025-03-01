package com.example.TheBlog.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


//@NoArgsConstructor
public class PostResponseDTO {
    private Integer id;
    private String title;
    private String body;
    private String image;
    private LocalDateTime createdAt;
    private String authorName;
    private String authorImg;
    private List<String> categoryName = new ArrayList<>();

    public PostResponseDTO(Integer id, String title, String body, String image, LocalDateTime createdAt, String authorName, String authorImg, List<String> categoryName) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.image = image;
        this.createdAt = createdAt;
        this.authorName = authorName;
        this.authorImg = authorImg;
        this.categoryName = categoryName;
    }
    public PostResponseDTO(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getAuthorImg() {
        return authorImg;
    }

    public void setAuthorImg(String authorImg) {
        this.authorImg = authorImg;
    }

    public List<String> getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(List<String> categoryName) {
        this.categoryName = categoryName;
    }
}
