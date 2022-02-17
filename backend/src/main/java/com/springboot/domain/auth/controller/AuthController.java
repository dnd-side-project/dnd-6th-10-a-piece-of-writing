package com.springboot.domain.auth.controller;

import com.springboot.domain.auth.model.LoginDto;
import com.springboot.domain.auth.model.SignDto;
import com.springboot.domain.auth.service.AuthService;
import com.springboot.domain.common.model.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import com.springboot.domain.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/v1/auth")
public class AuthController {

    private final MemberService memberService;
    private final AuthService authService;

    @Operation(summary = "login api", description = "로그인 api")
    @PostMapping(value = "/login")
    public ResponseEntity<? extends ResponseDto> login(
            @Valid @RequestBody LoginDto loginDto) {
        return authService.login(loginDto);
    }

    @Operation(summary = "logout api", description = "로그아웃 api")
    @GetMapping(value = "/logout")
    public ResponseEntity<? extends ResponseDto> logout(
            @Parameter(description = "access 토큰", required = true)
            @RequestHeader(value = "X-AUTH_TOKEN", required = true) String accessToken,
            @Parameter(description = "refresh 토큰", required = true)
            @RequestHeader(value = "X-AUTH-REFRESH_TOKEN", required = true) String refreshTokenUuid) {

        return authService.logout(accessToken, refreshTokenUuid);
    }

    @Operation(summary = "reissue api", description = "access 토큰 갱신 api")
    @GetMapping(value = "/reissue")
    public ResponseEntity<? extends ResponseDto> reissue(
            @Parameter(description = "refresh 토큰", required = true)
            @RequestHeader(value = "X-AUTH-REFRESH_TOKEN") String refreshTokenUuid) {
        return authService.reissue(refreshTokenUuid);
    }

    @Operation(summary = "email duplication check api", description = "이메일 중복 확인 api")
    @GetMapping(value = "/email/{email}")
    public ResponseEntity<? extends ResponseDto> checkEmailDuplicate(
            @Parameter(description = "이메일", required = true) @PathVariable String email) {
        return memberService.checkEmailDuplicate(email);
    }

    @Operation(summary = "nickname patch api", description = "닉네임 변경 api \nbody에 변경할 nickname을 함께 전송")
    @GetMapping(value = "/nickname/{nickname}")
    public ResponseEntity<? extends ResponseDto> checkNicknameDuplicate(
            @Parameter(description = "닉네임", required = true) @PathVariable String nickname) {
        return memberService.checkNicknameDuplicate(nickname);
    }

    @Operation(summary = "sign api", description = "회원 가입 api")
    @PostMapping(value = "/sign")
    public ResponseEntity<? extends ResponseDto> sign(
            @Valid @RequestBody SignDto signDto) {
        return authService.sign(signDto);
    }

    @Operation(summary = "withdrawal api", description = "회원 탈퇴 api -- 이메일과 JWT 토큰 모두 보내줘야 함")
    @PostMapping(value = "/withdrawal")
    public ResponseEntity<? extends ResponseDto> withdrawal(
            @Parameter(description = "이메일", required = true)
            @RequestBody String email,
            @Parameter(description = "access 토큰", required = true)
            @RequestHeader(value = "X-AUTH_TOKEN", required = true) String accessToken,
            @Parameter(description = "refresh 토큰", required = true)
            @RequestHeader(value = "X-AUTH-REFRESH_TOKEN", required = true) String refreshTokenUuid) {
        return authService.withdrawal(email, accessToken, refreshTokenUuid);
    }
}