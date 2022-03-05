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

    @Query(value = "SELECT * FROM topic t "
        + "INNER JOIN category c "
        + "ON t.id = c.topic_id "
        + "and c.posts_id = :postsId", nativeQuery = true)
    List<Topic> getTopicByPostsId(@Param("postsId") Long postsId);

    @Query(value = "select * from topic t "
        + "join (select *,count(topic_id) "
        + "from category "
        + "group by topic_id "
        + "order by count(topic_id) desc) a "
        + "on a.topic_id = t.id "
        + "limit 10", nativeQuery = true)
    List<Topic> getTop10Topics();

    @Query(value = "select * from topic order by id desc limit :num", nativeQuery = true)
    List<Topic> getTopicsBelow10OrderById(@Param("num") int num);

}
