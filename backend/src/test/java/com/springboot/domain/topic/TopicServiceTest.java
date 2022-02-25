package com.springboot.domain.topic;

import static org.assertj.core.api.Assertions.assertThat;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.topic.model.dto.TopicDto;
import com.springboot.domain.topic.model.entity.Topic;
import com.springboot.domain.topic.repository.TopicRepository;
import com.springboot.domain.topic.service.TopicService;
import java.util.List;
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

        Topic savedTopic = topicRepository.getById(savedTopicDto.getTopicId());

        logger.info("savedTopicDto : " + savedTopicDto.toString());

        //then
        assertThat(savedTopicDto.getTopicId()).isEqualTo(savedTopic.getId());
    }

    @DisplayName("[Service] keyword 포함한 name 가진 토픽 목록 조회")
    @Transactional
    @Test
    public void testSearchKeyword() {

        String keyword = topicRepository.findAll().get(0).getName();

        List<Topic> topics = topicRepository.findByNameContaining(keyword);

        //then
        logger.info("topics : " + topics.toString());
    }

    @DisplayName("[Service] postsId의 게시물이 가진 토픽 목록을 반환한다.")
    @Transactional
    @Test
    public void testgetTopicList() {

        List<TopicDto> topicDtos = topicService.getTopicList(1621L);

        topicDtos.forEach(t -> logger.info(t.toString()));

    }

    @DisplayName("인기순으로 10개의 토픽 목록을 반환한다.")
    @Test
    @Transactional
    public void testgetTop10Topics() {

        List<TopicDto> topics = topicService.getTop10TopicList();

        logger.info("topics : " + topics);

        topics.forEach(t -> logger.info(t.toString()));
    }
}
