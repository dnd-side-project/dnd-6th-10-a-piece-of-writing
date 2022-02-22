package com.springboot.domain.posts.model.entity;


import com.springboot.domain.likes.model.Likes;
import com.springboot.domain.member.model.Dto.MemberBasicInfoDto;
import com.springboot.domain.member.model.Member;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.reply.model.entity.Reply;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = "author")
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

    @OneToMany(mappedBy = "posts", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Likes> likeMemberList = new HashSet<>(); // 좋아요 누른 멤버 목록

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
