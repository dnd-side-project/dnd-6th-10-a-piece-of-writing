package com.springboot.domain.auth;

import com.springboot.domain.auth.jwt.JwtUtil;
import com.springboot.domain.common.error.exception.ErrorCode;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final JwtUtil jwtUtil;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        String token = request.getHeader("X-AUTH_TOKEN");

        String message;
        if (token == null) {
            message = ErrorCode.JWT_NOT_FOUND.getMessage();
        } else {
            message = jwtUtil.setInvalidAuthenticationMessage(token);
        }

        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().println("{ \"message\" : \"" + message
                + "\", \"code\" : \"" +  ErrorCode.AUTHENTICATION_FAILED.getCode()
                + "\", \"status\" : " + ErrorCode.AUTHENTICATION_FAILED.getStatus()
                + ", \"errors\" : [ ] }");
    }
}
