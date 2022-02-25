package com.springboot.domain.posts.repository;

import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.repository.search.SearchBoardRepository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;

public interface PostsRepository extends JpaRepository<Posts, Long>,
    QuerydslPredicateExecutor<Posts>,
    SearchBoardRepository {

    List<Posts> findAllByOrderByIdDesc();

    //특정 Posts의 ID로 (Posts 와 연관된 Author) 조회
    @Query("select p, a from Posts p left join p.author a where p.id =:id")
    Object getPostsWithAuthor(@Param("id") Long id);

    //특정 ID Posts 와 연관된 Reply 조회
//    @Query("SELECT p, r FROM Posts p LEFT JOIN Reply r ON r.posts = p WHERE p.id = :id")
//    List<Object[]> getPostsWithReply(@Param("id") Long bno);

    //게시물 목록 조회 ( 게시물 + 작성자  ) 및 페이징 처리
    @Query(value = "SELECT p, a" +
        " FROM Posts p " +
        " LEFT JOIN p.author a " +
        " GROUP BY p")
    Page<Object[]> getPostsListWithAuthor(Pageable pageable);

    void deletePostsById(Long id);

    List<Posts> findAllByAuthorId(Long id);

    @Query(value="SELECT p.id FROM Posts p INNER JOIN category c ON p.id = c.posts_id and c.topic_id = :topicId order by p.id desc limit 4",nativeQuery = true)
//    @Query(value="SELECT p FROM Posts p INNER JOIN category c ON p.id = c.posts_id and c.topic_id = :topicId order by p.id desc limit 2",nativeQuery = true)
//    @Query(value="SELECT * FROM Posts p INNER JOIN category c ON p.id = c.posts_id and c.topic_id = :topicId order by p.id desc limit 2")
//    @Query(value="SELECT p FROM Posts p INNER JOIN category c ON p.id = c.posts_id and c.topic_id = :topicId order by p.id desc limit 2")
//    List<Posts> getPostsByTopicOrderByPostsIdLimit4(@Param("topicId") Long topicId);
//    List<Posts> findTop4ByTopicIdPostsByTopicOrderByPostsId(@Param("topicId") Long topicId);
//    List<Object> getPostsByTopicOrderByPostsIdLimit4(@Param("topicId") Long topicId);
//    List<HashMap<String,Object>> getPostsByTopicOrderByPostsIdLimit4(@Param("topicId") Long topicId);
    List<Long> getPostsIdByTopicOrderByPostsIdLimit4(@Param("topicId") Long topicId);
//    Object getPostsByTopicOrderByPostsIdLimit4(@Param("id") Long id);
}
