package com.springboot.domain.posts.model.dto;

import com.springboot.domain.posts.model.Posts;
import lombok.Getter;

@Getter
public class PostsResponseDto {

    private Long id;
    private String ref;
    private String content;
    private String author;

    public PostsResponseDto(Posts entity){
        this.id = entity.getId();
        this.ref = entity.getRef();
        this.content = entity.getContent();
        this.author = entity.getAuthor();
    }
}
