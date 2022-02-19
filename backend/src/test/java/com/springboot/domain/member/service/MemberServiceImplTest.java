package com.springboot.domain.member.service;

import static org.junit.jupiter.api.Assertions.*;

import com.springboot.domain.common.error.exception.BusinessException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.relation.model.Relation;
import com.springboot.domain.relation.repository.RelationRepository;
import java.util.HashMap;
import java.util.Map;
import javax.transaction.Transactional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MemberServiceImplTest {

    @Autowired
    MemberService memberService;

    @Autowired
    RelationRepository relationRepository;

    @BeforeEach
    @Transactional
    void before() {
        relationRepository.deleteAll();

        String followerNickname02 = "tester02";
        String followedNickname = "tester03";

        Member follower02 = memberService.findMemberByNickname(followerNickname02);
        Member followed = memberService.findMemberByNickname(followedNickname);

        relationRepository.save(Relation.builder().follower(follower02).followed(followed).build());

        relationRepository.save(Relation.builder().follower(followed).followed(follower02).build());

        // 02는 03을 팔로우한다
        // 03 은 02를 맞팔한다
    }

    @AfterEach
    void after() {
        relationRepository.deleteAll();
    }

    @DisplayName("tester03'이' 팔로우하는 유저 리스트 확인")
    @Test
    @Transactional
    void getFollowList() {
        String nickname = "tester03";
        Member member = memberService.findMemberByNickname(nickname);
        Assertions.assertEquals(member.getFollower().get(0).getFollowed().getId(), 2);
    }

    @DisplayName("tester03'을' 팔로우하는 유저 리스트 확인")
    @Test
    @Transactional
    void getFollowerList() {
        String nickname = "tester03";
        Member member = memberService.findMemberByNickname(nickname);
        Assertions.assertEquals(member.getFollowed().get(0).getFollower().getId(), 2);
    }
}