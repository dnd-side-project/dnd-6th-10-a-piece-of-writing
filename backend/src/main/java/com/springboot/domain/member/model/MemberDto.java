package com.springboot.domain.member.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {

    private Long memberId;
    private String nickname;
    private String profileUrl;
    private String email;
    private String password;
    private String authority;
}