package com.springboot.domain.posts.model.dto;

//import com.springboot.domain.posts.model.entity.Posts;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

//@Getter
//public class PostsListResponseDto {
//
//    private Long id;
//    private String ref;
//    private String author;
////    private LocalDateTime modifiedDate;
//    private String content;
//
//    public PostsListResponseDto(Posts entity) {
//        this.id = entity.getId();
//        this.ref = entity.getRef();
//        this.author = entity.getAuthor();
////        this.modifiedDate = entity.getModifiedDate();
//        this.content = entity.getContent();
//    }
//}

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostsListResponseDto {

    private Long id;
    private String ref;
    private String author;
    private LocalDateTime createdDate, modifiedDate;
    private String content;

//    public PostsListResponseDto(Posts entity) {
//        this.id = entity.getId();
//        this.ref = entity.getRef();
//        this.author = entity.getAuthor();
////        this.modifiedDate = entity.getModifiedDate();
//        this.content = entity.getContent();
//    }
}