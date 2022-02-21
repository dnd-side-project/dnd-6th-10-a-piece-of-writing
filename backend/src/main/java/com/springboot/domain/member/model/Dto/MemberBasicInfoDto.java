package com.springboot.domain.member.model.Dto;

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
}
