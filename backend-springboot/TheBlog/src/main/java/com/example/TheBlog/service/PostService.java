package com.example.TheBlog.service;

import com.example.TheBlog.exception.PostNotFoundException;
import com.example.TheBlog.model.Category;
import com.example.TheBlog.model.Post;
import com.example.TheBlog.model.PostResponseDTO;
import com.example.TheBlog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Optional;

@Service
public class PostService implements IPostService{
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public Post addPost(Post post) {
            return postRepository.save(post);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<PostResponseDTO> getAllPostsWithAuthorAndCategory() {
        List<Object[]> results = postRepository.findAllPostsWithAuthorAndCategory();
//        System.out.println("getAllPostsWithAuthorAndCategory results: ");
//        for (Object[] row : results) {
//            System.out.println(Arrays.toString(row));
//        }
        return results.stream().map(this::mapToPostResponseDTO).toList();
    }

    @Override
    public List<PostResponseDTO> getAllPostsWithAuthorAndCategoryByCategory(String category) {
        List<Object[]> results = postRepository.findAllPostsWithAuthorAndCategoryByCategory(category);
        return results.stream().map(this::mapToPostResponseDTO).toList();
    }

    @Override
    public PostResponseDTO getPostWithAuthorAndCategoryById(Integer id) {
        List<Object[]> results = postRepository.findPostWithAuthorAndCategoryById(id);
        Object[] row = results.get(0);
        return new PostResponseDTO(
                (Integer) row[0],
                (String) row[1],
                (String) row[2],
                (String) row[3],
                ((Timestamp) row[4]).toLocalDateTime(),
                (String) row[5],
                (String) row[6],
                new ArrayList<>(List.of(String.valueOf(row[7])))
        );
    };

    private PostResponseDTO mapToPostResponseDTO(Object[] row) {
        return new PostResponseDTO(
                (Integer) row[0],
                (String) row[1],
                (String) row[2],
                (String) row[3],
                ((Timestamp) row[4]).toLocalDateTime(),
                (String) row[5],
                (String) row[6],
                new ArrayList<>(List.of(String.valueOf(row[7])))
        );
    }

    @Override
    public Post updatePost(Post post, Integer id) {
        return null;
    }

    @Override
    public void deletePostById(Integer id) {

    }

    @Override
    public Post getPostById(Integer id) {
        return postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("Can't found post with id: " + id));
    }
}
