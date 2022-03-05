//package com.springboot.domain.topic;
//
//import com.springboot.domain.posts.model.dto.PostsDto;
//import com.springboot.domain.posts.model.entity.Posts;
//import com.springboot.domain.topic.model.dto.TopicDto;
//import com.springboot.domain.topic.model.entity.Topic;
//import com.springboot.domain.topic.repository.TopicRepository;
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.List;
//import java.util.stream.Collectors;
//import java.util.stream.IntStream;
//import javax.transaction.Transactional;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//@SpringBootTest
//public class TopicRepositoryTest {
//
//    @Autowired
//    private TopicRepository topicRepository;
//
//    private final Logger logger = (Logger) LoggerFactory.getLogger(TopicRepositoryTest.class);
//
////    @BeforeEach
////    public void tearDown(){
////        replyRepository.deleteAll();
////    }
//
////    @DisplayName("Topic 테스트 데이터 삽입")
////    @Test
////    @Transactional
////    public void insertTopic() {
////
////        IntStream.rangeClosed(11, 300).forEach(i -> {
////
////            Topic topic = Topic.builder()
////                .name("TEST" + i)
////                .build();
////
////            topicRepository.save(topic);
////
////        });
////
////    }
//
//    @DisplayName("[Repository] 최신순 토픽 목록 모두 조회")
//    @Test
//    @Transactional
//    public void testFindAllTopicOrderById() {
//
//        List<Topic> topics = topicRepository.findAllByOrderByIdDesc();
//
//        topics.forEach(t -> logger.info(t.toString()));
//
//    }
//
//    @DisplayName("[Repository] 최신순 토픽 10개 이하 목록 조회")
//    @Test
//    @Transactional
//    public void testFindBelow10TopicOrderById() {
//
//        List<Topic> topics = topicRepository.getTopicsBelow10OrderById(10);
//
//        topics.forEach(t -> logger.info(t.toString()));
//
//    }
//
//    @DisplayName("[Repository] keyword 포함한 name 가진 토픽 목록 조회")
//    @Test
//    @Transactional
//    public void testSearchKeyword() {
//
//        List<Topic> topics = topicRepository.findByNameContaining("3");
//
//        logger.info(topics.toString());
//
//    }
//
//    @DisplayName("특정 게시물의 id로 해당 게시물의 모든 토픽 조회")
//    @Test
//    @Transactional
//    public void testFindTopicsByPostsId() {
//        List<Topic> topics = topicRepository.getTopicByPostsId(1621L);
//
//        logger.info("topics : " + topics);
//
//        for (Topic topic : topics
//        ) {
//            TopicDto topicDto = TopicDto.builder()
//                .topicId(topic.getId())
//                .name(topic.getName())
//                .build();
//            logger.info(topicDto.toString());
//        }
//    }
//
//    @DisplayName("인기순으로 10개의 토픽 목록을 반환한다.")
//    @Test
//    @Transactional
//    public void testgetTop10Topics() {
//
//        List<Topic> topics = topicRepository.getTop10Topics();
//
//        logger.info("topics : " + topics);
//
//        topics.forEach(t -> logger.info(t.toString()));
//    }
//
//}
