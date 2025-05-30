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
            CROSS JOIN users u ON p.user_id = u.id
            JOIN posts_categories pc ON p.id = pc.post_id
            JOIN categories c ON pc.category_id = c.id
            WHERE c.id IN (
                        SELECT category_id FROM posts_categories
                        GROUP BY category_id HAVING COUNT(*) >= 4
                    )
            """, nativeQuery = true)
    List<Object[]> findAllPostsWithAuthorAndCategory();


    List<Post> findByUserId(Integer id);
//    @Query("""
//    SELECT new com.example.TheBlog.DTO.PostResponseDTO(
//        p.id, p.title, p.body, p.image, p.createdAt)
//    FROM Post p
//    WHERE c.id IN (
//        SELECT pc.category.id FROM PostCategory pc
//        GROUP BY pc.category.id HAVING COUNT(pc.post.id) >= 4
//    )
//""")
//    List<Object[]> findPostsByAuthorId(Integer id);

    @Query(value = """
            SELECT p.id, p.title, p.body, p.image, p.created_at,
            u.username AS authorName, u.img AS authorImg, c.name AS categoryName
            FROM posts p 
            JOIN users u ON p.user_id = u.id
            JOIN posts_categories pc ON p.id = pc.post_id
            JOIN categories c ON pc.category_id = c.id
            WHERE p.id = ? 
            """, nativeQuery = true)
    List<Object[]> findPostWithAuthorAndCategoryById(Integer id);

    @Query(value = """
            SELECT p.id, p.title, p.body, p.image, p.created_at,
            u.username AS authorName, u.img AS authorImg, c.name AS categoryName
            FROM posts p 
            JOIN users u ON p.user_id = u.id
            JOIN posts_categories pc ON p.id = pc.post_id
            JOIN categories c ON pc.category_id = c.id
            WHERE c.name = ? 
            ORDER BY p.created_at DESC
            """, nativeQuery = true)
    List<Object[]> findAllPostsWithAuthorAndCategoryByCategory(String category);

    @Query(value = """
            SELECT p.id, p.title, p.body, p.image, p.created_at, 
            u.username AS authorName, u.img AS authorImage, c.name AS categoryName
            FROM posts p
            JOIN users u ON p.user_id = u.id
            JOIN posts_categories pc ON p.id = pc.post_id 
            JOIN categories c ON pc.category_id = c.id
            ORDER BY p.created_at DESC
            LIMIT 1
            """, nativeQuery = true)
    List<Object[]> findLatestPostWithAuthorAndCategory();

}
