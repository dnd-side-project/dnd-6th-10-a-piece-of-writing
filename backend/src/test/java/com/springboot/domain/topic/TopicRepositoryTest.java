package com.springboot.domain.topic;

import com.springboot.domain.topic.model.entity.Topic;
import com.springboot.domain.topic.repository.TopicRepository;
import java.util.stream.IntStream;
import javax.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TopicRepositoryTest {

    @Autowired
    private TopicRepository topicRepository;

    private final Logger logger = (Logger) LoggerFactory.getLogger(TopicRepositoryTest.class);

//    @BeforeEach
//    public void tearDown(){
//        replyRepository.deleteAll();
//    }

    @DisplayName("Topic 테스트 데이터 삽입")
    @Test
    @Transactional
    public void insertTopic() {

        IntStream.rangeClosed(1, 10).forEach(i -> {

            Topic topic = Topic.builder()
                .name("TEST" + i)
                .build();

            topicRepository.save(topic);

        });

    }
//
//    @DisplayName("[Repository] 특정 ID Reply 와 연관된 Posts 조회")
//    @Test
//    @Transactional
//    public void readReply1() {
//
//        Reply reply = replyRepository.findAll().get(0);
//
//        System.out.println(reply);
//        System.out.println(reply.getPosts());
//
//    }
//
//    @DisplayName("[Repository] 특정 id의 Posts 에 달린 댓글 entity 모두 조회")
//    @Test
//    @Transactional
//    public void testListByPosts() {
//
//        Posts posts = postsRepository.findAll().get(0);
//
//        logger.info(String.valueOf(posts.getId()));
//
////        long postsId = 1588L;
//
////        List<Reply> replyList = replyRepository.getRepliesByPostsOrderById(
//        List<Reply> replyList = replyRepository.getRepliesByPostsOrderByIdDesc(
//            Posts.builder().id(posts.getId()).build());
////            Posts.builder().id(postsId).build());
//
//        replyList.forEach(reply -> System.out.println(reply));
//    }
//
//    @DisplayName("[Repository] 특정 id의 Posts 에 달린 댓글 entity 초기 3개 조회")
//    @Test
//    @Transactional
//    public void testFirstListByPosts() {
//
//        Posts posts = postsRepository.findAll().get(0);
//
//        logger.info(String.valueOf(posts.getId()));
//
////        long postsId = 1588L;
//
////        List<Reply> replyList = replyRepository.getRepliesByPostsOrderById(
//        List<Reply> replyList = replyRepository.getRepliesByPostsOrderByIdLimit3(
////            Posts.builder().id(postsId).build());
//            Posts.builder().id(posts.getId()).build());
//
//        replyList.forEach(reply -> System.out.println(reply));
//
//        assertThat(replyList.size()).isLessThan(4);
//    }
//
////    @AfterEach
////    public void tearDown2(){
////        replyRepository.deleteAll();
////    }


}
