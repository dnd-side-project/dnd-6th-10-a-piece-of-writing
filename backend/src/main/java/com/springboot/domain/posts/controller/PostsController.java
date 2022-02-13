package com.springboot.domain.posts.controller;

import com.google.auth.oauth2.GoogleCredentials;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.service.ResponseServiceImpl;
import com.springboot.domain.posts.model.dto.ExtractWordDto;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
import com.springboot.domain.posts.service.PostsService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/posts")
public class PostsController {

    private final PostsService postsService;

    private final ResponseServiceImpl responseServiceImpl;

    // 업로드
    @PostMapping
    public ResponseEntity<ResponseDto> save(@RequestBody PostsSaveRequestDto requestDto) {

        Long savedPostId = postsService.save(requestDto);

        return responseServiceImpl.successResult(SuccessCode.SAVE_POSTS_SUCCESS,savedPostId);
    }

    // 수정
//    @PutMapping("/posts/{id}")
//    public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto) {
//        return postsService.update(id, requestDto);
//    }

    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto> delete(@PathVariable Long id) {

        Long DeletedPostId = postsService.delete(id);

        return responseServiceImpl.successResult(SuccessCode.DELETE_POSTS_SUCCESS,DeletedPostId);
    }

    // 1개 검색
    @GetMapping("/{id}")
    public PostsResponseDto findById(@PathVariable Long id) {
        return postsService.findById(id);
    }

    // 전체 내림차순 검색
    @GetMapping
    public List<PostsListResponseDto> findAllDesc() {
        return postsService.findAllPostsOrderById();
    }

    @ApiOperation(value = "이미지 텍스트 추출", notes = "이미지를 전송해 텍스트를 추출한다.")
    @PostMapping(value = "/img-extract", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDto> imageExtract(ExtractWordDto extractWordDto) {
        MultipartFile file = extractWordDto.getFile();

        GoogleCredentials credentials = postsService.getCredentials();
        String imageUrl = postsService.postsImgUpload(credentials, file, postsService.getFileUuid());
        String result = postsService.postsImgExtractWords(credentials, file, imageUrl);

        return responseServiceImpl.successResult(SuccessCode.EXTRACT_SUCCESS, result);
    }
}
