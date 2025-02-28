package com.example.TheBlog.controller;

import com.example.TheBlog.model.Post;
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

    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = iPostService.getAllPosts();
        System.out.println("getAllPosts: " + posts);
        return new ResponseEntity<>(posts, HttpStatus.FOUND);
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return iPostService.getPostById(id);
    }
}
