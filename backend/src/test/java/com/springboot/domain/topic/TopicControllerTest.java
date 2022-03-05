//package com.springboot.domain.topic;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import com.springboot.domain.auth.jwt.JwtUtil;
//import com.springboot.domain.member.model.Member;
//import com.springboot.domain.member.repository.MemberRepository;
//import com.springboot.domain.posts.model.entity.Posts;
//import com.springboot.domain.posts.repository.PostsRepository;
//import com.springboot.domain.posts.service.PostsService;
//import com.springboot.domain.reply.model.dto.ReplyDto;
//import com.springboot.domain.reply.model.entity.Reply;
//import com.springboot.domain.reply.repository.ReplyRepository;
//import com.springboot.domain.reply.service.ReplyService;
//import com.springboot.domain.topic.model.dto.TopicDto;
//import com.springboot.domain.topic.model.entity.Topic;
//import com.springboot.domain.topic.repository.TopicRepository;
//import com.springboot.domain.topic.service.TopicService;
//import java.util.Optional;
//import javax.transaction.Transactional;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.boot.web.server.LocalServerPort;
//import org.springframework.http.*;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.context.WebApplicationContext;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import java.util.List;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//public class TopicControllerTest {
//
//    @LocalServerPort
//    private int port;
//
//    @Autowired
//    private TestRestTemplate restTemplate;
//
//    @Autowired
//    private ReplyService replyService;
//
//    @Autowired
//    private ReplyRepository replyRepository;
//
//    @Autowired
//    private PostsRepository postsRepository;
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private PostsService postsService;
//
//    @Autowired
//    private TopicService topicService;
//
//    @Autowired
//    private TopicRepository topicRepository;
//
//    @Autowired
//    private WebApplicationContext context;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    Logger logger = LoggerFactory.getLogger(TopicControllerTest.class);
//
//    private MockMvc mvc;
//    private String accessToken;
//
//    private String local_address = "http://localhost";
//    private String deployed_address = "http://pieceofwriting.kro.kr";
//    private String current_address = "local";
//    //    private String current_address = "deploy";
//    private String path = ":" + port + "/api/v1/topic";
//    private String url;
//    private String local_url;
//    private String deployed_url;
//    private String params;
//
//
//    @BeforeEach
//    public void setup() {
//        mvc = MockMvcBuilders
//            .webAppContextSetup(context)
//            .apply(springSecurity())
//            .build();
//
//        accessToken = jwtUtil.createAuthToken("tester2@gmail.com");
//    }
//
//    @DisplayName("[Controller] Topic save")
//    @Test
//    @Transactional
//    public void Topic_등록된다() throws Exception {
//
//        //given
//        String name = "TEST NAME";
//
//        TopicDto requestDto = TopicDto.builder()
//            .name(name)
//            .build();
//
//        logger.info(requestDto.toString());
//
//        local_url = local_address + path;
//        deployed_url = deployed_address + path;
//
//        if (current_address.equals("local")) {
//            url = local_url;
//        } else {
//            url = deployed_url;
//        }
//
//        //when
//        mvc.perform(post(url)
//                .contentType(MediaType.APPLICATION_JSON)
//                .header("X-AUTH_TOKEN", accessToken)
//                .content(new ObjectMapper().writeValueAsString(requestDto)))
//            .andExpect(status().isOk());
//
//        //then
//        List<Topic> all = topicRepository.findAllByOrderByIdDesc();
//        assertThat(all.get(0).getName()).isEqualTo(name);
//    }
//
//    @DisplayName("[Controller] keyword 포함한 name 가진 토픽 목록 조회")
//    @Test
//    @Transactional
//    public void testSearchKeyword() throws Exception {
//
//        //given
//        String keyword = topicRepository.findAll().get(0).getName();
//
//        logger.info("keyword : " + keyword.toString());
//
//        params = "/search/" + keyword;
//
//        local_url = local_address + path + params;
//        deployed_url = deployed_address + path + params;
//
//        if (current_address.equals("local")) {
//            url = local_url;
//        } else {
//            url = deployed_url;
//        }
//
//        //when
//        mvc.perform(get(url)
//                .contentType(MediaType.APPLICATION_JSON)
//                .header("X-AUTH_TOKEN", accessToken))
//            .andExpect(status().isOk())
//            .andDo(print());
//
//    }
//
//}
