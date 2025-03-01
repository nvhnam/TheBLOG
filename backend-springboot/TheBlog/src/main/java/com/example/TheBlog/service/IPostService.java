package com.example.TheBlog.service;

import com.example.TheBlog.model.Post;
import com.example.TheBlog.model.PostResponseDTO;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface IPostService {
    Post addPost(Post post);
    List<Post> getAllPosts();

    List<PostResponseDTO> getAllPostsWithAuthorAndCategory();

    PostResponseDTO getPostWithAuthorAndCategoryById(Integer id);
    Post updatePost(Post post, Integer id);

    void deletePostById(Integer id);

    Post getPostById(Integer id);
}
