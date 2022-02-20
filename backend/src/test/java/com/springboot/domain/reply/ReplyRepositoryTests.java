package com.springboot.domain.reply;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.reply.repository.ReplyRepository;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ReplyRepositoryTests {

    @Autowired
    private ReplyRepository replyRepository;

    @Test
    @Transactional
    public void insertReply() {

        IntStream.rangeClosed(1, 300).forEach(i -> {
            //1부터 100까지의 임의의 번호
            long id = (long) (Math.random() * 100) + 202;

            Posts posts = Posts.builder()
                .id(id)
                .build();

            Member replyer = Member.builder().
                id(id)
                .build();

            Reply reply = Reply.builder()
                .text("Reply......." + i)
                .posts(posts)
                .replyer(replyer)
//                .replyer("guest")
                .build();

            replyRepository.save(reply);

        });

    }

    @Test
    public void readReply1() {

        Optional<Reply> result = replyRepository.findById(1L);

        Reply reply = result.get();

        System.out.println(reply);
        System.out.println(reply.getPosts());

    }


}
