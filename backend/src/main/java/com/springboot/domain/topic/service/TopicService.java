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

//    List<ReplyDto> getFirstList(Long postsId); //특정 게시물의 초기 댓글 목록
//
//    List<ReplyDto> getList(Long postsId); //특정 게시물의 모든 댓글 목록
//
//    Long modify(Long id, ReplyDto replyDTO); //댓글 수정
//
//    Long remove(Long id); //댓글 삭제
//
    //TopicDTO를 Topic 객체로 변환
    default Topic dtoToEntity(TopicDto dto) {

        Topic topic = Topic.builder()
            .name(dto.getName())
            .build();

        return topic;
    }

    //Topic객체를 TopicDTO로 변환
    default TopicDto entityToDTO(Topic topic) {

        TopicDto dto = TopicDto.builder()
            .id(topic.getId())
            .name(topic.getName())
            .build();

        return dto;

    }

}
