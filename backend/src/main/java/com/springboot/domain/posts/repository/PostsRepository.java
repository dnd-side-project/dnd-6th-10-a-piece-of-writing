package com.springboot.domain.posts.repository;

import com.springboot.domain.posts.model.entity.Posts;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface PostsRepository extends JpaRepository<Posts, Long>, QuerydslPredicateExecutor<Posts> {

    List<Posts> findAllByOrderByIdDesc();

    //특정 ID Posts 와 연관된 Author 조회
    @Query("select p, a from Posts p left join p.author a where p.id =:id")
    Object getPostsWithAuthor(@Param("id") Long id);

    //특정 ID Posts 와 연관된 Reply 조회
    @Query("SELECT p, r FROM Posts p LEFT JOIN Reply r ON r.posts = p WHERE p.id = :id")
    List<Object[]> getPostsWithReply(@Param("id") Long bno);

    //전체 게시물 목록 조회 ( 게시물 + 작성자 + 댓글 작성자 ) 및 페이징 처리
    @Query(value ="SELECT p, a, r " +
        " FROM Posts p " +
        " LEFT JOIN p.author a " +
        " LEFT JOIN Reply r ON r.posts = p " +
        " GROUP BY p")
//        countQuery ="SELECT count(b) FROM Board b")
    Page<Object[]> getPostsWithAuthorReply(Pageable pageable);
}
