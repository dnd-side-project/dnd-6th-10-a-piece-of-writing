package com.springboot.domain.posts.model.entity;


import com.springboot.domain.member.model.Dto.MemberBasicInfoDto;
import com.springboot.domain.member.model.Member;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Posts extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String ref;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String imageUrl;

    @ManyToOne
    private Member author;

    @OneToMany(targetEntity = Member.class, fetch = FetchType.EAGER, orphanRemoval = true)
    @CollectionTable(name = "like_member")
    @Builder.Default
    private Set<Member> likeMemberList = new HashSet<>();

    public int getLikeMemberListSize() {
        return likeMemberList.size();
    }

    public MemberBasicInfoDto getMemberBasicInfo() {
        return MemberBasicInfoDto.builder()
                .id(author.getId())
                .nickname(author.getNickname())
                .profileUrl(author.getProfileUrl())
                .build();
    }
}
