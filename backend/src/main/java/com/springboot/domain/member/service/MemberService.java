package com.springboot.domain.member.service;

import com.springboot.domain.common.error.exception.EntityNotFoundException;
import com.springboot.domain.common.error.exception.ErrorCode;
import java.util.Optional;
import javax.transaction.Transactional;
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
        return memberRepository.findMemberByEmail(email);
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findMemberByEmail(email);
    }

    public Member findMemberByNickname(String nickname) {
        return memberRepository.findMemberByNickname(nickname);
    }

    public void deleteMemberByEmail(Member member) {
        memberRepository.delete(member);
    }

    public Member save(Member member) {
        return memberRepository.save(member);
    }

    @Transactional
    public void modMemberNicknameByUserEmail(Member member, String nickname) {
        Member oldMember = memberRepository.findMemberByEmail(member.getEmail());
        System.out.println("--!--");
        System.out.println(nickname);
        if(oldMember != null) {
            oldMember.setNickname(nickname);
        }
    }

    public boolean checkNicknameDuplicate(String nickname) {
        Member member = findMemberByNickname(nickname);
        if(member == null) return false;
        else return true;
    }
}