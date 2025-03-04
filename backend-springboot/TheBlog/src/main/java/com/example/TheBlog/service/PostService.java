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
        List<Object[]> results = postRepository.findAllPostsWithAuthorAndCategory();
//        System.out.println("getAllPostsWithAuthorAndCategory results: ");
//        for (Object[] row : results) {
//            System.out.println(Arrays.toString(row));
//        }
        return results.stream().map(this::mapToPostResponseDTO).toList();
    }

    @Override
    @Cacheable("postCache")
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
    }

    @Override
    public PostResponseDTO getLatestPostWithAuthorAndCategory() {
        List<Object[]> results = postRepository.findLatestPostWithAuthorAndCategory();
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
    }

    ;

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

    @Override
    @CachePut(value = "postCache")
    public Post createPost(String title, Integer userId, String body, LocalDateTime createdAt, MultipartFile image, List<Integer> categoriesId) throws IOException {
        String imgUrl = iCloudinaryService.upload(image);
        System.out.println("Returned imgURL: " + imgUrl);

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
