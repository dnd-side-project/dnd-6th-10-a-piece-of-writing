package com.springboot.domain.posts.model.dto;

import com.springboot.domain.posts.model.Posts;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsSaveRequestDto {
//    private String title;
    private String content;
    private String author;
    private String ref;

//    @Builder
//    public PostsSaveRequestDto(String title, String content, String author){
//        this.title=title;
//        this.content=content;
//        this.author=author;
//    }

    @Builder
    public PostsSaveRequestDto(String ref, String content, String author){
        this.ref=ref;
        this.content=content;
        this.author=author;
    }

//    public Posts toEntity(){
//        return Posts.builder()
//                .title(title)
//                .content(content)
//                .author(author)
//                .build();
//    }

    public Posts toEntity(){
        return Posts.builder()
                .ref(ref)
                .content(content)
                .author(author)
                .build();
    }
}
