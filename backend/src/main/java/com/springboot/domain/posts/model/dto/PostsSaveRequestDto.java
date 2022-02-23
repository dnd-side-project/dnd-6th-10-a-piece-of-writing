//package com.springboot.domain.posts.model.dto;
//
//import com.springboot.domain.posts.model.entity.Posts;
//import io.swagger.annotations.ApiModelProperty;
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.NotNull;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.springframework.web.multipart.MultipartFile;
//
//@Getter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class PostsSaveRequestDto {
//
//    @NotNull(message = "게시글 내용 text가 누락되었습니다")
//    private String content;
//
//    @NotNull(message = "출저가 누락되었습니다 (공백 입력도 가능)")
//    private String ref;
//}
