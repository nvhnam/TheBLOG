package com.example.TheBlog.repository;

import com.example.TheBlog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query(value = """
            SELECT p.id, p.title, p.body, p.image, p.created_at, 
            u.username AS authorName, u.img AS authorImg, c.name AS categoryName
            FROM posts p
            JOIN users u ON p.user_id = u.id
            JOIN posts_categories pc ON p.id = pc.post_id
            JOIN categories c ON pc.category_id = c.id  
            """, nativeQuery = true)
    List<Object[]> findAllPostsWithAuthorAndCategory();

}
