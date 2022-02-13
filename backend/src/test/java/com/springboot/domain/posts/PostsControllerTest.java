package com.springboot.domain.posts;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.domain.auth.jwt.JwtUtil;
import com.springboot.domain.posts.model.Entity.Posts;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
import com.springboot.domain.posts.repository.PostsRepository;
//import com.springboot.domain.posts.model.dto.PostsUpdateRequestDto;
import java.util.ArrayList;
import java.util.stream.IntStream;
import javax.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
    private WebApplicationContext context;

    @Autowired
    private JwtUtil jwtUtil;

    private MockMvc mvc;
    private String accessToken;

    @BeforeEach
    public void setup() {
        mvc = MockMvcBuilders
            .webAppContextSetup(context)
            .apply(springSecurity())
            .build();

        accessToken = jwtUtil.createAuthToken("tester");
    }

    @Test
    @Transactional
    @WithMockUser(username = "tester", roles = "USER")
    public void Posts_등록된다() throws Exception {
        //given
        String content = "content";
        String ref = "reference";
        PostsSaveRequestDto requestDto = PostsSaveRequestDto.builder()
            .content(content)
            .author("author")
            .ref(ref)
            .build();

        String url = "http://localhost:" + port + "/api/v1/posts";

        //when
        mvc.perform(post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("X-AUTH_TOKEN", accessToken)
                .content(new ObjectMapper().writeValueAsString(requestDto)))
            .andExpect(status().isOk());

        //when
//        ResponseEntity<Long> responseEntity = restTemplate.postForEntity(url,requestDto,Long.class);
//
//        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(responseEntity.getBody()).isEqualTo(1);

        //then
        List<Posts> all = postsRepository.findAll();
//        assertThat(all.get(0).getTitle()).isEqualTo(title);
        assertThat(all.get(0).getContent()).isEqualTo(content);
        assertThat(all.get(0).getRef()).isEqualTo(ref);
    }

    @Test
    @Transactional
    @WithMockUser(roles = "USER")
    public void Posts_삭제된다() throws Exception {
        //given
        Posts saved = postsRepository.save(Posts.builder()
            .content("content")
            .author("author")
            .ref("reference")
            .build());

        Long savedId = saved.getId();

        String url = "http://localhost:" + port + "/api/v1/posts/" + savedId;

        mvc.perform(delete(url)
                .contentType(MediaType.APPLICATION_JSON)
                .header("X-AUTH_TOKEN", accessToken))
            .andExpect(status().isOk());

    }

    @Test
    @Transactional
    @WithMockUser(username = "tester", roles = "USER")
    public void Posts_모두_조회한다() throws Exception {
        //given
        int num=20;
        int size=10;

        IntStream.rangeClosed(1,num).forEach(i -> {
            Posts posts = Posts.builder()
                .content("sample content "+i)
                .author("sample author "+i)
                .ref("sample ref "+i)
                .build();

            postsRepository.save(posts);
        });

        Sort sortByPostId = Sort.by("id").descending();

        for(int i=1;i<num;i++){
            int page = (int)(i/size);

            String url = "http://localhost:" + port + "/api/v1/posts/page/"+String.valueOf(page);

            //when
            mvc.perform(MockMvcRequestBuilders.get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("X-AUTH_TOKEN", accessToken))
                .andExpect(status().isOk());

            Pageable pageable = PageRequest.of(page,size,sortByPostId);

            Page<Posts> result = postsRepository.findAll(pageable);

            int j=page*size;

            // then
            for (Posts posts : result) {
                assertThat(posts.getContent()).isEqualTo("sample content "+(num-j));
                assertThat(posts.getAuthor()).isEqualTo("sample author "+(num-j));
                assertThat(posts.getRef()).isEqualTo("sample ref "+(num-j));
                j+=1;
            }
        }
    }

//    @Test
//    @WithMockUser(roles="USER")
//    public void Posts_수정된다() throws Exception {
//        //given
//        Posts savedPosts = postsRepository.save(Posts.builder()
//                .ref("reference")
//                .content("content")
//                .author("author")
//                .build());
//
//        Long updateId = savedPosts.getId();
//        String expectedRef = "reference2";
//        String expectedContent = "content2";
//
//        PostsUpdateRequestDto requestDto = PostsUpdateRequestDto.builder()
//                .ref(expectedRef)
//                .content(expectedContent)
//                .build();
//
//        String url = "http://localhost:" + port + "/api/v1/posts/" + updateId;
//
//        //when
//        mvc.perform(put(url)
//                .contentType(MediaType.APPLICATION_JSON_UTF8)
//                .content(new ObjectMapper().writeValueAsString(requestDto)))
//                .andExpect(status().isOk());
//
//        //then
//        List<Posts> all = postsRepository.findAll();
//        assertThat(all.get(0).getRef()).isEqualTo(expectedRef);
//        assertThat(all.get(0).getContent()).isEqualTo(expectedContent);
//    }

}
