package com.springboot.domain.posts;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.domain.auth.jwt.JwtUtil;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import com.springboot.domain.posts.model.dto.PostsDto;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.repository.PostsRepository;
//import com.springboot.domain.posts.model.dto.PostsUpdateRequestDto;
import com.springboot.domain.posts.service.PostsService;
import com.springboot.domain.reply.ReplyControllerTests;
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
import org.springframework.security.test.context.support.WithMockUser;
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
public class PostsControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

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

    Logger logger = LoggerFactory.getLogger(PostsControllerTest.class);

    private MockMvc mvc;
    private String accessToken;

    private String local_address = "http://localhost";
    private String deployed_address = "http://pieceofwriting.kro.kr";
    private String current_address = "local";
    //    private String current_address = "deploy";
    private String path = ":" + port + "/api/v1/posts";
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

    @DisplayName("[Controller] Posts save")
    @Test
//    @Transactional
    public void Posts_등록된다() throws Exception {
        //given
        String content = "content";
        String ref = "reference";

        Member author = memberRepository.findAll().get(0);

        PostsDto requestDto = PostsDto.builder()
            .content(content)
            .ref(ref)
            .authorId(author.getId())
            .build();

        logger.info("requestDTO : " + requestDto);

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
        List<Posts> all = postsRepository.findAllByOrderByIdDesc();
        assertThat(all.get(0).getContent()).isEqualTo(content);
        assertThat(all.get(0).getRef()).isEqualTo(ref);
    }

    @DisplayName("[Controller] Posts delete")
    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    public void Posts_삭제된다() throws Exception {
        //given
        String content = "content";
        String ref = "reference";

        Member author = memberRepository.findAll().get(0);

        PostsDto requestDto = PostsDto.builder()
            .content(content)
            .ref(ref)
            .authorId(author.getId())
            .build();

        Long savedId = postsService.save(requestDto);

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
    }

    @DisplayName("게시물 1개 조회 테스트")
    @Test
    @Transactional
    public void Posts_조회한다() throws Exception {
        //given
        Posts posts = postsRepository.findAll().get(0);

        long id = posts.getId();

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

    @DisplayName("전체 게시물 내림차순 조회 테스트")
    @Test
    @Transactional
    public void Posts_모두_조회한다() throws Exception {
        //given
        int page = 1;
        int size = 10;

        String searched_page = "page=" + String.valueOf(page);
        String searched_size = "size=" + String.valueOf(size);

        params = "/list?" + searched_page
            + "&" + searched_size;

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

    @DisplayName("검색 내용 포함 게시물 내림차순 조회 테스트 - content")
    @Test
    @Transactional
    public void Posts_content_검색한다() throws Exception {

        //given
        int page = 1;
        int size = 10;
        String type = "c";
        String keyword = "2";

        String searched_page = "page=" + String.valueOf(page);
        String searched_size = "size=" + String.valueOf(size);
        String searched_type = "type=" + type;
        String searched_keyword = "keyword=" + keyword;

        params = "/search?" + searched_page
            + "&" + searched_size
            + "&" + searched_type
            + "&" + searched_keyword;

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

    @DisplayName("검색 내용 포함 게시물 내림차순 조회 테스트 - author")
    @Test
    @Transactional
    public void Posts_author_검색한다() throws Exception {

        //given
        int page = 1;
        int size = 10;
        String type = "a";
        String keyword = "2";

        String searched_page = "page=" + String.valueOf(page);
        String searched_size = "size=" + String.valueOf(size);
        String searched_type = "type=" + type;
        String searched_keyword = "keyword=" + keyword;

        params = "/search?" + searched_page
            + "&" + searched_size
            + "&" + searched_type
            + "&" + searched_keyword;

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
