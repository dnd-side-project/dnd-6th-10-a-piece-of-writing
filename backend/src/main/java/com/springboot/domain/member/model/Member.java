package com.springboot.domain.member.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.springboot.domain.auth.Authority;
import lombok.Setter;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Entity
public class Member{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    @Builder.Default
    @Setter
    private String nickname = "닉네임을 설정해주세요";

    @Column(nullable = true)
    @Builder.Default
    private String profileUrl = "<basic img url>";

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Builder.Default
    private String authority = Authority.ROLE_USER;

    // temp follow
    @Builder.Default
    private int follow=0;

    @Builder.Default
    private int follower=0;
}