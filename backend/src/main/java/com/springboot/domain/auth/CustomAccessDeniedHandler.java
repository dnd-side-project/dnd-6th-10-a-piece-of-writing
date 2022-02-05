package com.springboot.domain.auth;

import com.springboot.domain.common.error.exception.ErrorCode;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.getWriter().println("{ \"message\" : \"" + ErrorCode.HANDLE_ACCESS_DENIED.getMessage()
                + "\", \"code\" : \"" +  ErrorCode.HANDLE_ACCESS_DENIED.getCode()
                + "\", \"status\" : " + ErrorCode.HANDLE_ACCESS_DENIED.getStatus()
                + ", \"errors\" : [ ] }");
    }
}
