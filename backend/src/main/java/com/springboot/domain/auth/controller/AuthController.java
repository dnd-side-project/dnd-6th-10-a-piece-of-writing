package com.springboot.domain.auth.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.springboot.domain.auth.jwt.JwtUtil;
import com.springboot.domain.auth.model.MemberInfoDto;
import com.springboot.domain.common.error.ErrorResponse;
import com.springboot.domain.common.error.exception.BusinessException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.common.error.exception.InvalidValueException;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.ResponseServiceImpl;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.member.model.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.springboot.domain.member.service.MemberService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final ResponseServiceImpl responseServiceImpl;
    private final JwtUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private final ValueOperations<String, String> valueOperations;

    @Operation(summary = "login api", description = "로그인 api")
    @PostMapping(value = "/login")
    public ResponseEntity<ResponseDto> login(
            @Valid @RequestBody MemberInfoDto memberInfoDto) {
        Member member = (Member) memberService.loadUserByUsername(memberInfoDto.getEmail());

        if (!passwordEncoder.matches(memberInfoDto.getPassword(), member.getPassword())) {
            throw new InvalidValueException(ErrorCode.PASSWORD_INPUT_INVALID.getMessage(),
                    ErrorCode.PASSWORD_INPUT_INVALID);
        }

        return responseServiceImpl.successResult(SuccessCode.LOGIN_SUCCESS,
                jwtUtil.issueJwtTokenBody(member.getEmail()));
    }

    @Operation(summary = "logout api", description = "로그아웃 api")
    @GetMapping(value = "/logout")
    public ResponseEntity<ResponseDto> logout(
            @Parameter(description = "access 토큰", required = true)
            @RequestHeader(value = "X-AUTH_TOKEN") String accessToken,
            @Parameter(description = "refresh 토큰", required = true)
            @RequestHeader(value = "X-AUTH-REFRESH_TOKEN") String refreshTokenUuid) {

        if (accessToken.isEmpty() || refreshTokenUuid.isEmpty()) {
            throw new InvalidValueException(ErrorCode.HEADER_MISSING_ERROR.getMessage(),
                    ErrorCode.HEADER_MISSING_ERROR);
        }

        valueOperations.set(accessToken, accessToken, jwtUtil.getAUTH_TIME(),
                TimeUnit.MILLISECONDS);
        redisTemplate.delete(refreshTokenUuid);

        return responseServiceImpl.successResult(SuccessCode.LOGOUT_SUCCESS);
    }

    @Operation(summary = "reissue api", description = "access 토큰 갱신 api")
    @GetMapping(value = "/reissue")
    public ResponseEntity<?> reissue(
            @Parameter(description = "refresh 토큰", required = true)
            @RequestHeader(value = "X-AUTH-REFRESH_TOKEN") String refreshTokenUuid) {

        if (refreshTokenUuid.isEmpty()) {
            throw new InvalidValueException(ErrorCode.HEADER_MISSING_ERROR.getMessage(),
                    ErrorCode.HEADER_MISSING_ERROR);
        }

        String refreshToken = valueOperations.get(refreshTokenUuid);

        if (refreshToken != null) {
            DecodedJWT verifiedToken = JWT.require(jwtUtil.getAlgorithm()).build()
                    .verify(refreshToken);
            String accessToken = jwtUtil.createAuthToken(verifiedToken.getSubject());

            Map<String, String> body = new HashMap<>();
            body.put("access-token", accessToken);

            return responseServiceImpl.successResult(SuccessCode.REISSUE_SUCCESS, body);
        }

        redisTemplate.delete(refreshTokenUuid);
        return new ResponseEntity<>(ErrorResponse.of(ErrorCode.EXPIRED_REFRESH_TOKEN),
                HttpStatus.valueOf(ErrorCode.EXPIRED_REFRESH_TOKEN.getStatus()));
    }

    @Operation(summary = "sign api", description = "회원 가입 api")
    @PostMapping(value = "/sign")
    public ResponseEntity<?> sign(
            @Valid @RequestBody MemberInfoDto memberInfoDto) {
        Member member = memberService.findMemberByEmail(memberInfoDto.getEmail());

        if (member != null) {
            throw new BusinessException(ErrorCode.EMAIL_DUPLICATION);
        }

        String password = passwordEncoder.encode(memberInfoDto.getPassword());
        Member newMember = Member.builder().email(memberInfoDto.getEmail()).password(password)
                .build();

        memberService.save(newMember);

        return responseServiceImpl.successResult(SuccessCode.SIGN_SUCCESS,
                jwtUtil.issueJwtTokenBody(newMember.getEmail()));
    }

    @Operation(summary = "withdrawal api", description = "회원 탈퇴 api -- 이메일과 JWT 토큰 모두 보내줘야 함")
    @PostMapping(value = "/withdrawal")
    public ResponseEntity<?> withdrawal(
            @Parameter(description = "이메일", required = true)
            @RequestBody String email,
            @Parameter(description = "access 토큰", required = true)
            @RequestHeader(value = "X-AUTH_TOKEN") String accessToken,
            @Parameter(description = "refresh 토큰", required = true)
            @RequestHeader(value = "X-AUTH-REFRESH_TOKEN") String refreshTokenUuid) {

        if (accessToken.isEmpty() || refreshTokenUuid.isEmpty()) {
            throw new InvalidValueException(ErrorCode.HEADER_MISSING_ERROR.getMessage(),
                    ErrorCode.HEADER_MISSING_ERROR);
        }

        Member member = (Member) memberService.loadUserByUsername(email);

        memberService.deleteMemberByEmail(member);

//      회원 탈퇴 관련 로직이 더 추가될 수 있음

        valueOperations.set(accessToken, accessToken, jwtUtil.getAUTH_TIME(),
                TimeUnit.MILLISECONDS);
        redisTemplate.delete(refreshTokenUuid);

        return responseServiceImpl.successResult(SuccessCode.WITHDRAWAL_SUCCESS);
    }
}