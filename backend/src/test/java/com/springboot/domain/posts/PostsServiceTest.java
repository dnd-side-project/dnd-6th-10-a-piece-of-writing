package com.springboot.domain.posts;

import static org.assertj.core.api.Assertions.assertThat;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import com.springboot.domain.posts.model.dto.PageRequestDto;
import com.springboot.domain.posts.model.dto.PageResultDto;
import com.springboot.domain.posts.model.dto.PostsDto;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.repository.PostsRepository;
import com.springboot.domain.posts.service.PostsService;
import com.springboot.domain.reply.ReplyControllerTests;
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
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    // 0219 변경 예정. author -> member
    @DisplayName("[Service] Posts 등록 테스트")
    @Transactional
    @Test
    public void testRegister() {

        Member author = memberRepository.findAll().get(0);

        PostsDto dto = PostsDto.builder()
            .ref("Save Test ref.")
            .content("Save Test content...")
            .authorId(author.getId()) //현재 데이터베이스에 존재하는 회원 정보
            .build();

        Long id = service.save(dto);

    }

    // 목록 조회 테스트
//    @Test
//    public void testList() {
//
//        PageRequestDto pageRequestDTO = PageRequestDto.builder()
//            .page(1)
//            .size(10)
//            .build();
//
//        PageRequestDto pageRequestDTO = new PageRequestDto();
//
//        PageResultDto<PostsListResponseDto, Posts> resultDTO = service.getList(pageRequestDTO);
//
//        System.out.println("PREV: " + resultDTO.isPrev());
//        System.out.println("NEXT: " + resultDTO.isNext());
//        System.out.println("TOTAL: " + resultDTO.getTotalPage());
//
//        System.out.println("-------------------------------------");
//        for (PostsListResponseDto postsListResponseDto : resultDTO.getDtoList()) {
//            System.out.println(postsListResponseDto);
//        }
//
//        System.out.println("========================================");
//        resultDTO.getPageList().forEach(i -> System.out.println(i));
//    }

    @DisplayName("[Service] 게시물 목록 조회 ( 게시물 + 작성자 ) 및 페이징 처리")
    @Test
    public void testList() {

        //1페이지 10개
        PageRequestDto pageRequestDTO = new PageRequestDto();

        PageResultDto<PostsDto, Object[]> result = service.getList(pageRequestDTO);

        for (PostsDto postsDTO : result.getDtoList()) {
            System.out.println(postsDTO);
        }

    }

    @DisplayName("[Service] 게시물 조회 ( 게시물 + 작성자 )")
    @Test
    public void testGet() {

        Posts post = postsRepository.findAll().get(0);

        Long id = post.getId();

        logger.info("Post ID :" + id.toString());

        PostsDto postsDto = service.get(id);

        System.out.println(postsDto);
    }

    @DisplayName("[Service] 게시물 삭제 - 댓글과 함께")
    @Test
    @Transactional
    public void testRemove() {

        // given
        Posts post = postsRepository.findAll().get(0);

        Long postsId = post.getId();

        logger.info("Post ID :" + postsId.toString());

        List<ReplyDto> replyDTOList = replyService.getList(postsId);

        for (ReplyDto replydto : replyDTOList) {
            logger.info("replyDTO :" + replydto.toString());
        }

        // when
        Long deletedPostsId = service.removeWithReplies(postsId);

        logger.info("deletedPostsId :" + deletedPostsId.toString());

        Optional<Posts> deletedPosts = postsRepository.findById(deletedPostsId);

        // then
        assertThat(deletedPosts).isEmpty();

        for (ReplyDto replydto : replyDTOList) {
            Optional<Reply> deletedReply = replyRepository.findById(replydto.getId());
            assertThat(deletedReply).isEmpty();
        }
    }

    @DisplayName("[Service] 조건부 목록 조회 페이지네이션 search 테스트 ")
    @Test
    public void testSearch() {

        PageRequestDto pageRequestDTO = new PageRequestDto();
        pageRequestDTO.setPage(1);
        pageRequestDTO.setSize(10);
        pageRequestDTO.setType("c");
        pageRequestDTO.setKeyword("1");

//        Pageable pageable = pageRequestDTO.getPageable(Sort.by("id").descending());

        PageResultDto<PostsDto, Object[]> result = service.getList(pageRequestDTO);

        for (PostsDto postsDto : result.getDtoList()) {
            System.out.println(postsDto);
        }
    }

//
//    // 조건부 목록 조회 테스트
//    @Test
//    public void testSearch() {
//
//        PageRequestDto pageRequestDTO = PageRequestDto.builder()
//            .page(1)
//            .size(10)
//            .type("c")   //검색 조건 t : topic, c : content, a : author
//            .keyword("2")  // 검색 키워드
//            .build();
//
//        PageResultDto<PostsListResponseDto, Posts> resultDTO = service.getList(pageRequestDTO);
//
//        System.out.println("PREV: " + resultDTO.isPrev());
//        System.out.println("NEXT: " + resultDTO.isNext());
//        System.out.println("TOTAL: " + resultDTO.getTotalPage());
//
//        System.out.println("-------------------------------------");
//        for (PostsListResponseDto postsListResponseDto : resultDTO.getDtoList()) {
//            System.out.println(postsListResponseDto);
//        }
//
//        System.out.println("========================================");
//        resultDTO.getPageList().forEach(i -> System.out.println(i));
//    }

}
