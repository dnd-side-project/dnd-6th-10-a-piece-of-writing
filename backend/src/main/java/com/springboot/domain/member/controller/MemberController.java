package com.springboot.domain.member.controller;

import com.springboot.domain.common.annotation.AuthUser;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.ResponseServiceImpl;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.model.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/member")
public class MemberController {

    private final ResponseServiceImpl responseServiceImpl;

    @PreAuthorize("hasAnyAuthority('ROLE_USER')")
    @GetMapping(value = "/user")
    public Authentication getUserSecurityInfo() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

//    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
//    @GetMapping(value = "/admin")
//    public Authentication getAdminSecurityInfo() {
//        return SecurityContextHolder.getContext().getAuthentication();
//    }

    @PatchMapping(value = "/nickname")
    public ResponseEntity<ResponseDto> modNickname(@AuthUser Member member,
            @RequestBody MemberDto memberDto) {



        return responseServiceImpl.successResult(SuccessCode.MOD_NICKNAME_SUCCESS);
    }
}