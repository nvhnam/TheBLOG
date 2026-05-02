package com.example.TheBlog.controller;

import com.example.TheBlog.DTO.PostResponseDTO;
import com.example.TheBlog.exception.PostNotFoundException;
import com.example.TheBlog.model.Post;
import com.example.TheBlog.service.IPostService;
import com.example.TheBlog.utils.AppConstants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/posts")
public class PostController {

    private final IPostService iPostService;

    public PostController(IPostService iPostService) {
        this.iPostService = iPostService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostResponseDTO>> getAllPostsWithAuthorAndCategory() {
        return ResponseEntity.ok(iPostService.getAllPostsWithAuthorAndCategory());
    }

    @GetMapping("/all/paginated")
    public ResponseEntity<Page<PostResponseDTO>> getAllPosts(
            @RequestParam(defaultValue = AppConstants.Pagination.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(defaultValue = AppConstants.Pagination.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(defaultValue = AppConstants.Pagination.DEFAULT_SORT_BY) String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return ResponseEntity.ok(iPostService.getAllPostsPaginated(pageable));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<PostResponseDTO> getPostWithAuthorAndCategoryById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(iPostService.getPostWithAuthorAndCategoryById(id));
        } catch (PostNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/userId/{id}")
    public ResponseEntity<List<Post>> getPostsByAuthorId(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(iPostService.getPostByAuthorId(id));
        } catch (PostNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/latest")
    public ResponseEntity<PostResponseDTO> getLatestPostWithAuthorAndCategory() {
        try {
            return ResponseEntity.ok(iPostService.getLatestPostWithAuthorAndCategory());
        } catch (PostNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<PostResponseDTO>> getAllPostsWithAuthorAndCategoryByCategory(
            @PathVariable String category) {
        return ResponseEntity.ok(iPostService.getAllPostsWithAuthorAndCategoryByCategory(category));
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Post> uploadPost(@RequestParam("title") String title,
                                           @RequestParam("userId") Integer userId,
                                           @RequestParam("body") String body,
                                           @RequestParam("created_at") String createdAt,
                                           @RequestParam("img") MultipartFile image,
                                           @RequestParam("categoriesId") List<Integer> categoriesId) throws IOException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(AppConstants.DateFormat.POST_CREATED_AT);
        LocalDateTime parsedCreatedAt = LocalDateTime.parse(createdAt, formatter);
        Post post = iPostService.createPost(title, userId, body, parsedCreatedAt, image, categoriesId);
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }
}
