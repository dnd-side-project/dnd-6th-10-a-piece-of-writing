package com.springboot.domain.posts.repository;

import com.springboot.domain.posts.model.Entity.Posts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostsRepository extends JpaRepository<Posts, Long> {

//    List<Posts> findAllByOrderById();

//    Page<Posts> findAllPostsOrderByIdDesc(Pageable pageable);

}
