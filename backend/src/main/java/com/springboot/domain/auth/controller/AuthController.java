package com.springboot.domain.auth.controller;

import com.springboot.domain.auth.jwt.JwtUtil;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.common.error.exception.InvalidValueException;
import com.springboot.domain.common.model.RequestDto;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.ResponseService;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.member.model.Member;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import com.springboot.domain.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthController {
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final ResponseService responseService;

    @PostMapping(value = "/login")
    public ResponseEntity<ResponseDto> login(@RequestBody RequestDto requestDto) {
        Member member = (Member) memberService.loadUserByUsername(requestDto.getEmail());

        if(!passwordEncoder.matches(requestDto.getPassword(), member.getPassword())) {
            throw new InvalidValueException(requestDto.getPassword(), ErrorCode.PASSWORD_INVALID);
        }
        String token = JwtUtil.createAuthToken(requestDto.getEmail());
        Map<String, String> body = new HashMap<>();
        body.put("access-token", token);

        return responseService.successResult(SuccessCode.LOGIN_SUCCESS, body);
    }
}