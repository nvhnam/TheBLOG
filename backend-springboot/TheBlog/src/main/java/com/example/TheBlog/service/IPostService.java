package com.example.TheBlog.service;

import com.example.TheBlog.model.Post;
import com.example.TheBlog.model.PostResponseDTO;

import java.util.List;

public interface IPostService {
    Post addPost(Post post);
    List<Post> getAllPosts();

    List<PostResponseDTO> getAllPostsWithAuthorAndCategory();
    Post updatePost(Post post, Integer id);

    void deletePostById(Integer id);

    Post getPostById(Integer id);
}
