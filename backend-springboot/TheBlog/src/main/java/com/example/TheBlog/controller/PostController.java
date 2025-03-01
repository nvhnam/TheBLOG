package com.example.TheBlog.controller;

import com.example.TheBlog.model.Post;
import com.example.TheBlog.model.PostResponseDTO;
import com.example.TheBlog.service.IPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
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

    @GetMapping("/{id}")
    @ResponseBody
    public Post getPostById(@PathVariable("id") Integer id) {
        return iPostService.getPostById(id);
    }
}
