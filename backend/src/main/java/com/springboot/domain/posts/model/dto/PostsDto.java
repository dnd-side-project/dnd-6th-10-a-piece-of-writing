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

    private LocalDateTime regDate;

    private LocalDateTime modDate;

    // Author Info
    private Long authorId; //Author id

    private String authorEmail; //Author email

    private String authorNickname; // Author nickname

    // Reply Info
    private Long replyId; // reply id

    private String text; // reply text

    // Reply - Replyer Info
    private Long replyerId; // replyer id

    private String replyerEmail; // replyer email

    private String replyerNickname; // replyer nickname

}
