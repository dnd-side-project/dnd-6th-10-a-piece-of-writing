package com.springboot.domain.topic.repository;

import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.topic.model.dto.TopicDto;
import com.springboot.domain.topic.model.entity.Topic;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.HashMap;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TopicRepository extends JpaRepository<Topic, Long> {

    List<Topic> findAllByOrderByIdDesc();

    List<Topic> findByNameContaining(String keyword);

    // 입력하는 name이 기존 토픽 데이터테이블에 있는지 확인하고, 일치하는 내역을 목록(topic_id, name)으로 보낸다.
//    @Query(value="select * from Topic t "
//        + "")
//    List<Topic> getTopicsByOrderByIdDesc(String name);

//    @Query(value="SELECT p.* FROM Posts p INNER JOIN category c ON p.id = c.posts_id and c.topic_id = :topicId order by p.id desc limit 2",nativeQuery = true)
    @Query(value="SELECT p FROM Posts p INNER JOIN category c ON p.id = c.posts_id and c.topic_id = :topicId order by p.id desc limit 2",nativeQuery = true)
//    @Query(value="SELECT * FROM Posts p INNER JOIN category c ON p.id = c.posts_id and c.topic_id = :topicId order by p.id desc limit 2")
//    @Query(value="SELECT p FROM Posts p INNER JOIN category c ON p.id = c.posts_id and c.topic_id = :topicId order by p.id desc limit 2")
    List<Posts> getPostsByTopicOrderByPostsIdLimit4(@Param("topicId") Long topicId);
//    List<Posts> findTop4ByTopicIdPostsByTopicOrderByPostsId(@Param("topicId") Long topicId);
//    List<Object> getPostsByTopicOrderByPostsIdLimit4(@Param("topicId") Long topicId);
//    List<HashMap<String,Object>> getPostsByTopicOrderByPostsIdLimit4(@Param("topicId") Long topicId);
//    List<Long> getPostsByTopicOrderByPostsIdLimit4(@Param("topicId") Long topicId);
//    Object getPostsByTopicOrderByPostsIdLimit4(@Param("id") Long id);
}
