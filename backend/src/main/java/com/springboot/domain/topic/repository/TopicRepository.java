package com.springboot.domain.topic.repository;

import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.topic.model.dto.TopicDto;
import com.springboot.domain.topic.model.entity.Topic;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TopicRepository extends JpaRepository<Topic, Long> {

    List<Topic> findAllByOrderByIdDesc();

//    @Query(value="select * from topic where name like '%keyword%'",nativeQuery = true)
//    List<Topic> findTopicContainKeyword(String keyword);

    List<Topic> findByNameContaining(String keyword);

    // 입력하는 name이 기존 토픽 데이터테이블에 있는지 확인하고, 일치하는 내역을 목록(topic_id, name)으로 보낸다.
//    @Query(value="select * from Topic t "
//        + "")
//    List<Topic> getTopicsByOrderByIdDesc(String name);
}
