package com.springboot.domain.relation.service;

import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.service.MemberService;
import com.springboot.domain.relation.model.Relation;
import com.springboot.domain.relation.repository.RelationRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RelationServiceImplTest {

    @Autowired
    MemberService memberService;

    @Autowired
    RelationRepository relationRepository;

    @DisplayName("팔로우 관계 추가 테스트")
    @Transactional
    @Test
    void createRelationTest() {
        relationRepository.deleteAll();

        String followerNickname01 = "tester01";
        String followerNickname02 = "tester02";
        String followedNickname = "tester03";

        Member follower01 = memberService.findMemberByNickname(followerNickname01);
        Member follower02 = memberService.findMemberByNickname(followerNickname02);
        Member followed = memberService.findMemberByNickname(followedNickname);

        relationRepository.save(Relation.builder().follower(follower01).followed(followed).build());
        relationRepository.save(Relation.builder().follower(follower02).followed(followed).build());

        relationRepository.save(Relation.builder().follower(followed).followed(follower02).build());

        // 01 과 02는 03을 팔로우한다
        // 03 은 02를 맞팔한다

        Assertions.assertEquals(followed.getFollowerCount(), 2);
        Assertions.assertEquals(followed.getFollowCount(), 1);
    }
}