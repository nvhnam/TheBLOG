package com.example.TheBlog.service;

import com.example.TheBlog.model.Post;

import java.util.List;

public interface IPostService {
    Post addPost(Post post);
    List<Post> getAllPosts();
    Post updatePost(Post post, Long id);

    void deletePostById(Long id);

    Post getPostById(Long id);
}
