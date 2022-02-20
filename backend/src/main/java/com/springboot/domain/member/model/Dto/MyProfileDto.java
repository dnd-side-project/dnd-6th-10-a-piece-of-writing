package com.springboot.domain.member.model.Dto;

import com.springboot.domain.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MyProfileDto {
    private Long id;
    private String nickname;
    private String profileUrl;
    private String email;

    public static MyProfileDto memberToDto(Member member) {
        return MyProfileDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .profileUrl(member.getProfileUrl())
                .email(member.getEmail())
                .build();
    }
}
