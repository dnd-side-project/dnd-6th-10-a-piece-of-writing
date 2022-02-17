package com.springboot.domain.member.service;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.ResponseDto;
import javax.transaction.Transactional;
import com.springboot.domain.member.model.Member;
import org.springframework.http.ResponseEntity;

public interface MemberService {
    public Member findMemberByEmail(String email);

    public Member findMemberByNickname(String nickname);

    public void deleteMemberByEmail(Member member);

    public Member save(Member member);

    public ResponseEntity<? extends ResponseDto> modMemberNicknameByUserEmail(UserDetailsImpl userDetailsImpl, String nickname);

    public ResponseEntity<? extends ResponseDto> checkNicknameDuplicate(String nickname);

    public ResponseEntity<? extends ResponseDto> checkEmailDuplicate(String email);
}