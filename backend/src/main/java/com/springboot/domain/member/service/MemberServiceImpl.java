package com.springboot.domain.member.service;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.error.exception.EntityNotFoundException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    public Member findMemberByEmail(String email) {
        return memberRepository.findMemberByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public Member findMemberByNickname(String nickname) {
        return memberRepository.findMemberByNickname(nickname)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public void deleteMemberByEmail(Member member) {
        memberRepository.delete(member);
    }

    public Member save(Member member) {
        return memberRepository.save(member);
    }

    @Transactional
    public void modMemberNicknameByUserEmail(UserDetailsImpl userDetailsImpl, String nickname) {
        Member existMember = findMemberByEmail(userDetailsImpl.getUsername());
        existMember.setNickname(nickname);
    }

    public boolean checkNicknameDuplicate(String nickname) {
        Optional<Member> member = memberRepository.findMemberByNickname(nickname);
        return member.isPresent();
    }

    public boolean checkEmailDuplicate(String email) {
        Optional<Member> member = memberRepository.findMemberByEmail(email);
        return member.isPresent();
    }
}
