package com.springboot.domain.member.service;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.error.exception.BusinessException;
import com.springboot.domain.common.error.exception.EntityNotFoundException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.service.ResponseService;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.repository.MemberRepository;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final ResponseService responseService;

    @Override
    public Member findMemberByEmail(String email) {
        return memberRepository.findMemberByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @Override
    public Member findMemberByNickname(String nickname) {
        return memberRepository.findMemberByNickname(nickname)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.ENTITY_NOT_FOUND));
    }

    @Override
    public Member save(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public void deleteMemberByEmail(Member member) {
        memberRepository.delete(member);
    }

    @Override
    @Transactional
    public ResponseEntity<? extends ResponseDto> modMemberNicknameByUserEmail(UserDetailsImpl userDetailsImpl, String nickname) {
        Member existMember = findMemberByEmail(userDetailsImpl.getUsername());
        existMember.setNickname(nickname);

        return responseService.successResult(SuccessCode.MOD_NICKNAME_SUCCESS);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> checkNicknameDuplicate(String nickname) {
        if (memberRepository.findMemberByNickname(nickname).isPresent()) {
            throw new BusinessException(ErrorCode.NICKNAME_DUPLICATION);
        }
        return responseService.successResult(SuccessCode.NICKNAME_DUPLICATION_CHECK_SUCCESS);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> checkEmailDuplicate(String email) {
        if (memberRepository.findMemberByEmail(email).isPresent()) {
            throw new BusinessException(ErrorCode.EMAIL_DUPLICATION);
        }
        return responseService.successResult(SuccessCode.EMAIL_DUPLICATION_CHECK_SUCCESS);
    }

}
