package com.springboot.domain.auth.controller;

import com.springboot.domain.auth.model.LoginDto;
import com.springboot.domain.auth.model.SignDto;
import com.springboot.domain.auth.model.UserDetailsImpl;
import com.springboot.domain.auth.service.AuthService;
import com.springboot.domain.common.model.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.springboot.domain.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/auth")
public class AuthController {
    private final MemberService memberService;
    private final AuthService authService;

    @Operation(summary = "로그인 api", description = "로그인 api")
    @PostMapping(value = "/login")
    public ResponseEntity<? extends ResponseDto> login(
            @Valid @RequestBody LoginDto loginDto) {
        return authService.login(loginDto);
    }

    @Operation(summary = "로그아웃 api", description = "로그아웃 api")
    @GetMapping(value = "/logout")
    public ResponseEntity<? extends ResponseDto> logout(
            @Parameter(description = "access 토큰", required = true)
            @RequestHeader(value = "X-AUTH_TOKEN", required = true) String accessToken,
            @Parameter(description = "refresh 토큰", required = true)
            @RequestHeader(value = "X-AUTH-REFRESH_TOKEN", required = true) String refreshTokenUuid) {

        return authService.logout(accessToken, refreshTokenUuid);
    }

    @Operation(summary = "access 토큰 갱신 api", description = "access 토큰 갱신 api")
    @GetMapping(value = "/reissue")
    public ResponseEntity<? extends ResponseDto> reissue(
            @Parameter(description = "refresh 토큰", required = true)
            @RequestHeader(value = "X-AUTH-REFRESH_TOKEN") String refreshTokenUuid) {
        return authService.reissue(refreshTokenUuid);
    }

    @Operation(summary = "이메일 중복 검사 api", description = "이메일 중복 검사 api")
    @GetMapping(value = "/email/{email}")
    public ResponseEntity<? extends ResponseDto> checkEmailDuplicate(
            @Parameter(description = "이메일", required = true) @PathVariable String email) {
        return memberService.checkEmailDuplicate(email);
    }

    @Operation(summary = "닉네임 중복 검사 api", description = "닉네임 중복 검사 api")
    @GetMapping(value = "/nickname/{nickname}")
    public ResponseEntity<? extends ResponseDto> checkNicknameDuplicate(
            @Parameter(description = "닉네임", required = true) @PathVariable String nickname) {
        return memberService.checkNicknameDuplicate(nickname);
    }

    @Operation(summary = "회원 가입 api", description = "회원 가입 api")
    @PostMapping(value = "/sign")
    public ResponseEntity<? extends ResponseDto> sign(
            @Valid @RequestBody SignDto signDto) {
        return authService.sign(signDto);
    }

    @Operation(summary = "회원 탈퇴 api", description = "회원 탈퇴 api")
    @PostMapping(value = "/withdrawal")
    public ResponseEntity<? extends ResponseDto> withdrawal(
            @ApiIgnore @AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
            @Parameter(description = "access 토큰", required = true)
            @RequestHeader(value = "X-AUTH_TOKEN", required = true) String accessToken,
            @Parameter(description = "refresh 토큰", required = true)
            @RequestHeader(value = "X-AUTH-REFRESH_TOKEN", required = true) String refreshTokenUuid) {
        return authService.withdrawal(userDetailsImpl, accessToken, refreshTokenUuid);
    }
}