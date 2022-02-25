package com.springboot.domain.posts;

import static org.assertj.core.api.Assertions.assertThat;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import com.springboot.domain.posts.model.dto.PageRequestDto;
import com.springboot.domain.posts.model.dto.PageResultDto;
import com.springboot.domain.posts.model.dto.PostsDto;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.repository.PostsRepository;
import com.springboot.domain.posts.service.PostsService;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.reply.repository.ReplyRepository;
import com.springboot.domain.reply.service.ReplyService;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class PostsServiceTest {

    @Autowired
    private PostsService service;

    @Autowired
    private ReplyService replyService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private ReplyRepository replyRepository;

    Logger logger = LoggerFactory.getLogger(PostsServiceTest.class);

    @DisplayName("[Service] 조건부 목록 조회 페이지네이션 search 테스트 ")
    @Test
    @Transactional
    public void testSearch() {

        Long loginUserId = memberRepository.findAll().get(0).getId();

        PageRequestDto pageRequestDTO = new PageRequestDto();
        pageRequestDTO.setPage(1);
        pageRequestDTO.setSize(10);
        pageRequestDTO.setType("i");
        pageRequestDTO.setKeyword("12");
        pageRequestDTO.setTopicId(1L);

        PageResultDto<PostsDto, Object[]> result = service.getList(pageRequestDTO,loginUserId);

        for (PostsDto postsDto : result.getDtoList()) {
            logger.info(postsDto.toString());
        }
    }

}
