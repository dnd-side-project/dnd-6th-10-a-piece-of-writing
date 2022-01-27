package com.springboot.domain.auth.controller;

import com.springboot.domain.auth.jwt.JwtUtil;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.common.error.exception.InvalidValueException;
import com.springboot.domain.common.model.RequestVo;
import com.springboot.domain.common.model.ResponseVo;
import com.springboot.domain.common.model.ResponseServiceImpl;
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
    private final ResponseServiceImpl responseServiceImpl;
    private final JwtUtil jwtUtil;

    @PostMapping(value = "/login")
    public ResponseEntity<ResponseVo> login(@RequestBody RequestVo requestVo) {
        Member member = (Member) memberService.loadUserByUsername(requestVo.getEmail());

        if (!passwordEncoder.matches(requestVo.getPassword(), member.getPassword())) {
            throw new InvalidValueException(requestVo.getPassword(), ErrorCode.PASSWORD_INVALID);
        }
        String token = jwtUtil.createAuthToken(requestVo.getEmail());
        Map<String, String> body = new HashMap<>();
        body.put("access-token", token);

        return responseServiceImpl.successResult(SuccessCode.LOGIN_SUCCESS, body);
    }
}