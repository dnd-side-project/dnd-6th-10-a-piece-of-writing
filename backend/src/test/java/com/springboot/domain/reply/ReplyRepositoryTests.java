//package com.springboot.domain.reply;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//import com.springboot.domain.member.model.Member;
//import com.springboot.domain.posts.model.entity.Posts;
//import com.springboot.domain.posts.repository.PostsRepository;
//import com.springboot.domain.reply.model.entity.Reply;
//import com.springboot.domain.reply.repository.ReplyRepository;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.IntStream;
//import javax.transaction.Transactional;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//@SpringBootTest
//public class ReplyRepositoryTests {
//
//    @Autowired
//    private ReplyRepository replyRepository;
//
//    @Autowired
//    private PostsRepository postsRepository;
//
//    private final Logger logger = (Logger) LoggerFactory.getLogger(ReplyRepositoryTests.class);
//
////    @BeforeEach
////    public void tearDown(){
////        replyRepository.deleteAll();
////    }
//
//    @DisplayName("Reply 테스트 데이터 삽입")
//    @Test
////    @Transactional
//    public void insertReply() {
//
//        IntStream.rangeClosed(1, 10).forEach(i -> {
//            //1부터 300까지의 임의의 번호
//
////            long postsId = (long) (Math.random() * 100) + 202;
//            // 200 ~ 300 까지의 랜덤 id
//
//            long postsId = 1588L;
//
//            Posts posts = Posts.builder()
//                .id(postsId)
//                .build();
//
//            long replyerId = (long) (Math.random() * 100) + 202;
//            // 200 ~ 300 까지의 랜덤 id
//
//            Member replyer = Member.builder().
//                id(replyerId)
//                .build();
//
//            Reply reply = Reply.builder()
////                .id((long) i)
//                .text("Reply......." + i)
//                .posts(posts)
//                .replyer(replyer)
//                .build();
//
//            replyRepository.save(reply);
//
//        });
//
//    }
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
//
//
//}
