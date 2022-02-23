package com.springboot.domain.topic;

import static org.assertj.core.api.Assertions.assertThat;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.ReplyServiceTests;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.topic.model.dto.TopicDto;
import com.springboot.domain.topic.model.entity.Topic;
import com.springboot.domain.topic.repository.TopicRepository;
import com.springboot.domain.topic.service.TopicService;
import java.util.Optional;
import javax.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TopicServiceTest {

    @Autowired
    private TopicService topicService;

    @Autowired
    private TopicRepository topicRepository;

    Logger logger = LoggerFactory.getLogger(TopicServiceTest.class);

    @DisplayName("[Service] Topic 등록 테스트")
    @Transactional
    @Test
    public void testRegister() {

        //given
        String name = "TEST NAME";

        TopicDto requestDto = TopicDto.builder()
            .name(name)
            .build();

        //when
        TopicDto savedTopicDto = topicService.register(requestDto);

        Topic savedTopic = topicRepository.getById(savedTopicDto.getId());

        logger.info("savedTopicDto : " + savedTopicDto.toString());

        //then
        assertThat(savedTopicDto.getId()).isEqualTo(savedTopic.getId());
    }
}
