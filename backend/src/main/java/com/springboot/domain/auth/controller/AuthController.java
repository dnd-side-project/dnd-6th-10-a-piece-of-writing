package com.springboot.domain.auth.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.springboot.domain.auth.jwt.JwtUtil;
import com.springboot.domain.auth.model.SignDto;
import com.springboot.domain.common.error.ErrorResponse;
import com.springboot.domain.common.error.exception.BusinessException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.common.error.exception.InvalidValueException;
import com.springboot.domain.member.model.MemberDto;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.ResponseServiceImpl;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.member.model.Member;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
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

    @PostMapping(value = "/login")
    public ResponseEntity<ResponseDto> login(@Valid @RequestBody MemberDto memberDto) {
        Member member = (Member) memberService.loadUserByUsername(memberDto.getEmail());

        if (!passwordEncoder.matches(memberDto.getPassword(), member.getPassword())) {
            throw new InvalidValueException(ErrorCode.LOGIN_INPUT_INVALID.getMessage(),
                    ErrorCode.LOGIN_INPUT_INVALID);
        }

        String accessToken = jwtUtil.createAuthToken(memberDto.getEmail());
        String refreshToken = jwtUtil.createRefreshToken(memberDto.getEmail());
        String refreshTokenUuid = UUID.randomUUID().toString();

        valueOperations.set(refreshTokenUuid, refreshToken, jwtUtil.getREFRESH_TIME(),
                TimeUnit.MILLISECONDS);

        Map<String, String> body = new HashMap<>();
        body.put("access-token", accessToken);
        body.put("refresh-token-uuid", refreshTokenUuid);

        return responseServiceImpl.successResult(SuccessCode.LOGIN_SUCCESS, body);
    }

    @GetMapping(value = "/logout")
    public ResponseEntity<ResponseDto> logout(
            @RequestHeader(value = "X-AUTH_TOKEN") String accessToken,
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

    @GetMapping(value = "/reissue")
    public ResponseEntity<?> reissue(
            @RequestHeader(value = "X-AUTH-REFRESH_TOKEN") String refreshTokenUuid) {

        if (refreshTokenUuid.isEmpty()) {
            throw new InvalidValueException(ErrorCode.HEADER_MISSING_ERROR.getMessage(),
                    ErrorCode.HEADER_MISSING_ERROR);
        }

        String refreshToken = valueOperations.get(refreshTokenUuid);

        if (refreshToken != null) {
            DecodedJWT verifiedToken = JWT.require(jwtUtil.getALGORITHM()).build()
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

    @PostMapping(value = "sign")
    public ResponseEntity<?> sign(@Valid @RequestBody SignDto signDto) {
        Optional<Member> member = memberService.findMemberByEmail(signDto.getEmail());

        if (member.isPresent()) {
            throw new BusinessException(ErrorCode.EMAIL_DUPLICATION);
        }

        String password = passwordEncoder.encode(signDto.getPassword());
        Member newMember = Member.builder().email(signDto.getEmail()).password(password).build();

        memberService.save(newMember);

        return responseServiceImpl.successResult(SuccessCode.SIGN_SUCCESS);
    }
}