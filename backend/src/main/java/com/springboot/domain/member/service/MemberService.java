package com.springboot.domain.member.service;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.member.model.Dto.ModProfileDto;
import com.springboot.domain.member.model.Member;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    public Member findMemberById(Long id);

    public Member findMemberByEmail(String email);

    public Member findMemberByNickname(String nickname);

    public void deleteMemberByEmail(Member member);

    public Member save(Member member);

    public ResponseEntity<? extends ResponseDto> modNickname(UserDetailsImpl userDetailsImpl,
            String nickname);

    public ResponseEntity<? extends ResponseDto> checkNicknameDuplicate(String nickname);

    public ResponseEntity<? extends ResponseDto> checkEmailDuplicate(String email);

    public String profileImgUpload(MultipartFile multipartFile, String id);

    public ResponseEntity<? extends ResponseDto> modProfile(ModProfileDto modProfileDto,
            UserDetailsImpl userDetailsImpl);

    public ResponseEntity<? extends ResponseDto> getMyProfile(UserDetailsImpl userDetailsImpl);

    public ResponseEntity<? extends ResponseDto> getMemberProfile(UserDetailsImpl userDetailsImpl, String nickname);

    public ResponseEntity<? extends ResponseDto> getFollowList(String nickname);

    public ResponseEntity<? extends ResponseDto> getFollowerList(String nickname);
}