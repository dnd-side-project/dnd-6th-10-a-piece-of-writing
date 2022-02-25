package com.springboot.domain.topic.service;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.topic.model.dto.TopicDto;
import com.springboot.domain.topic.model.entity.Topic;
import java.util.List;

public interface TopicService {

    TopicDto register(TopicDto topicDTO); //토픽 등록

    List<TopicDto> searchKeyword(String keyword); // 토픽 키워드 검색

    List<TopicDto> getTopicList(Long postsId); //특정 게시물의 모든 토픽 목록

    List<TopicDto> getTop10TopicList(); // 인기순으로 10개의 토픽 목록을 반환

    //TopicDTO를 Topic 객체로 변환
    default Topic dtoToEntity(TopicDto dto) {

        return Topic.builder()
            .name(dto.getName())
            .build();
    }

    //Topic객체를 TopicDTO로 변환
    default TopicDto entityToDTO(Topic topic) {

        return TopicDto.builder()
            .topicId(topic.getId())
            .name(topic.getName())
            .build();

    }

}
