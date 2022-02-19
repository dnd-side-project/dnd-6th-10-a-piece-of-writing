package com.springboot.domain.member.model.Dto;

import com.springboot.domain.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberProfileDto {
    private String nickname;
    private String profileUrl;
    private String email;
    private int follow;
    private int follower;
    private boolean alreadyFollow;
}