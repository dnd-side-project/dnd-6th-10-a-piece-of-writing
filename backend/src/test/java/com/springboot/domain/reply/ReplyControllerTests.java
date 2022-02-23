package com.springboot.domain.reply;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.springboot.domain.auth.jwt.JwtUtil;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.repository.PostsRepository;
import com.springboot.domain.posts.service.PostsService;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.entity.Reply;
import com.springboot.domain.reply.repository.ReplyRepository;
import com.springboot.domain.reply.service.ReplyService;
import java.util.Optional;
import javax.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ReplyControllerTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ReplyService replyService;

    @Autowired
    private ReplyRepository replyRepository;

    @Autowired
    private PostsRepository postsRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PostsService postsService;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private JwtUtil jwtUtil;

    Logger logger = LoggerFactory.getLogger(ReplyControllerTests.class);

    private MockMvc mvc;
    private String accessToken;

    private String local_address = "http://localhost";
    private String deployed_address = "http://pieceofwriting.kro.kr";
    private String current_address = "local";
    //    private String current_address = "deploy";
    private String path = ":" + port + "/api/v1/reply";
    private String url;
    private String local_url;
    private String deployed_url;
    private String params;


    @BeforeEach
    public void setup() {
        mvc = MockMvcBuilders
            .webAppContextSetup(context)
            .apply(springSecurity())
            .build();

        accessToken = jwtUtil.createAuthToken("tester@gmail.com");
    }

    @DisplayName("[Controller] Reply save")
    @Test
    @Transactional
    public void Reply_등록된다() throws Exception {
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

        local_url = local_address + path;
        deployed_url = deployed_address + path;

        if (current_address.equals("local")) {
            url = local_url;
        } else {
            url = deployed_url;
        }

        //when
        mvc.perform(post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("X-AUTH_TOKEN", accessToken)
                .content(new ObjectMapper().writeValueAsString(requestDto)))
            .andExpect(status().isOk());

        //then
        List<Reply> all = replyRepository.findAllByOrderByIdDesc();
        assertThat(all.get(0).getText()).isEqualTo(text);
    }

    @DisplayName("[Controller] Reply delete")
    @Test
    @Transactional
    public void Reply_삭제된다() throws Exception {
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

        // when
        Long savedId = replyService.register(requestDto);

        logger.info(savedId.toString());

        params = "/" + savedId;

        local_url = local_address + path + params;
        deployed_url = deployed_address + path + params;

        if (current_address.equals("local")) {
            url = local_url;
        } else {
            url = deployed_url;
        }

        mvc.perform(delete(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("X-AUTH_TOKEN", accessToken))
            .andExpect(status().isOk());

        //then
        Optional<Reply> deletedReply = replyRepository.findById(savedId);
        assertThat(deletedReply).isEmpty();
    }

    @DisplayName("[Controller] 댓글 수정 ")
    @Test
    @Transactional
    public void testModify() throws Exception {

        //given
        String modifiedText = "Reply Service Modify test";

        Reply reply = replyRepository.findAll().get(0);

        logger.info("reply : " + reply.toString());

        ReplyDto requestDto = replyService.entityToDTO(reply);

        requestDto.setText(modifiedText);

        logger.info("requestDto : " + requestDto.toString());

        // when
        params = "/" + reply.getId();

        local_url = local_address + path + params;
        deployed_url = deployed_address + path + params;

        if (current_address.equals("local")) {
            url = local_url;
        } else {
            url = deployed_url;
        }

        mvc.perform(put(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("X-AUTH_TOKEN", accessToken)
                .content(new ObjectMapper().registerModule(new JavaTimeModule())
                    .writeValueAsString(requestDto)))
            .andExpect(status().isOk())
            .andDo(print());

        //then
        Reply modifiedReply = replyRepository.getById(reply.getId());

        logger.info("modifiedReply : " + modifiedReply.toString());

        assertThat(modifiedReply.getText()).isEqualTo(modifiedText);
    }

    @DisplayName("[Controller] 댓글 초기 3개 조회 테스트")
    @Test
    @Transactional
    public void Reply_조회한다() throws Exception {
        //given
        Posts posts = postsRepository.findAll().get(0);

        long id = posts.getId();

//        long id = 1588L;

        params = "/first/" + String.valueOf(id);

        local_url = local_address + path + params;
        deployed_url = deployed_address + path + params;

        if (current_address.equals("local")) {
            url = local_url;
        } else {
            url = deployed_url;
        }

        //when
        mvc.perform(get(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("X-AUTH_TOKEN", accessToken))
            .andExpect(status().isOk())
            .andDo(print());
    }

    @DisplayName("[Controller] 댓글 모두 조회 테스트")
    @Test
    @Transactional
    public void Reply_모두_조회한다() throws Exception {
        //given
        Posts posts = postsRepository.findAll().get(0);

        long id = posts.getId();

//        long id = 1588L;

        params = "/" + String.valueOf(id);

        local_url = local_address + path + params;
        deployed_url = deployed_address + path + params;

        if (current_address.equals("local")) {
            url = local_url;
        } else {
            url = deployed_url;
        }

        //when
        mvc.perform(get(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("X-AUTH_TOKEN", accessToken))
            .andExpect(status().isOk())
            .andDo(print());
    }

}
