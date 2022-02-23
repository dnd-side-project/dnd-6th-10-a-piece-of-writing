package com.springboot.domain.relation.service;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.dto.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.service.ResponseService;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.service.MemberService;
import com.springboot.domain.relation.model.Relation;
import com.springboot.domain.relation.repository.RelationRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Transactional
@Service
public class RelationServiceImpl implements RelationService {

    private final RelationRepository relationRepository;
    private final ResponseService responseService;
    private final MemberService memberService;

    @Override
    public ResponseEntity<? extends ResponseDto> createRelation(UserDetailsImpl userDetails,
            Long id) {
        Member follower = memberService.findMemberById(userDetails.getMember().getId());
        Member followed = memberService.findMemberById(id);
        relationRepository.save(Relation.builder().follower(follower).followed(followed).build());
        return responseService.successResult(SuccessCode.FOLLOW_SUCCESS);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> deleteRelation(UserDetailsImpl userDetails,
            Long id) {
        Member follower = memberService.findMemberById(userDetails.getMember().getId());
        Member followed = memberService.findMemberById(id);
        relationRepository.deleteRelationByFollowedAndFollower(followed, follower);
        return responseService.successResult(SuccessCode.UNFOLLOW_SUCCESS);
    }
}
