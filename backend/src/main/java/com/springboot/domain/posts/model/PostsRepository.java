package com.springboot.domain.posts.model;

import com.springboot.domain.posts.model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository<Posts,Long> {

//    @Query("SELECT p FROM Posts p ORDER BY p.id DESC")
//    List<Posts> findAllDesc();
}
