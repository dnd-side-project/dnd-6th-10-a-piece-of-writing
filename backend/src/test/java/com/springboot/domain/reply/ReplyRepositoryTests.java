package com.springboot.domain.reply;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.reply.repository.ReplyRepository;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ReplyRepositoryTests {

    @Autowired
    private ReplyRepository replyRepository;

//    @BeforeEach
//    public void tearDown(){
//        replyRepository.deleteAll();
//    }

    @DisplayName("Reply 테스트 데이터 삽입")
    @Test
    @Transactional
    public void insertReply() {

        IntStream.rangeClosed(1, 300).forEach(i -> {
            //1부터 300까지의 임의의 번호

            long postsId = (long) (Math.random() * 100) + 202;
            // 200 ~ 300 까지의 랜덤 id

            Posts posts = Posts.builder()
                .id(postsId)
                .build();

            long replyerId = (long) (Math.random() * 100) + 202;
            // 200 ~ 300 까지의 랜덤 id

            Member replyer = Member.builder().
                id(replyerId)
                .build();

            Reply reply = Reply.builder()
                .id((long)i)
                .text("Reply......." + i)
                .posts(posts)
                .replyer(replyer)
//                .replyer("guest")
                .build();

            replyRepository.save(reply);

        });

    }

    @DisplayName("특정 ID Reply 와 연관된 Posts 조회")
    @Test
    public void readReply1() {

        Optional<Reply> result = replyRepository.findById(1L);

        Reply reply = result.get();

        System.out.println(reply);
        System.out.println(reply.getPosts());

    }

//    @AfterEach
//    public void tearDown2(){
//        replyRepository.deleteAll();
//    }


}
