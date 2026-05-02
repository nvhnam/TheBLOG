package com.example.TheBlog.service;

import com.example.TheBlog.DTO.PostResponseDTO;
import com.example.TheBlog.DTO.RestPageImpl;
import com.example.TheBlog.exception.PostNotFoundException;
import com.example.TheBlog.model.Category;
import com.example.TheBlog.model.Post;
import com.example.TheBlog.model.User;
import com.example.TheBlog.repository.CategoryRepository;
import com.example.TheBlog.repository.PostRepository;
import com.example.TheBlog.repository.UserRepository;
import com.example.TheBlog.utils.AppConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
public class PostService implements IPostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final IFileStorageService iFileStorageService;

    public PostService(PostRepository postRepository,
                       UserRepository userRepository,
                       CategoryRepository categoryRepository,
                       IFileStorageService iFileStorageService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.iFileStorageService = iFileStorageService;
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
    @Cacheable(value = AppConstants.Cache.POSTS_PAGINATED, key = "#pageable.pageNumber")
    public Page<PostResponseDTO> getAllPostsPaginated(Pageable pageable) {
        Page<Post> posts = postRepository.findAll(pageable);
        List<PostResponseDTO> dtos = posts.getContent().stream().map(post -> {
            PostResponseDTO dto = new PostResponseDTO();
            dto.setId(post.getId());
            dto.setTitle(post.getTitle());
            dto.setBody(post.getBody());
            dto.setImage(post.getImage());
            dto.setCreatedAt(post.getCreatedAt());
            dto.setAuthorName(post.getUser().getUsername());
            dto.setAuthorImg(post.getUser().getImg());
            dto.setCategoryNames(post.getCategories().stream()
                    .map(Category::getName)
                    .toList());
            return dto;
        }).toList();
        return new RestPageImpl<>(dtos, pageable, posts.getTotalElements());
    }

    @Override
    @Cacheable(value = AppConstants.Cache.POSTS, key = AppConstants.Cache.KEY_ALL_POSTS)
    public List<PostResponseDTO> getAllPostsWithAuthorAndCategory() {
        return postRepository.findAllPostsWithAuthorAndCategory().stream()
                .map(this::mapToPostResponseDTO).toList();
    }

    @Override
    @Cacheable(value = AppConstants.Cache.POSTS, key = "#category")
    public List<PostResponseDTO> getAllPostsWithAuthorAndCategoryByCategory(String category) {
        return postRepository.findAllPostsWithAuthorAndCategoryByCategory(category).stream()
                .map(this::mapToPostResponseDTO).toList();
    }

    @Override
    public PostResponseDTO getPostWithAuthorAndCategoryById(Integer id) {
        List<Object[]> results = postRepository.findPostWithAuthorAndCategoryById(id);
        if (results.isEmpty()) {
            throw new PostNotFoundException(AppConstants.Errors.POST_NOT_FOUND + ": " + id);
        }
        return mapToPostResponseDTO(results.get(0));
    }

    @Override
    public PostResponseDTO getLatestPostWithAuthorAndCategory() {
        List<Object[]> results = postRepository.findLatestPostWithAuthorAndCategory();
        if (results.isEmpty()) {
            throw new PostNotFoundException(AppConstants.Errors.POST_NOT_FOUND);
        }
        return mapToPostResponseDTO(results.get(0));
    }

    @Override
    public List<Post> getPostByAuthorId(Integer id) {
        return postRepository.findByUserId(id);
    }

    @Override
    public Post updatePost(Post post, Integer id) {
        return null;
    }

    @Override
    public void deletePostById(Integer id) {

    }

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

    private PostResponseDTO mapToPostResponseDTO(Object[] row) {
        LocalDateTime createdAt = row[4] != null ? ((Timestamp) row[4]).toLocalDateTime() : null;
        List<String> categories = row[7] != null ? List.of((String) row[7]) : List.of();
        return new PostResponseDTO(
                ((Number) row[0]).intValue(),
                (String) row[1],
                (String) row[2],
                (String) row[3],
                createdAt,
                (String) row[5],
                (String) row[6],
                categories
        );
    }

    @Override
    public Post getPostById(Integer id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(AppConstants.Errors.POST_NOT_FOUND + ": " + id));
    }

    @Override
    @Transactional
    @Caching(evict = {
            @CacheEvict(value = AppConstants.Cache.POSTS_PAGINATED, allEntries = true),
            @CacheEvict(value = AppConstants.Cache.POSTS, allEntries = true)
    })
    public Post createPost(String title, Integer userId, String body, LocalDateTime createdAt,
                           MultipartFile image, List<Integer> categoriesId) throws IOException {
        log.info("Creating post '{}' for userId={}", title, userId);

        String imgUrl = iFileStorageService.upload(image);
        log.info("Image uploaded to {}", imgUrl);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException(AppConstants.Errors.USER_NOT_FOUND + ": " + userId));

        List<Category> categories = categoryRepository.findAllById(categoriesId);
        log.debug("Resolved {} categories from IDs {}", categories.size(), categoriesId);

        Post post = new Post();
        post.setTitle(title);
        post.setUser(user);
        post.setCategories(categories);
        post.setBody(body);
        post.setCreatedAt(createdAt);
        post.setImage(imgUrl);

        Post savedPost = postRepository.save(post);
        log.info("Post saved with id={}", savedPost.getId());
        return savedPost;
    }
}
