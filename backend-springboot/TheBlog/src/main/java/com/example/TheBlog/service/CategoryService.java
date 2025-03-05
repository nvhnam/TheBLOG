package com.example.TheBlog.service;

import com.example.TheBlog.model.Category;
import com.example.TheBlog.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService{
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Cacheable("categoryCache")
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }
}
