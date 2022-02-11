package com.springboot.domain.posts.model.dto;

import com.springboot.domain.posts.model.Posts;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostsListResponseDto {

    private Long id;
    private String ref;
    private String author;
    private LocalDateTime modifiedDate;
    private String content;

    public PostsListResponseDto(Posts entity) {
        this.id = entity.getId();
        this.ref = entity.getRef();
        this.author = entity.getAuthor();
        this.modifiedDate = entity.getModifiedDate();
        this.content = entity.getContent();
    }
}
