package com.springboot.domain.posts;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.model.entity.QPosts;
import com.springboot.domain.posts.repository.PostsRepository;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.IntStream;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit.jupiter.SpringExtension;


import java.time.LocalDateTime;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class PostsRepositoryTest {

    @Autowired
    PostsRepository postsRepository;

    // 테스트 후 데이터 삭제용
//    @AfterEach
//    void tearDown(){
//        postsRepository.deleteAll();
//    }

    // 0219 변경 예정. author -> member
//    @Test
//    @Transactional
//    public void 게시글저장_불러오기() {
//        //given
//        String ref = "테스트 레퍼런스";
//        String content = "테스트 본문";
//
//        postsRepository.save(Posts.builder()
//            .content(content)
//            .author("stam0325@gmail.com")
//            .ref(ref)
//            .build());
//
//        //when
//        List<Posts> postsList = postsRepository.findAllByOrderByIdDesc();
//
//        //then
//        Posts posts = postsList.get(0);
//        assertThat(posts.getContent()).isEqualTo(content);
//        assertThat(posts.getRef()).isEqualTo(ref);
//    }
//
//    @Test
//    @Transactional
//    public void BaseTimeEntity_등록() {
//        //given
//        LocalDateTime now = LocalDateTime.of(2019, 6, 4, 0, 0, 0);
//        postsRepository.save(Posts.builder()
//            .ref("reference")
//            .content("content")
//            .author("author")
//            .build());
//        //when
//        List<Posts> postsList = postsRepository.findAll();
//
//        //then
//        Posts posts = postsList.get(0);
//
//        System.out.println(">>>>>>>>> createDate=" + posts.getCreatedDate() + ", modifiedDate="
//            + posts.getModifiedDate());
//
//        assertThat(posts.getCreatedDate()).isAfter(now);
//        assertThat(posts.getModifiedDate()).isAfter(now);
//    }
//
//    @Test
//    @Transactional
//    public void 게시글_삭제() {
//        //given
//        String ref = "테스트 레퍼런스";
//        String content = "테스트 본문";
//
//        Posts saved = postsRepository.save(Posts.builder()
//            .content(content)
//            .author("stam0325@gmail.com")
//            .ref(ref)
//            .build());
//
//        //when
//        postsRepository.deleteById(saved.getId());
//
//        //then
//        Optional<Posts> deleted = postsRepository.findById(saved.getId());
//        assertThat(deleted).isEmpty();
//    }
//

    // 페이지 정렬 테스트
    @Test
    public void testSort() {

        Sort sortByPostId = Sort.by("id").descending();

        Pageable pageable = PageRequest.of(0, 10, sortByPostId);

        Page<Posts> result = postsRepository.findAll(pageable);

        result.get().forEach(
            posts -> System.out.println(posts.getId() + posts.getContent() + posts.getAuthor()));
    }

    //검색내용포함_게시물_검색
    @Test
    public void test_query_dsl() {

        Pageable pageable = PageRequest.of(0, 10, Sort.by("id").descending());

        QPosts posts = QPosts.posts;

        String keyword = "1";

        BooleanBuilder builder = new BooleanBuilder();

        BooleanExpression expression = posts.content.contains(keyword);

        builder.and(expression);

        Page<Posts> result = postsRepository.findAll(builder, pageable);

        result.stream().forEach(System.out::println);
    }

    // 테스트 위한 다량 데이터 등록 테스트
    @Test
    @Transactional
    public void testInsertDummies() {
        IntStream.rangeClosed(1, 100).forEach(i -> {

            Member member = Member.builder()
                .email("user"+i +"@aaa.com")
                .password("1111")
                .build();

            Posts posts = Posts.builder()
                .content("sample content " + i)
                .author(member)
                .ref("sample ref " + i)
                .build();

            postsRepository.save(posts);
        });
    }

    @Test
    @Transactional
    public void testRead1() {

//        Optional<Posts> result = postsRepository.findById(300L); //데이터베이스에 존재하는 번호
//
//        Posts posts = result.get();

        Posts posts = postsRepository.getById(300L);

        System.out.println(posts);
        System.out.println(posts.getAuthor());

    }

    @Test
    public void testReadWithAuthor() {

        Object result = postsRepository.getPostsWithAuthor(300L);

        Object[] arr = (Object[])result;

        System.out.println("-------------------------------");
        System.out.println(Arrays.toString(arr));

    }

    @Test
    public void testGetPostsWithReply() {

        List<Object[]> result = postsRepository.getPostsWithReply(300L);

        for (Object[] arr : result) {
            System.out.println(Arrays.toString(arr));
        }
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
