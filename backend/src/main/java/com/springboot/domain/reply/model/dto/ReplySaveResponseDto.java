package com.springboot.domain.reply.model.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.springboot.domain.member.model.Dto.MemberBasicInfoDto;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonInclude(Include.NON_NULL)
public class ReplySaveResponseDto {

    private Long replyId; // 댓글 아이디

    private String text; // 댓글 내용

    private MemberBasicInfoDto replyer;

    private LocalDateTime createdDate;
}
