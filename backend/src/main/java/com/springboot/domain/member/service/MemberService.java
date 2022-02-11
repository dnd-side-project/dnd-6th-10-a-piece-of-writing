package com.springboot.domain.member.service;

import com.springboot.domain.auth.model.UserDetailsImpl;
import javax.transaction.Transactional;
import com.springboot.domain.member.model.Member;

public interface MemberService {
    public Member findMemberByEmail(String email);

    public Member findMemberByNickname(String nickname);

    public void deleteMemberByEmail(Member member);

    public Member save(Member member);

    @Transactional
    public void modMemberNicknameByUserEmail(UserDetailsImpl userDetailsImpl, String nickname);

    public boolean checkNicknameDuplicate(String nickname);

    public boolean checkEmailDuplicate(String email);
}