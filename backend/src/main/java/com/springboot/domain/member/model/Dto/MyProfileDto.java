package com.springboot.domain.member.model.Dto;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.relation.model.Relation;
import java.util.List;
import java.util.stream.Collectors;
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
    private int postsCount;
    private int followerCount;
    private List<MemberProfileDto> followings;

    public static MyProfileDto memberToDto(Member member) {
        return MyProfileDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .profileUrl(member.getProfileUrl())
                .email(member.getEmail())
                .postsCount(member.getPostsCount())
                .followerCount(member.getFollowerCount())
                .followings(member.getFollowingList().stream().map(R -> MemberProfileDto.memberToDto(R.getFollowed())).collect(
                        Collectors.toList()))
                .build();
    }
}
