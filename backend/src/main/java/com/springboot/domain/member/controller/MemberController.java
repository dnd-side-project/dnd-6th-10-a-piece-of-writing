package com.springboot.domain.member.controller;

import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.common.error.exception.BusinessException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.service.ResponseServiceImpl;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/member")
public class MemberController {

    private final ResponseServiceImpl responseServiceImpl;
    private final MemberService memberService;

    @PreAuthorize("hasAnyAuthority('ROLE_USER')")
    @GetMapping(value = "/user")
    public Authentication getUserSecurityInfo() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Operation(summary = "nickname patch api", description = "닉네임 변경 api \nbody에 변경할 nickname을 함께 전송")
    @PatchMapping(value = "/nickname")
    public ResponseEntity<ResponseDto> modNickname(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @RequestBody HashMap<String, String> data) {

        String nickname = data.get("nickname");

        if(nickname.isEmpty()) {
            throw new BusinessException(ErrorCode.NICKNAME_MISSING);
        }
        if(memberService.checkNicknameDuplicate(nickname)) {
            throw new BusinessException(ErrorCode.NICKNAME_DUPLICATION);
        }

        memberService.modMemberNicknameByUserEmail(userDetailsImpl, nickname);

        return responseServiceImpl.successResult(SuccessCode.MOD_NICKNAME_SUCCESS);
    }
}