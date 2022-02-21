package com.springboot.domain.reply.model.dto;


import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReplyDto {

    private Long id; // 댓글 아이디

    private String text; // 댓글 내용

    private Long replyerId; // 댓글 작성자 아이디

    private String replyerNickname; // 댓글 작성자 닉네임

    private String replyerEmail; // 댓글 작성자 이메일

    private Long postsId;  //게시글 번호

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;
}
