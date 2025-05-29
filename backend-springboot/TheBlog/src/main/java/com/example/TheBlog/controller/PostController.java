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
//        System.out.print("getAllPostsWithAuthorAndCategory: " + postResponseDTOS);
        return new ResponseEntity<>(postResponseDTOS, HttpStatus.FOUND);
    }

    @GetMapping("/id/{id}")
    @ResponseBody
    public ResponseEntity<PostResponseDTO> getPostWithAuthorAndCategoryById(@PathVariable("id") Integer id) {
//        return iPostService.getPostById(id);
        try {
            PostResponseDTO post  = iPostService.getPostWithAuthorAndCategoryById(id);
            return new ResponseEntity<>(post, HttpStatus.FOUND);
        } catch (PostNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/userId/{id}")
    @ResponseBody
    public ResponseEntity<List<Post>> getPostsByAuthorId(@PathVariable("id") Integer id) {
        try {
            List<Post> post  = iPostService.getPostByAuthorId(id);
            return new ResponseEntity<>(post, HttpStatus.FOUND);
        } catch (PostNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/latest")
    public ResponseEntity<PostResponseDTO> getLatestPostWithAuthorAndCategory() {
        try {
            PostResponseDTO post = iPostService.getLatestPostWithAuthorAndCategory();
            return new ResponseEntity<>(post, HttpStatus.FOUND);
        } catch (PostNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<PostResponseDTO>> getAllPostsWithAuthorAndCategoryByCategory(@PathVariable("category") String category) {
        List<PostResponseDTO> results = iPostService.getAllPostsWithAuthorAndCategoryByCategory(category);
        return new ResponseEntity<>(results, HttpStatus.FOUND);
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Post> uploadPost(@RequestParam("title") String title,
                                           @RequestParam("userId") Integer userId,
                                           @RequestParam("body") String body,
                                           @RequestParam("created_at")String createdAt,
                                           @RequestParam("img") MultipartFile image,
                                           @RequestParam("categoriesId") List<Integer> categoriesId) throws IOException {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime parsedCreatedAt = LocalDateTime.parse(createdAt, formatter);

        Post post = iPostService.createPost(title, userId, body, parsedCreatedAt, image, categoriesId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
