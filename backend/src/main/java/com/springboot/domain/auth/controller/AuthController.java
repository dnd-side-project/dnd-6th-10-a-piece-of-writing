package com.springboot.domain.auth.controller;

import com.springboot.domain.common.model.RequestDto;
import lombok.RequiredArgsConstructor;
import com.springboot.domain.member.repository.MemberRepository;
import com.springboot.domain.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @PostMapping(value = "/login")
    public ResponseEntity login(@RequestBody RequestDto requestDto) {
        String body = memberService.login(requestDto.getEmail(), requestDto.getPassword());

        return ResponseEntity.status(HttpStatus.OK).body(body);
    }
}