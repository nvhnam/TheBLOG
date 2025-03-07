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
import java.sql.Timestamp;
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

    private PostResponseDTO expectedPost;
    private List<Object[]> mockDatabaseResult;

    private User mockUser;
    private List<Category> mockCategory;

    private Post mockPost;

    private MultipartFile mockImage;
    @BeforeEach
    void setUpCreatingPost() {
        mockUser = new User("John@mail.com", "John", "john123", null);
        mockUser.setId(1);

        mockPost = new Post();

        mockCategory = List.of(new Category(1, "Technology", List.of(mockPost)));

        mockPost.setTitle("John creating post");
        mockPost.setUser(mockUser);
        mockPost.setCategories(mockCategory);
        mockPost.setBody("Creating post body");
        mockPost.setCreatedAt( LocalDateTime.now());
        mockPost.setImage("url");

        mockImage = Mockito.mock(MultipartFile.class);

    }

    @BeforeEach
    void setUpPostResponseDTO() {
        expectedPost = new PostResponseDTO(
                1,
                "This is tech blog",
                "This is tech blog body",
                "url",
                LocalDateTime.now(),
                "John",
                null,
                new ArrayList<>(List.of("Technology"))
        );

        Object[] mockRow = {
                expectedPost.getId(),
                expectedPost.getTitle(),
                expectedPost.getBody(),
                expectedPost.getImage(),
                Timestamp.valueOf(expectedPost.getCreatedAt()),
                expectedPost.getAuthorName(),
                expectedPost.getAuthorImg(),
                expectedPost.getCategoryName().get(0)
        };

        mockDatabaseResult = new ArrayList<>();
        mockDatabaseResult.add(mockRow);

    }


    @Test
    void getAllPostsWithAuthorAndCategory_successfully() {
        Object[] firstPost = mockDatabaseResult.get(0);
        Mockito.when(postRepository.findLatestPostWithAuthorAndCategory()).thenReturn(Collections.singletonList(firstPost));

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
    }

    @Test
    void getPostWithAuthorAndCategoryById_successfully() {
        Mockito.when(postRepository.findPostWithAuthorAndCategoryById(1)).thenReturn(mockDatabaseResult);

        PostResponseDTO actualPost = postService.getPostWithAuthorAndCategoryById(1);

        assertNotNull(actualPost);
        assertEquals(expectedPost.getId(), actualPost.getId());
    }

    @Test
    void getLatestPostWithAuthorAndCategory() {
    }

    @Test
    void createPost_successfully() throws IOException {
        Mockito.when(iCloudinaryService.upload(mockImage)).thenReturn("url");
        Mockito.when(userRepository.findById(1)).thenReturn(Optional.of(mockUser));
        Mockito.when(categoryRepository.findAllById(List.of(1))).thenReturn(mockCategory);
        Mockito.when(postRepository.save(Mockito.any(Post.class))).thenReturn(mockPost);

        Post createdPost = postService.createPost("John creating post", 1, "Creating post body",
                LocalDateTime.now(), mockImage, List.of(1));

        assertNotNull(createdPost);
        assertEquals("John creating post", createdPost.getTitle());
        assertEquals("url", createdPost.getImage());
        assertEquals(mockPost.getCreatedAt(), createdPost.getCreatedAt());
        assertEquals(mockUser, createdPost.getUser());
        assertEquals(mockCategory, createdPost.getCategories());
    }
}