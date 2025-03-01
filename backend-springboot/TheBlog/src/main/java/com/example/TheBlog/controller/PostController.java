package com.example.TheBlog.controller;

import com.example.TheBlog.exception.PostNotFoundException;
import com.example.TheBlog.model.Post;
import com.example.TheBlog.model.PostResponseDTO;
import com.example.TheBlog.service.IPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("${CLIENT_URL}")
@RestController
@RequestMapping("/posts")
//@RequiredArgsConstructor
public class PostController {
    private final IPostService iPostService;

    @Autowired
    public PostController(IPostService iPostService) {
        this.iPostService = iPostService;
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

    @GetMapping("/category/{category}")
    public ResponseEntity<List<PostResponseDTO>> getAllPostsWithAuthorAndCategoryByCategory(@PathVariable("category") String category) {
        List<PostResponseDTO> results = iPostService.getAllPostsWithAuthorAndCategoryByCategory(category);
        return new ResponseEntity<>(results, HttpStatus.FOUND);
    }
}
