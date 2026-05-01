package com.example.TheBlog.controller;

import com.example.TheBlog.exception.PostNotFoundException;
import com.example.TheBlog.model.Post;
import com.example.TheBlog.DTO.PostResponseDTO;
import com.example.TheBlog.service.ICloudinaryService;
import com.example.TheBlog.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@CrossOrigin("${CLIENT_URL}")
@RestController
@RequestMapping("/posts")
//@RequiredArgsConstructor
public class PostController {
    private final IPostService iPostService;
    private final ICloudinaryService iCloudinaryService;

    @Autowired
    public PostController(IPostService iPostService, ICloudinaryService iCloudinaryService) {
        this.iPostService = iPostService;
        this.iCloudinaryService = iCloudinaryService;
    }

//    @GetMapping("/all")
//    public ResponseEntity<List<Post>> getAllPosts() {
//        List<Post> posts = iPostS ervice.getAllPosts();
//        System.out.println("getAllPosts: " + posts);
//        return new ResponseEntity<>(posts, HttpStatus.FOUND);
//    }

    @GetMapping("/all")
    public ResponseEntity<List<PostResponseDTO>> getAllPostsWithAuthorAndCategory(){
        List<PostResponseDTO> postResponseDTOS = iPostService.getAllPostsWithAuthorAndCategory();
        return new ResponseEntity<>(postResponseDTOS, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    @ResponseBody
    public ResponseEntity<PostResponseDTO> getPostWithAuthorAndCategoryById(@PathVariable("id") Integer id) {
        PostResponseDTO post  = iPostService.getPostWithAuthorAndCategoryById(id);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("/userId/{id}")
    @ResponseBody
    public ResponseEntity<List<Post>> getPostsByAuthorId(@PathVariable("id") Integer id) {
        List<Post> post  = iPostService.getPostByAuthorId(id);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("/latest")
    public ResponseEntity<PostResponseDTO> getLatestPostWithAuthorAndCategory() {
        PostResponseDTO post = iPostService.getLatestPostWithAuthorAndCategory();
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<PostResponseDTO>> getAllPostsWithAuthorAndCategoryByCategory(@PathVariable("category") String category) {
        List<PostResponseDTO> results = iPostService.getAllPostsWithAuthorAndCategoryByCategory(category);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Post> uploadPost(@ModelAttribute @jakarta.validation.Valid com.example.TheBlog.DTO.PostUploadRequestDTO requestDTO) throws IOException {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime parsedCreatedAt = LocalDateTime.parse(requestDTO.getCreated_at(), formatter);

        Post post = iPostService.createPost(requestDTO.getTitle(), requestDTO.getUserId(), requestDTO.getBody(), parsedCreatedAt, requestDTO.getImg(), requestDTO.getCategoriesId());
        return new ResponseEntity<>(post, HttpStatus.CREATED);
    }
}
