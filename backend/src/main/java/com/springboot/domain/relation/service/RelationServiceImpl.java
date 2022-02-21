package com.springboot.domain.relation.service;

import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.service.ResponseService;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.service.MemberService;
import com.springboot.domain.relation.model.Relation;
import com.springboot.domain.relation.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RelationServiceImpl implements RelationService{

    private final RelationRepository relationRepository;
    private final ResponseService responseService;
    private final MemberService memberService;

    @Override
    public ResponseEntity<? extends ResponseDto> createRelation(String followerNickname, String followedNickname) {
        Member follower = memberService.findMemberByNickname(followerNickname);
        Member followed = memberService.findMemberByNickname(followedNickname);
        relationRepository.save(Relation.builder().follower(follower).followed(followed).build());
        return responseService.successResult(SuccessCode.FOLLOW_SUCCESS);
    }
}
