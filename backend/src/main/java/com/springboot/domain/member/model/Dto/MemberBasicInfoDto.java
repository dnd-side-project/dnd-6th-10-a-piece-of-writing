package com.springboot.domain.member.model.Dto;

import javax.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class MemberBasicInfoDto {
    private Long id;
    private String nickname;
    private String profileUrl;
}
