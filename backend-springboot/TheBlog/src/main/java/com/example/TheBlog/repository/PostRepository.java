package com.example.TheBlog.repository;

import com.example.TheBlog.model.Post;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    @EntityGraph(attributePaths = {"user", "categories"})
    @Query("SELECT p FROM Post p ORDER BY p.createdAt DESC")
    List<Post> findAllPostsWithAuthorAndCategory();

    @EntityGraph(attributePaths = {"user", "categories"})
    List<Post> findByUserId(Integer id);

    @EntityGraph(attributePaths = {"user", "categories"})
    @Query("SELECT p FROM Post p WHERE p.id = :id")
    List<Post> findPostWithAuthorAndCategoryById(@Param("id") Integer id);

    @EntityGraph(attributePaths = {"user", "categories"})
    @Query("SELECT p FROM Post p JOIN p.categories c WHERE c.name = :category ORDER BY p.createdAt DESC")
    List<Post> findAllPostsWithAuthorAndCategoryByCategory(@Param("category") String category);

    @EntityGraph(attributePaths = {"user", "categories"})
    Post findTopByOrderByCreatedAtDesc();
}

