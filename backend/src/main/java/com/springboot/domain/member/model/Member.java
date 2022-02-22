package com.springboot.domain.member.model;

import com.springboot.domain.likes.model.Likes;
import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.relation.model.Relation;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.springboot.domain.auth.Authority;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Setter
    private String nickname;

    @Builder.Default
    @Setter
    private String profileUrl = null;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Builder.Default
    private String authority = Authority.ROLE_USER;

    @OneToMany(mappedBy = "follower", fetch = FetchType.EAGER)
    @Builder.Default
    private Set<Relation> followerList = new HashSet<>(); // 내가 팔로우하는 relation

    @OneToMany(mappedBy = "followed", fetch = FetchType.EAGER)
    @Builder.Default
    private Set<Relation> followedList = new HashSet<>(); // 나를 팔로우하는 relation

    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER)
    @Builder.Default
    private Set<Posts> postsList = new HashSet<>(); // 내 글 목록

    @OneToMany(mappedBy = "posts", fetch = FetchType.EAGER)
    @Builder.Default
    private Set<Likes> likePostsList = new HashSet<>(); // 좋아요 글 목록

    public int getFollowCount() { // 내가 팔로우하는 relation의 수
        return followerList.size();
    }
    public int getFollowerCount() { // 나를 팔로우하는 relation의 수
        return followedList.size();
    }
}