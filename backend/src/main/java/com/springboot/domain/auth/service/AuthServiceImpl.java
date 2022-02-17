package com.springboot.domain.auth.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.springboot.domain.auth.jwt.JwtUtil;
import com.springboot.domain.auth.model.LoginDto;
import com.springboot.domain.auth.model.SignDto;
import com.springboot.domain.common.error.ErrorResponse;
import com.springboot.domain.common.error.exception.BusinessException;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.common.error.exception.InvalidValueException;
import com.springboot.domain.common.model.ResponseDto;
import com.springboot.domain.common.model.SuccessCode;
import com.springboot.domain.common.service.ResponseService;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.service.MemberService;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final ResponseService responseService;
    private final MemberService memberService;
    private final RedisTemplate<String, String> redisTemplate;
    private final ValueOperations<String, String> valueOperations;

    private void checkInputHeader(String accessToken, String refreshTokenUuid) {
        if (accessToken == null || refreshTokenUuid == null) {
            throw new BusinessException(ErrorCode.HEADER_MISSING_ERROR);
        }
    }

    @Override
    public ResponseEntity<? extends ResponseDto> login(LoginDto loginDto) {
        Member member = memberService.findMemberByEmail(loginDto.getEmail());

        if (!passwordEncoder.matches(loginDto.getPassword(), member.getPassword())) {
            throw new InvalidValueException(ErrorCode.PASSWORD_INPUT_INVALID.getMessage(),
                    ErrorCode.PASSWORD_INPUT_INVALID);
        }

        return responseService.successResult(SuccessCode.LOGIN_SUCCESS,
                jwtUtil.issueJwtTokenBody(member.getEmail()));
    }

    @Override
    public ResponseEntity<? extends ResponseDto> logout(String accessToken,
            String refreshTokenUuid) {
        checkInputHeader(accessToken, refreshTokenUuid);

        valueOperations.set(accessToken, accessToken, jwtUtil.getAUTH_TIME(),
                TimeUnit.MILLISECONDS);
        redisTemplate.delete(refreshTokenUuid);

        return responseService.successResult(SuccessCode.LOGOUT_SUCCESS);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> sign(SignDto signDto) {
        String password = passwordEncoder.encode(signDto.getPassword());
        Member newMember = Member.builder().email(signDto.getEmail()).password(password)
                .build();

        memberService.save(newMember);

        return responseService.successResult(SuccessCode.SIGN_SUCCESS,
                jwtUtil.issueJwtTokenBody(newMember.getEmail()));
    }

    @Override
    public ResponseEntity<? extends ResponseDto> withdrawal(String email, String accessToken,
            String refreshTokenUuid) {
        checkInputHeader(accessToken, refreshTokenUuid);

        Member member = memberService.findMemberByEmail(email);
        memberService.deleteMemberByEmail(member);

//      회원 탈퇴 관련 로직이 더 추가될 수 있음

        valueOperations.set(accessToken, accessToken, jwtUtil.getAUTH_TIME(),
                TimeUnit.MILLISECONDS);
        redisTemplate.delete(refreshTokenUuid);

        return responseService.successResult(SuccessCode.WITHDRAWAL_SUCCESS);
    }

    @Override
    public ResponseEntity<? extends ResponseDto> reissue(String refreshTokenUuid) {

        checkInputHeader("null", refreshTokenUuid);

        String refreshToken = valueOperations.get(refreshTokenUuid);
        if (refreshToken != null) {
            DecodedJWT verifiedToken = JWT.require(jwtUtil.getAlgorithm()).build()
                    .verify(refreshToken);
            String accessToken = jwtUtil.createAuthToken(verifiedToken.getSubject());

            Map<String, String> body = new HashMap<>();
            body.put("access-token", accessToken);

            return responseService.successResult(SuccessCode.REISSUE_SUCCESS, body);
        }

        redisTemplate.delete(refreshTokenUuid);
        throw new BusinessException(ErrorCode.EXPIRED_REFRESH_TOKEN);
    }
}
