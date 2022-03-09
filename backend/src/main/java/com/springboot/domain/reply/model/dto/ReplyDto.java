package com.springboot.domain.reply.model.dto;


import com.springboot.domain.member.model.Dto.MemberBasicInfoDto;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReplyDto {

    private Long replyId; // 댓글 아이디

    private String text; // 댓글 내용

    private MemberBasicInfoDto replyer; // 댓글 작성자 정보

    private Long postsId;  //게시글 번호

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;
}
