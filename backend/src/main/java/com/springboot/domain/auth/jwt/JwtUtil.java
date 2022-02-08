package com.springboot.domain.auth.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.AlgorithmMismatchException;
import com.auth0.jwt.exceptions.InvalidClaimException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.springboot.domain.common.error.exception.ErrorCode;
import com.springboot.domain.member.model.Member;
import com.springboot.domain.member.service.MemberService;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import javax.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Getter
@RequiredArgsConstructor
@Component
public class JwtUtil {

    @Value("${secret.key}")
    private String secretKey;
    private final long AUTH_TIME = 1000 * 60 * 30; // 30min
    private final long REFRESH_TIME = 1000 * 60 * 60 * 24 * 7; // 7days

    private final MemberService memberService;
    private final ValueOperations<String, String> valueOperations;

    public Algorithm getAlgorithm() {
        return Algorithm.HMAC512(this.secretKey);
    }

    public String createAuthToken(String email) {
        Date now = new Date();
        return JWT.create()
                .withIssuedAt(now)
                .withSubject(email)
                .withClaim("iss", "DND-team10")
                .withClaim("token-type", "access-token")
                .withExpiresAt(new Date(now.getTime() + AUTH_TIME))
                .sign(this.getAlgorithm());
    }

    public String createRefreshToken(String email) {
        Date now = new Date();
        return JWT.create()
                .withIssuedAt(now)
                .withSubject(email)
                .withClaim("iss", "DND-team10")
                .withClaim("token-type", "refresh-token")
                .withExpiresAt(new Date(now.getTime() + REFRESH_TIME))
                .sign(this.getAlgorithm());
    }

    public Authentication getAuthentication(String token) {
        String email = JWT.require(this.getAlgorithm()).build().verify(token).getSubject();
        UserDetails userDetails = memberService.loadUserByUsername(email);
        return new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails.getAuthorities());
    }

    public String resolveAccessToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH_TOKEN");
    }

    public boolean validateToken(String token) {
        try {
            DecodedJWT verifiedToken = JWT.require(this.getAlgorithm()).build().verify(token);
            return !verifiedToken.getExpiresAt().before(new Date());
        } catch (Exception ex) {
            return false;
        }
    }

    public Map<String, String> issueJwtTokenBody(String email) {
        String accessToken = this.createAuthToken(email);
        String refreshToken = this.createRefreshToken(email);
        String refreshTokenUuid = UUID.randomUUID().toString();

        valueOperations.set(refreshTokenUuid, refreshToken, this.getREFRESH_TIME(),
                TimeUnit.MILLISECONDS);

        Map<String, String> body = new HashMap<>();
        body.put("access-token", accessToken);
        body.put("refresh-token-uuid", refreshTokenUuid);

        return body;
    }

    public String setInvalidAuthenticationMessage(String token) {
        try {
            JWT.require(this.getAlgorithm()).build().verify(token);
            if (valueOperations.get(token) != null) {
                return ErrorCode.EXPIRED_ACCESS_TOKEN.getMessage();
            }
            return "Unknown error : Should Tell to Backend";
        } catch (AlgorithmMismatchException | InvalidClaimException e) {
            return ErrorCode.UNSUPPORTED_JWT.getMessage();
        } catch (TokenExpiredException e) {
            return ErrorCode.EXPIRED_ACCESS_TOKEN.getMessage();
        } catch (SignatureVerificationException e) {
            return ErrorCode.SIGNATURE_INVALID_JWT.getMessage();
        } catch (IllegalArgumentException e) {
            return ErrorCode.JWT_NOT_FOUND.getMessage();
        }
    }
}