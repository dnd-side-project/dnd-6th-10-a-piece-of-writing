package com.springboot.domain.auth.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;

public class JwtUtil {

    private static final String secretKey = "key-DND-team10";
    private static final Algorithm ALGORITHM = Algorithm.HMAC512(secretKey);
    private static final long AUTH_TIME = 1000 * 60 * 30; // 30min
    private static final long REFRESH_TIME = 1000 * 60 * 60 * 24 * 7; // 7days

    public static String createAuthToken(String email) {
        Date now = new Date();
        return JWT.create()
                .withIssuedAt(now)
                .withSubject(email)
                .withClaim("iss", "DND-team10")
                .withClaim("token-type", "access-token")
                .withExpiresAt(new Date(now.getTime() + AUTH_TIME))
                .sign(ALGORITHM);
    }

    public static String createRefreshToken(String email) {
        Date now = new Date();
        return JWT.create()
                .withIssuedAt(now)
                .withSubject(email)
                .withClaim("iss", "DND-team10")
                .withClaim("token-type", "refresh-token")
                .withExpiresAt(new Date(now.getTime() + REFRESH_TIME))
                .sign(ALGORITHM);
    }

    public static String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH_TOKEN");
    }

    public static TokenResult verifyToken(String token) {
        try {
            DecodedJWT verifiedToken = JWT.require(ALGORITHM).build().verify(token);
            return TokenResult.builder()
                    .iss(verifiedToken.getIssuer())
                    .name(verifiedToken.getSubject())
                    .type(verifiedToken.getClaim("token-type").asString())
                    .success(true)
                    .build();
        } catch(Exception ex) {
            DecodedJWT unverifiedToken = JWT.decode(token);
            return TokenResult.builder()
                    .iss(unverifiedToken.getIssuer())
                    .name(unverifiedToken.getSubject())
                    .type(unverifiedToken.getClaim("token-type").asString())
                    .success(false)
                    .build();
        }
    }
}