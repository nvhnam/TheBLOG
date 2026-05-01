package com.example.TheBlog.service;

import com.example.TheBlog.exception.PostNotFoundException;
import com.example.TheBlog.model.Category;
import com.example.TheBlog.model.Post;
import com.example.TheBlog.DTO.PostResponseDTO;
import com.example.TheBlog.model.User;
import com.example.TheBlog.repository.CategoryRepository;
import com.example.TheBlog.repository.PostRepository;
import com.example.TheBlog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService implements IPostService{
    private final PostRepository postRepository;

    private final UserRepository userRepository;

    private final CategoryRepository categoryRepository;
    private final ICloudinaryService iCloudinaryService;

    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository, CategoryRepository categoryRepository, ICloudinaryService iCloudinaryService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.iCloudinaryService = iCloudinaryService;
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
    @Cacheable("postCache")
    public List<PostResponseDTO> getAllPostsWithAuthorAndCategory() {
        List<Post> results = postRepository.findAllPostsWithAuthorAndCategory();
        return results.stream().map(this::mapToPostResponseDTO).toList();
    }

    @Override
    @Cacheable("postCache")
    public List<PostResponseDTO> getAllPostsWithAuthorAndCategoryByCategory(String category) {
        List<Post> results = postRepository.findAllPostsWithAuthorAndCategoryByCategory(category);
        return results.stream().map(this::mapToPostResponseDTO).toList();
    }

    @Override
    public PostResponseDTO getPostWithAuthorAndCategoryById(Integer id) {
        List<Post> results = postRepository.findPostWithAuthorAndCategoryById(id);
        if (results.isEmpty()) {
            throw new PostNotFoundException("Can't found post with id: " + id);
        }
        return mapToPostResponseDTO(results.get(0));
    }

    @Override
    public PostResponseDTO getLatestPostWithAuthorAndCategory() {
        Post post = postRepository.findTopByOrderByCreatedAtDesc();
        if (post == null) {
            throw new PostNotFoundException("No post found");
        }
        return mapToPostResponseDTO(post);
    }

    @Override
    public List<Post> getPostByAuthorId(Integer id) {
        return postRepository.findByUserId(id);
    };

    private PostResponseDTO mapToPostResponseDTO(Post post) {
        return new PostResponseDTO(
                post.getId(),
                post.getTitle(),
                post.getBody(),
                post.getImage(),
                post.getCreatedAt(),
                post.getUser().getUsername(),
                post.getUser().getImg(),
                post.getCategories().stream().map(Category::getName).toList()
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

    @Override
    @CachePut(value = "postCache")
    public Post createPost(String title, Integer userId, String body, LocalDateTime createdAt, MultipartFile image, List<Integer> categoriesId) throws IOException {
        String imgUrl = iCloudinaryService.upload(image);

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Can't not find user ID: " + userId));

        List<Category> categories = categoryRepository.findAllById(categoriesId);

        Post post = new Post();
        post.setTitle(title);
        post.setUser(user);
        post.setCategories(categories);
        post.setBody(body);
        post.setCreatedAt(createdAt);
        post.setImage(imgUrl);
        return postRepository.save(post);
    }
}
