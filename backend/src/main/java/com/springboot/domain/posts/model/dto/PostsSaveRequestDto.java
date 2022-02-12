package com.springboot.domain.posts.model.dto;

import com.springboot.domain.posts.model.Entity.Posts;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostsSaveRequestDto {

    //    private String title;
    private String content;
    private String author;
    private String ref;

    public Posts toEntity() {
        return Posts.builder()
                .ref(ref)
                .content(content)
                .author(author)
                .build();
    }
}
