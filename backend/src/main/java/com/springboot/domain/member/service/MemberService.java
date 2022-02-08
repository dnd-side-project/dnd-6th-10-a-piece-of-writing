package com.springboot.domain.member.service;

import com.springboot.domain.common.error.exception.EntityNotFoundException;
import com.springboot.domain.common.error.exception.ErrorCode;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws EntityNotFoundException {
        return memberRepository.findMemberByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public Optional<Member> findMemberByEmail(String email) {
        return memberRepository.findMemberByEmail(email);
    }

    public void deleteMemberByEmail(Member member) {
        memberRepository.delete(member);
    }

    public Member save(Member member) {
        return memberRepository.save(member);
    }

//    public Member modMemberByUserEmail(Member member) {
//        memberRepository.
//    }
}