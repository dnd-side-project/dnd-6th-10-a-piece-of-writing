package com.springboot.domain.posts;

import com.springboot.domain.posts.model.Posts;
import com.springboot.domain.posts.model.PostsRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class PostsRepositoryTest {

    @Autowired
    PostsRepository postsRepository;

    @AfterEach
    public void cleanup() {
        postsRepository.deleteAll();
    }

    @Test
    public void 게시글저장_불러오기() {
        //given
        String ref = "테스트 레퍼런스";
        String content = "테스트 본문";

        postsRepository.save(Posts.builder()
                .content(content)
                .author("stam0325@gmail.com")
                .ref(ref)
                .build());

        //when
        List<Posts> postsList = postsRepository.findAll();

        //then
        Posts posts = postsList.get(0);
//        assertThat(posts.getTitle()).isEqualTo(title);
        assertThat(posts.getContent()).isEqualTo(content);
        assertThat(posts.getRef()).isEqualTo(ref);
    }

    @Test
    public void BaseTimeEntity_등록() {
        //given
        LocalDateTime now = LocalDateTime.of(2019, 6, 4, 0, 0, 0);
        postsRepository.save(Posts.builder()
                .ref("reference")
                .content("content")
                .author("author")
                .build());
        //when
        List<Posts> postsList = postsRepository.findAll();

        //then
        Posts posts = postsList.get(0);

        System.out.println(">>>>>>>>> createDate=" + posts.getCreatedDate() + ", modifiedDate=" + posts.getModifiedDate());

        assertThat(posts.getCreatedDate()).isAfter(now);
        assertThat(posts.getModifiedDate()).isAfter(now);
    }

    @Test
    public void 게시글_삭제() {
        //given
        String ref = "테스트 레퍼런스";
        String content = "테스트 본문";

        Posts saved = postsRepository.save(Posts.builder()
                .content(content)
                .author("stam0325@gmail.com")
                .ref(ref)
                .build());

        //when
//        List<Posts> postsList = postsRepository.findAll();

//        Posts posts = postsList.get(0);

        //then
        postsRepository.delete(saved);

        List<Posts> deleted = postsRepository.findAll();
        assertThat(deleted).isEmpty();

//        try {
//            List<Posts> temp = postsRepository.findAll();
//            assertThat(temp.size()).isEqualTo(0);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }

//    @Test
//    public void 게시글_1개조회() {
//        //given
//        String ref = "테스트 레퍼런스";
//        String content = "테스트 본문";
//
//        postsRepository.save(Posts.builder()
//                .content(content)
//                .author("stam0325@gmail.com")
//                .ref(ref)
//                .build());
//
//        //when
//        List<Posts> postsList = postsRepository.findAll();
//
//        //then
//        Posts posts = postsList.get(0);
//        long id = posts.getId();
//        Optional<Posts> entity = postsRepository.findById(id);
//
//        assertThat(posts.getContent()).isEqualTo(content);
//        assertThat(posts.getRef()).isEqualTo(ref);
//    }


}
