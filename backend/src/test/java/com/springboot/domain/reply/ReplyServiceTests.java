package com.springboot.domain.reply;

import static org.assertj.core.api.Assertions.assertThat;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import com.springboot.domain.posts.model.dto.PostsDto;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.repository.PostsRepository;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.reply.repository.ReplyRepository;
import com.springboot.domain.reply.service.ReplyService;
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
public class ReplyServiceTests {

    @Autowired
    private ReplyService service;

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ReplyRepository replyRepository;

    Logger logger = LoggerFactory.getLogger(ReplyServiceTests.class);

    @DisplayName("[Service] 특정 id의 Posts 에 달린 댓글 dto 모두 조회")
    @Test
    @Transactional
    public void testGetList() {

        Posts posts = postsRepository.findAll().get(0);

        Long postsId = posts.getId();//데이터베이스에 존재하는 번호

        List<ReplyDto> replyDTOList = service.getList(postsId);

        replyDTOList.forEach(replyDTO -> System.out.println(replyDTO));

    }

    @DisplayName("[Service] Reply 등록 테스트")
    @Transactional
    @Test
    public void testRegister() {

        //given
        String text = "text";

        Member replyer = memberRepository.findAll().get(0);

        Posts posts = postsRepository.findAll().get(0);

        ReplyDto requestDto = ReplyDto.builder()
            .text(text)
            .replyerId(replyer.getId())
            .replyerNickname(replyer.getNickname())
            .replyerEmail(replyer.getEmail())
            .postsId(posts.getId())
            .build();

        //when
        Long savedId = service.register(requestDto);

        Optional<Reply> savedReply = replyRepository.findById(savedId);

        logger.info("savedReply : " + savedReply.toString());

        //then
        assertThat(savedReply.toString()).isEqualTo(savedReply.toString());
    }

    @DisplayName("[Service] 댓글 삭제 ")
    @Test
    @Transactional
    public void testRemove() {

        //given
        String text = "text";

        Member replyer = memberRepository.findAll().get(0);

        Posts posts = postsRepository.findAll().get(0);

        ReplyDto requestDto = ReplyDto.builder()
            .text(text)
            .replyerId(replyer.getId())
            .replyerNickname(replyer.getNickname())
            .replyerEmail(replyer.getEmail())
            .postsId(posts.getId())
            .build();

        logger.info(requestDto.toString());

        Long savedId = service.register(requestDto);

        logger.info(savedId.toString());

        // when
        Long deletedReplyId = service.remove(savedId);

        Optional<Posts> deletedReply = postsRepository.findById(deletedReplyId);

        // then
        assertThat(deletedReply).isEmpty();
    }

    @DisplayName("[Service] 댓글 수정 ")
    @Test
    @Transactional
    public void testModify() {

        //given
        String modifiedText = "Reply Service Modify test";

        Reply reply = replyRepository.findAll().get(0);

        logger.info("reply : " + reply.toString());

        ReplyDto requestDto = service.entityToDTO(reply);

        requestDto.setText(modifiedText);

        logger.info("requestDto : " + requestDto.toString());

        // when
        Long modifedReplyId = service.modify(reply.getId(), requestDto);

        Reply modifiedReply = replyRepository.getById(modifedReplyId);

        // then
        logger.info(modifiedReply.toString());

        assertThat(modifiedReply.getText()).isEqualTo(modifiedText);
    }
}
