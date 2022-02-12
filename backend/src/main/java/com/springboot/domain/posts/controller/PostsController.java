package com.springboot.domain.posts.controller;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.error.exception.BusinessException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.service.ResponseServiceImpl;
import com.springboot.domain.posts.model.dto.PostsListResponseDto;
import com.springboot.domain.posts.model.dto.PostsResponseDto;
import com.springboot.domain.posts.model.dto.PostsSaveRequestDto;
//import com.springboot.domain.posts.model.dto.PostsUpdateRequestDto;
import com.springboot.domain.posts.service.PostsService;
import io.swagger.v3.oas.annotations.Parameter;
import java.io.IOException;
import javax.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import springfox.documentation.annotations.ApiIgnore;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/posts")
public class PostsController {

    private final PostsService postsService;

    private final ResponseServiceImpl responseServiceImpl;

    // 업로드
    @PostMapping
    public Long save(@RequestBody PostsSaveRequestDto requestDto){
        return postsService.save(requestDto);
    }

    // 수정
//    @PutMapping("/posts/{id}")
//    public Long update(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto) {
//        return postsService.update(id, requestDto);
//    }

    // 삭제
    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        postsService.delete(id);
        return id;
    }

    // 1개 검색
    @GetMapping("/{id}")
    public PostsResponseDto findById(@PathVariable Long id){
        return postsService.findById(id);
    }

    // 전체 내림차순 검색
    @GetMapping
    public List<PostsListResponseDto> findAllDesc(){
        return postsService.findAllPostsOrderById();
    }

    @PostMapping(value = "/img-extract", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDto> imageExtract(
            @Parameter(description = "\"file\" = bytes[]", required = true)
            MultipartHttpServletRequest request) {
        MultipartFile file = request.getFile("file");
        if(file == null) throw new BusinessException(ErrorCode.IMAGE_INPUT_INVALID);

        String result = postsService.postsImgExtractWords(file, postsService.getFileUuid());

        return responseServiceImpl.successResult(SuccessCode.EXTRACT_SUCCESS, result);
    }
}
