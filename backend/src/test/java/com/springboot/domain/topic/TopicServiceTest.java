//package com.springboot.domain.topic;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//import com.springboot.domain.member.model.Member;
//import com.springboot.domain.posts.model.entity.Posts;
//import com.springboot.domain.reply.ReplyServiceTests;
//import com.springboot.domain.reply.model.dto.ReplyDto;
//import com.springboot.domain.reply.model.entity.Reply;
//import com.springboot.domain.topic.service.TopicService;
//import java.util.Optional;
//import javax.transaction.Transactional;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//@SpringBootTest
//public class TopicServiceTest {
//
//    @Autowired
//    private TopicService topicService;
//
//    Logger logger = LoggerFactory.getLogger(TopicServiceTest.class);
//
//    @DisplayName("[Service] Reply 등록 테스트")
//    @Transactional
//    @Test
//    public void testRegister() {
//
//        //given
//        String text = "text";
//
//        Member replyer = memberRepository.findAll().get(0);
//
//        Posts posts = postsRepository.findAll().get(0);
//
//        ReplyDto requestDto = ReplyDto.builder()
//            .text(text)
//            .replyerId(replyer.getId())
//            .replyerNickname(replyer.getNickname())
//            .replyerEmail(replyer.getEmail())
//            .postsId(posts.getId())
//            .build();
//
//        //when
//        Long savedId = service.register(requestDto);
//
//        Optional<Reply> savedReply = replyRepository.findById(savedId);
//
//        logger.info("savedReply : " + savedReply.toString());
//
//        //then
//        assertThat(savedReply.toString()).isEqualTo(savedReply.toString());
//    }
//}
