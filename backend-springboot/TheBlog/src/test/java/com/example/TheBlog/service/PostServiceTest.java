package com.example.TheBlog.service;

import com.example.TheBlog.DTO.PostResponseDTO;
import com.example.TheBlog.model.Category;
import com.example.TheBlog.model.Post;
import com.example.TheBlog.model.User;
import com.example.TheBlog.repository.CategoryRepository;
import com.example.TheBlog.repository.PostRepository;
import com.example.TheBlog.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @Mock
    PostRepository postRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    CategoryRepository categoryRepository;

    @Mock
    ICloudinaryService iCloudinaryService;

    @InjectMocks
    PostService postService;

    private User mockUser;
    private List<Category> mockCategory;
    private Post mockPost;
    private MultipartFile mockImage;
    private Post mockPostResult;

    @BeforeEach
    void setUpCreatingPost() {
        mockUser = new User("John@mail.com", "John", "john123", null);
        mockUser.setId(1);

        mockPost = new Post();

        Category techCategory = new Category(1, "Technology", new ArrayList<>());
        mockCategory = List.of(techCategory);

        mockPost.setTitle("John creating post");
        mockPost.setUser(mockUser);
        mockPost.setCategories(mockCategory);
        mockPost.setBody("Creating post body");
        mockPost.setCreatedAt(LocalDateTime.now());
        mockPost.setImage("url");

        mockImage = Mockito.mock(MultipartFile.class);

        mockPostResult = new Post();
        mockPostResult.setId(1);
        mockPostResult.setTitle("This is tech blog");
        mockPostResult.setBody("This is tech blog body");
        mockPostResult.setImage("url");
        mockPostResult.setCreatedAt(LocalDateTime.now());
        mockPostResult.setUser(mockUser);
        mockPostResult.setCategories(mockCategory);
    }

    @Test
    void getAllPostsWithAuthorAndCategory_successfully() {
        Mockito.when(postRepository.findTopByOrderByCreatedAtDesc()).thenReturn(mockPostResult);

        PostResponseDTO latestPost = postService.getLatestPostWithAuthorAndCategory();

        assertNotNull(latestPost);
        assertEquals(1, latestPost.getId());
        assertEquals("This is tech blog", latestPost.getTitle());
        assertEquals("This is tech blog body", latestPost.getBody());
        assertNotNull(latestPost.getCreatedAt());
        assertEquals("John", latestPost.getAuthorName());
        assertEquals(List.of("Technology"), latestPost.getCategoryName());
    }

    @Test
    void getAllPostsWithAuthorAndCategoryByCategory() {
        Mockito.when(postRepository.findAllPostsWithAuthorAndCategoryByCategory("Technology")).thenReturn(Collections.singletonList(mockPostResult));

        List<PostResponseDTO> results = postService.getAllPostsWithAuthorAndCategoryByCategory("Technology");

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals(1, results.get(0).getId());
    }

    @Test
    void getPostWithAuthorAndCategoryById_successfully() {
        Mockito.when(postRepository.findPostWithAuthorAndCategoryById(1)).thenReturn(Collections.singletonList(mockPostResult));

        PostResponseDTO actualPost = postService.getPostWithAuthorAndCategoryById(1);

        assertNotNull(actualPost);
        assertEquals(1, actualPost.getId());
    }

    @Test
    void getLatestPostWithAuthorAndCategory() {
        Mockito.when(postRepository.findTopByOrderByCreatedAtDesc()).thenReturn(mockPostResult);

        PostResponseDTO actualPost = postService.getLatestPostWithAuthorAndCategory();

        assertNotNull(actualPost);
        assertEquals(1, actualPost.getId());
    }

    @Test
    void createPost_successfully() throws IOException {
        Mockito.when(iCloudinaryService.upload(mockImage)).thenReturn("url");
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.of(mockUser));
        Mockito.when(categoryRepository.findAllById(List.of(1))).thenReturn(mockCategory);
        Mockito.when(postRepository.save(Mockito.any(Post.class))).thenReturn(mockPost);

        Post createdPost = postService.createPost("John creating post", 1, "Creating post body",
                mockPost.getCreatedAt(), mockImage, List.of(1));

        assertNotNull(createdPost);
        assertEquals("John creating post", createdPost.getTitle());
        assertEquals("url", createdPost.getImage());
        assertEquals(mockPost.getCreatedAt(), createdPost.getCreatedAt());
        assertEquals(mockUser, createdPost.getUser());
        assertEquals(mockCategory, createdPost.getCategories());
    }
}
