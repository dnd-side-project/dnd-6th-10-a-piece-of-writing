package com.springboot.domain.posts.controller;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.dto.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.service.ResponseServiceImpl;
import com.springboot.domain.posts.model.dto.PostsDto;
import com.springboot.domain.posts.model.dto.MultipartDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
import com.springboot.domain.posts.model.dto.PostsSaveResponseDto;
import com.springboot.domain.posts.service.PostsService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/posts")
public class PostsController {

    private final PostsService postsService;

    private final ResponseServiceImpl responseServiceImpl;

    // 업로드
    @Operation(summary = "save posts api", description = "글귀 업로드 api")
    @PostMapping
    public ResponseEntity<ResponseDto> save(
        @RequestPart("request") PostsSaveRequestDto requestDto, MultipartDto multipartDto) {
//            @RequestPart("request") PostsDto requestDto, MultipartDto multipartDto) {
//        Long savedPostId = postsService.register(requestDto, multipartDto);
        PostsSaveResponseDto savedPostResponseDto = postsService.register(requestDto, multipartDto);
//        return responseServiceImpl.successResult(SuccessCode.SAVE_POSTS_SUCCESS, savedPostId);
        return responseServiceImpl.successResult(SuccessCode.SAVE_POSTS_SUCCESS,
            savedPostResponseDto);
    }

    // 삭제
    @Operation(summary = "delete posts api", description = "글귀 삭제 api")
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto> delete(@PathVariable Long id,
        @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {

        Long DeletedPostId = postsService.removePosts(id, userDetailsImpl);

        return responseServiceImpl.successResult(SuccessCode.DELETE_POSTS_SUCCESS, DeletedPostId);
    }

    // 게시물 1개 조회
    @Operation(summary = "select posts api", description = "글귀 검색 api")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDto> findPosts(@PathVariable long id,
        @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {

        PostsDto postsDto = postsService.get(id, userDetailsImpl);

        return responseServiceImpl.successResult(SuccessCode.SELECT_POSTS_SUCCESS, postsDto);
    }

    @ApiOperation(
        value = "토픽별 게시물 초기 4개 이하 조회 api"
        , notes = "topicId의 토픽을 가진 게시물 목록 중 4개 이하만 최신순으로 반환한다.")
    @ApiImplicitParam(
        name = "topicId"
        , value = "토픽 아이디"
        , required = true
        , dataType = "long"
        , paramType = "path"
        , defaultValue = "None")
    @GetMapping("/topic/first/{topicId}")
    public ResponseEntity<ResponseDto> searchPostsFirstByTopicId(@PathVariable Long topicId,
        @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {

        List<PostsDto> postsDtos = postsService.getFirstPostsByTopicOrderByIdDesc(topicId,
            userDetailsImpl);

        return responseServiceImpl.successResult(SuccessCode.SELECT_FIRST_POSTS_BY_TOPIC_SUCCESS,
            postsDtos);
    }

    // 전체 게시물 최신순 내림차순 조회
    @ApiOperation(
        value = "모든 글귀 검색 api."
        , notes = "request 받은 페이지 기준으로 메인 화면에서 글귀를 최신 순으로 페이지당 size개씩 조회. type = p 일 때, 모든 게시물 조회 기능 제공. type = t일 때, 주어진 topicId에 따른 토픽별 게시물 조회 기능 제공")
    @ApiImplicitParams(
        {
            @ApiImplicitParam(
                name = "page"
                , value = "페이지 번호"
                , required = true
                , dataType = "int"
                , paramType = "query"
                , defaultValue = "None"),
            @ApiImplicitParam(
                name = "size"
                , value = "사이즈 크기"
                , required = true
                , dataType = "int"
                , paramType = "query"
                , defaultValue = "None"),
            @ApiImplicitParam(
                name = "type"
                , value = "유형"
                , required = true
                , dataType = "string"
                , paramType = "query"
                , defaultValue = "None"),
            @ApiImplicitParam(
                name = "topicId"
                , value = "토픽 아이디"
                , required = true
                , dataType = "long"
                , paramType = "query"
                , defaultValue = "None")
        }
    )
    @GetMapping("/list")
    public ResponseEntity<ResponseDto> findAllPostsOrderByIdDesc(@RequestParam int page,
        @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
        @RequestParam int size, @RequestParam String type, @RequestParam Long topicId) {

//        List<PostsDto> posts = postsService.findAllPostsOrderByIdDesc(page, size, userDetailsImpl);
        List<PostsDto> posts = postsService.findAllPostsOrderByIdDesc(page, size, type, topicId,
            userDetailsImpl);

        return responseServiceImpl.successResult(SuccessCode.SELECT_ALL_POSTS_SUCCESS, posts);
    }

    // 검색된 게시물 최신순 내림차순 조회
    @Operation(summary = "search posts api", description = "검색된 type(c=posts_content, a=posts_author_nickname, t=topic_name)과 keyword를 포함한 게시물 조회 api. 검색 화면에서 글귀를 최신 순으로 페이지당 size개씩 조회.")
    @GetMapping("/search")
    public ResponseEntity<ResponseDto> findAllPostsBySearch(@RequestParam int page,
        @RequestParam int size, @RequestParam String type, @RequestParam String keyword,
        @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {

        List<PostsDto> posts = postsService.findAllPostsBySearch(page, size, keyword, type,
            userDetailsImpl);

        return responseServiceImpl.successResult(
            SuccessCode.SELECT_POSTS_SEARCH_SUCCESS, posts);
    }

    @ApiOperation(value = "이미지 텍스트 추출 api", notes = "이미지를 전송해 텍스트를 추출한다.")
    @PostMapping(value = "/img-extract", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDto> imageExtract(@Valid MultipartDto multipartDto) {
        MultipartFile file = multipartDto.getFile();

        String imageUrl = postsService.postsImgUpload(file, postsService.getFileUuid());
        String result = postsService.postsImgExtractWords(file, imageUrl);

        return responseServiceImpl.successResult(SuccessCode.EXTRACT_SUCCESS, result);
    }

    @ApiOperation(value = "게시글 좋아요 api", notes = "id는 게시글의 아이디이다.")
    @GetMapping(value = "/like/{id}")
    public ResponseEntity<ResponseDto> likePost(@PathVariable("id") Long id,
        @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
        return postsService.likePost(userDetailsImpl, id);
    }

    @ApiOperation(value = "게시글 좋아요 취소 api", notes = "id는 게시글의 아이디이다.")
    @DeleteMapping(value = "/like/{id}")
    public ResponseEntity<ResponseDto> disLikePost(@PathVariable("id") Long id,
        @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl) {
        return postsService.disLikePost(userDetailsImpl, id);
    }
}
