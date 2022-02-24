package com.springboot.domain.member.model.Dto;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.relation.model.Relation;
import java.util.stream.Collectors;
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
    private Long id;
    private String nickname;
    private String profileUrl;
    private String email;
    private int postsCount;
    private int followingCount;
    private int followerCount;

    public static MemberProfileDto memberToDto(Member member) {
        return MemberProfileDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .profileUrl(member.getProfileUrl())
                .email(member.getEmail())
                .postsCount(member.getPostsCount())
                .followingCount(member.getFollowingCount())
                .followerCount(member.getFollowerCount())
                .build();
    }
}