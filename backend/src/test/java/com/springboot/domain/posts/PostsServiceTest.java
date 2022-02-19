package com.springboot.domain.posts;

import com.springboot.domain.posts.model.dto.PageRequestDto;
import com.springboot.domain.posts.model.dto.PageResultDto;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.posts.service.PostsService;
import javax.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class PostsServiceTest {

    @Autowired
    private PostsService service;

    // 0219 변경 예정. author -> member
//    // 등록 테스트
//    @Test
//    @Transactional
//    public void testRegister() {
//
//        PostsSaveRequestDto PostsDTO = PostsSaveRequestDto.builder()
//            .ref("Sample Ref...")
//            .content("Sample Content...")
//            .author("user0")
//            .build();
//
//        System.out.println(service.save(PostsDTO));
//
//    }
//
//    // 목록 조회 테스트
//    @Test
//    public void testList() {
//
////        PageRequestDto pageRequestDTO = PageRequestDto.builder()
////            .page(1)
////            .size(10)
////            .build();
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
