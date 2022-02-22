package com.springboot.domain.member.model.Dto;

import com.springboot.domain.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FollowInfoDto {
    private Long id;
    private String nickname;
    private String profileUrl;

    public static FollowInfoDto entityToDto(Member member) {
        return FollowInfoDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .profileUrl(member.getProfileUrl())
                .build();
    }
}
