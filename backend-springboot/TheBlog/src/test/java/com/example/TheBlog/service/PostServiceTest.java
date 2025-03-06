package com.example.TheBlog.service;

import com.example.TheBlog.DTO.PostResponseDTO;
import com.example.TheBlog.repository.PostRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    @Mock
    PostRepository postRepository;

    @InjectMocks
    PostService postService;

    private PostResponseDTO expectedPost;
    private List<Object[]> mockDatabaseResult;

    @BeforeEach
    void setUp() {
        expectedPost = new PostResponseDTO(
                1,
                "This is tech blog",
                "This is tech blog body",
                "url",
                LocalDateTime.parse("2025-03-03T12:00:00"),
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
    void getAllPostsWithAuthorAndCategory() {
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
    void createPost() {
    }
}