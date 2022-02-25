package com.springboot.domain.topic.service;

import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.topic.model.dto.TopicDto;
import com.springboot.domain.topic.model.entity.Topic;
import com.springboot.domain.topic.repository.TopicRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;

    @Override
    public TopicDto register(TopicDto topicDTO) {

        Topic topic = topicRepository.save(dtoToEntity(topicDTO));

        return entityToDTO(topic);
    }

    @Override
    public List<TopicDto> searchKeyword(String keyword) {

        List<Topic> topics = topicRepository.findByNameContaining(keyword);

        List<TopicDto> topicDtos = new ArrayList<>();

        for (Topic topic : topics) {
            TopicDto dto = entityToDTO(topic);
            topicDtos.add(dto);
        }

        return topicDtos;
    }

    @Override
    public List<TopicDto> getTopicList(Long postsId) {

        List<Topic> topicList = topicRepository.getTopicByPostsId(postsId);

        return topicList.stream().map(T -> entityToDTO(T))
            .collect(Collectors.toList());
    }

    @Override
    public List<TopicDto> getTop10TopicList() {

        List<Topic> topicList = topicRepository.getTop10Topics();

        return topicList.stream().map(T -> entityToDTO(T))
            .collect(Collectors.toList());
    }


}
