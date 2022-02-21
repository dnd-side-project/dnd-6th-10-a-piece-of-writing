package com.springboot.domain.member.model.Dto;

import com.springboot.domain.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FollowListDto {
    private Long id;
    private String nickname;
    private String profileUrl;

    public static FollowListDto entityToDto(Member member) {
        return FollowListDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .profileUrl(member.getProfileUrl())
                .build();
    }
}
