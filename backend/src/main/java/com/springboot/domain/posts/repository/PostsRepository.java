package com.springboot.domain.posts.repository;

import com.springboot.domain.posts.model.entity.Posts;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface PostsRepository extends JpaRepository<Posts, Long>, QuerydslPredicateExecutor<Posts> {

    List<Posts> findAllByOrderByIdDesc();

    @Query("select p, a from Posts p left join p.author a where p.id =:id")
    Object getPostsWithAuthor(@Param("id") Long id);

    @Query("SELECT p, r FROM Posts p LEFT JOIN Reply r ON r.posts = p WHERE p.id = :id")
    List<Object[]> getPostsWithReply(@Param("id") Long bno);
}
