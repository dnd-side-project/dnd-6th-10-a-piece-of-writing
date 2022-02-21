package com.springboot.domain.reply;

import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.repository.PostsRepository;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.service.ReplyService;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ReplyServiceTests {

    @Autowired
    private ReplyService service;

    @Autowired
    private PostsRepository postsRepository;

    @DisplayName("[Service] 특정 id의 Posts 에 달린 댓글 dto 모두 조회")
    @Test
    public void testGetList() {

        Posts posts = postsRepository.findAll().get(0);

        Long postsId = posts.getId();//데이터베이스에 존재하는 번호

        List<ReplyDto> replyDTOList = service.getList(postsId);

        replyDTOList.forEach(replyDTO -> System.out.println(replyDTO));

    }
}
