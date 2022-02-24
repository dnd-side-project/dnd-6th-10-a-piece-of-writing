package com.springboot.domain.member.model.Dto;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.reply.model.dto.ReplyDto;
import com.springboot.domain.reply.model.entity.Reply;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberBasicInfoDto {
    private Long id;
    private String nickname;
    private String profileUrl;

    public static MemberBasicInfoDto entityTOdto(Member member){

        MemberBasicInfoDto dto = MemberBasicInfoDto.builder()
            .id(member.getId())
            .nickname(member.getNickname())
            .profileUrl(member.getProfileUrl())
            .build();

        return dto;
    }
}