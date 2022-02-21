package com.springboot.domain.member.model;

import com.springboot.domain.posts.model.entity.Posts;
import com.springboot.domain.relation.model.Relation;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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
    private List<Relation> follower = new ArrayList<>(); // 내가 팔로우하는 relation

    @OneToMany(mappedBy = "followed", fetch = FetchType.EAGER)
    @Builder.Default
    private List<Relation> followed = new ArrayList<>(); // 나를 팔로우하는 relation

    @OneToMany(mappedBy = "author", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Builder.Default
    private List<Posts> posts = new ArrayList<>(); // 내 글 목록

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "POSTS_ID")
    @Builder.Default
    private List<Posts> likes = new ArrayList<>(); // 좋아요 목록

    public int getFollowCount() { // 내가 팔로우하는 relation의 수
        return follower.size();
    }
    public int getFollowerCount() { // 나를 팔로우하는 relation의 수
        return followed.size();
    }
}