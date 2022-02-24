package com.springboot.domain.topic.service;

import com.springboot.domain.topic.model.dto.TopicDto;
import com.springboot.domain.topic.model.entity.Topic;
import com.springboot.domain.topic.repository.TopicRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;

    @Override
    public TopicDto register(TopicDto topicDTO) {

        Topic topic = topicRepository.save(dtoToEntity(topicDTO));

        TopicDto dto = entityToDTO(topic);

        return dto;
    }

    @Override
    public List<TopicDto> searchKeyword(String keyword) {

        List<Topic> topics = topicRepository.findByNameContaining(keyword);

        List<TopicDto> topicDtos = new ArrayList<>();

        for (Topic topic:topics)
         {
             TopicDto dto = entityToDTO(topic);
             topicDtos.add(dto);
        }

        return topicDtos;
    }
//
//    @Override
//    public List<ReplyDto> getFirstList(Long postsId) {
//
//        List<Reply> result = replyRepository
//            .getRepliesByPostsOrderByIdLimit3(Posts.builder().id(postsId).build());
//
//        return result.stream().map(reply -> entityToDTO(reply)).collect(Collectors.toList());
//    }
//
//    @Override
//    public List<ReplyDto> getList(Long postsId) {
//
//        List<Reply> result = replyRepository
////            .getRepliesByPostsOrderById(Posts.builder().id(postsId).build());
//            .getRepliesByPostsOrderByIdDesc(Posts.builder().id(postsId).build());
//
//        return result.stream().map(reply -> entityToDTO(reply)).collect(Collectors.toList());
//    }
//
//    @Override
//    public Long modify(Long id, ReplyDto replyDTO) {
//
//        Reply reply = replyRepository.getById(id);
//
//        if (reply != null) {
//
//            reply.changeText(replyDTO.getText());
//
//            replyRepository.save(reply);
//        }
//
//        return reply.getId();
//    }
//
//    @Override
//    public Long remove(Long id) {
//
//        replyRepository.deleteById(id);
//
//        return id;
//    }
}
