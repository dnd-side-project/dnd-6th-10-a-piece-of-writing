package com.springboot.domain.common.error.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "C001", " Invalid Input Value"),
    METHOD_NOT_ALLOWED(405, "C002", " Invalid Input Value"),
    ENTITY_NOT_FOUND(400, "C003", " Entity Not Found"),
    INTERNAL_SERVER_ERROR(500, "C004", "Server Error"),
    INVALID_TYPE_VALUE(400, "C005", " Invalid Type Value"),
    HANDLE_ACCESS_DENIED(403, "C006", "Access is Denied"),
    HEADER_MISSING_ERROR(400, "C007", "Header is missing"),

    // JWT
    EXPIRED_ACCESS_TOKEN(403, "J001", "Expired access token"),
    EXPIRED_REFRESH_TOKEN(403, "J001", "Expired refresh token"),
    UNSUPPORTED_JWT(403, "J002", "Unsupported Jwt"),
    SIGNATURE_INVALID_JWT(403, "JOO3", "Signature Invalid Jwt"),
    JWT_NOT_FOUND(403, "J004", "Jwt Not Found"),
    AUTHENTICATION_FAILED(403, "J005", "Authentication Failed"),
    INVALID_ACCESS_TOKEN(400, "J006", "Tokens have already been logged out"),

    // Auth
    LOGIN_INPUT_INVALID(400, "A001", "Login input is invalid"),

    // Member
    EMAIL_DUPLICATION(400, "M001", "Email is Duplication"),

    ;
    private final String code;
    private final String message;
    private final int status;

    ErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return this.message;
    }

    public String getCode() {
        return this.code;
    }

    public int getStatus() {
        return this.status;
    }

}