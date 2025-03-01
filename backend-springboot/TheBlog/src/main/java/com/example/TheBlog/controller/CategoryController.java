package com.example.TheBlog.controller;

import com.example.TheBlog.model.Category;
import com.example.TheBlog.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("${CLIENT_URL}")
@RequestMapping("/categories")
public class CategoryController {

    private final ICategoryService iCategoryService;

    @Autowired
    public CategoryController(ICategoryService iCategoryService) {
        this.iCategoryService = iCategoryService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategory() {
        List<Category> categories = iCategoryService.getAllCategory();
        return new ResponseEntity<>(categories, HttpStatus.FOUND);
    }
}
