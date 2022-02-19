package com.springboot.domain.posts.repository;

import com.springboot.domain.posts.model.entity.Posts;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface PostsRepository extends JpaRepository<Posts, Long>, QuerydslPredicateExecutor<Posts> {

    List<Posts> findAllByOrderByIdDesc();
}
