package com.springboot.domain.auth.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.springboot.domain.member.service.MemberService;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class JwtUtil {

    private final String secretKey = "key-DND-team10";
    private final Algorithm ALGORITHM = Algorithm.HMAC512(secretKey);
    private final long AUTH_TIME = 1000 * 60 * 30; // 30min
    private final long REFRESH_TIME = 1000 * 60 * 60 * 24 * 7; // 7days

    private final MemberService memberService;

    public String createAuthToken(String email) {
        Date now = new Date();
        return JWT.create()
                .withIssuedAt(now)
                .withSubject(email)
                .withClaim("iss", "DND-team10")
                .withClaim("token-type", "access-token")
                .withExpiresAt(new Date(now.getTime() + AUTH_TIME))
                .sign(ALGORITHM);
    }

    public String createRefreshToken(String email) {
        Date now = new Date();
        return JWT.create()
                .withIssuedAt(now)
                .withSubject(email)
                .withClaim("iss", "DND-team10")
                .withClaim("token-type", "refresh-token")
                .withExpiresAt(new Date(now.getTime() + REFRESH_TIME))
                .sign(ALGORITHM);
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = memberService.loadUserByUsername(
                JWT.require(ALGORITHM).build().verify(token).getSubject());
        return new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails.getAuthorities());
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH_TOKEN");
    }

    public boolean validateToken(String token) {
        try {
            DecodedJWT verifiedToken = JWT.require(ALGORITHM).build().verify(token);
            return !verifiedToken.getExpiresAt().before(new Date());
        } catch (Exception ex) {
            return false;
        }
    }
}