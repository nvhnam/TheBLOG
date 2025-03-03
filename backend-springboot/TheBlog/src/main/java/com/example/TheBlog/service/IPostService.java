package com.example.TheBlog.service;

import com.example.TheBlog.model.Post;
import com.example.TheBlog.DTO.PostResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public interface IPostService {
    Post addPost(Post post);
    List<Post> getAllPosts();

    List<PostResponseDTO> getAllPostsWithAuthorAndCategory();

    List<PostResponseDTO> getAllPostsWithAuthorAndCategoryByCategory(String category);

    PostResponseDTO getPostWithAuthorAndCategoryById(Integer id);

    PostResponseDTO getLatestPostWithAuthorAndCategory();
    Post updatePost(Post post, Integer id);

    void deletePostById(Integer id);

    Post getPostById(Integer id);

    Post createPost(String title, Integer userId, String body, LocalDateTime createdAt, MultipartFile image, List<Integer> categoriesId) throws IOException;
}
