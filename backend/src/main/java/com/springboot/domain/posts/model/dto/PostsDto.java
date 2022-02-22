package com.springboot.domain.posts.model.dto;


import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostsDto {

    // Posts Info
    private Long id;

    private String ref;

    private String content;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    // Author Info
    private Long authorId; //Author id

    private String authorEmail; //Author email

    private String authorNickname; // Author nickname

    private String authorProfileUrl;

    private boolean alreadyLike;
}
