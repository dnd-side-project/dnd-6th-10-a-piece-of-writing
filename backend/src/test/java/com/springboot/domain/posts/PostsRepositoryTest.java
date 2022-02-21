package com.springboot.domain.posts;

import com.springboot.domain.posts.model.dto.PageRequestDto;
import com.springboot.domain.posts.model.dto.PageResultDto;
import com.springboot.domain.posts.model.dto.PostsDto;
import org.junit.jupiter.api.DisplayName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    Logger logger = (Logger) LoggerFactory.getLogger(PostsRepositoryTest.class);

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
    @Transactional
    public void testSort() {

        Sort sortByPostId = Sort.by("id").descending();

        Pageable pageable = PageRequest.of(0, 10, sortByPostId);

        Page<Posts> result = postsRepository.findAll(pageable);

        result.get().forEach(
            posts -> System.out.println(posts.getId() + posts.getContent() + posts.getAuthor()));
    }

    //검색내용포함_게시물_검색
    @Test
    @Transactional
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

//    @DisplayName("[Repository] Posts 테스트 데이터 삽입")
//    @Test
//    @Transactional
//    public void testInsertDummies() {
//        IntStream.rangeClosed(500, 600).forEach(i -> {
////        IntStream.rangeClosed(1, 100).forEach(i -> {
//
//            Member member = Member.builder()
////                .id((long)i)
//                .email("user" + i + "@aaa.com")
//                .password("1111")
//                .build();
//
//            Posts posts = Posts.builder()
//                .content("sample content " + i)
//                .author(member)
//                .ref("sample ref " + i)
//                .build();
//
//            postsRepository.save(posts);
//        });
//    }

    @DisplayName("[Repository] 특정 ID Posts 조회")
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

    @DisplayName("[Repository] 특정 ID Posts 와 연관된 Author 조회")
    @Test
    @Transactional
    public void testReadWithAuthor() {

        Object result = postsRepository.getPostsWithAuthor(300L);

        Object[] arr = (Object[]) result;

        System.out.println("-------------------------------");
        System.out.println(Arrays.toString(arr));

    }

    @DisplayName("[Repository] 특정 ID Posts 와 연관된 Reply 조회")
    @Test
    @Transactional
    public void testGetPostsWithReply() {

        List<Object[]> result = postsRepository.getPostsWithReply(300L);

        for (Object[] arr : result) {
            System.out.println(Arrays.toString(arr));
        }
    }

    @DisplayName("[Repository] 게시물 목록 조회 ( 게시물 + 작성자 + 댓글 작성자 ) 및 페이징 처리")
    @Test
    @Transactional
    public void testWithAuthorReply() {

        Pageable pageable = PageRequest.of(0, 10, Sort.by("id").descending());

        Page<Object[]> result = postsRepository.getPostsListsWithAuthorReply(pageable);

        result.get().forEach(row -> {

            Object[] arr = (Object[]) row;

            System.out.println(Arrays.toString(arr));
        });
    }

    @DisplayName("[Repository] JPQL search 테스트")
    @Test
    @Transactional
    public void testSearch1() {

        postsRepository.search1();

    }

    @DisplayName("[Repository] JPQL 페이지네이션 search 테스트")
    @Test
    @Transactional
    public void testSearchPage() {

        Pageable pageable =
            PageRequest.of(0,10,
                Sort.by("id").descending()
                    .and(Sort.by("content").ascending()));

        Page<Object[]> result = postsRepository.searchPage("c", "1", pageable);

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
