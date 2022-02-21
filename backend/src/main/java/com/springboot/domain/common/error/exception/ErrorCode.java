package com.springboot.domain.common.error.exception;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(400, "C001", "입력 값 오류입니다"),
    METHOD_NOT_ALLOWED(405, "C002", "허용되지 않는 메소드입니다"),
    ENTITY_NOT_FOUND(400, "C003", "객체를 찾을 수 없습니다"),
    INTERNAL_SERVER_ERROR(500, "C004", "서버 에러 : 백엔드에 문의"),
    INVALID_TYPE_VALUE(400, "C005", "입력 값 타입 오류입니다"),
    HANDLE_ACCESS_DENIED(403, "C006", "접근이 허용되지 않습니다"),
    HEADER_MISSING_ERROR(400, "C007", "헤더가 누락되었습니다"),
    PARAMETER_MISSING_ERROR(400, "C008", "파라미터 값이 누락되었습니다"),

    // JWT
    EXPIRED_ACCESS_TOKEN(403, "J001", "만료된 access token"),
    EXPIRED_REFRESH_TOKEN(403, "J001", "만료된 refresh token"),
    UNSUPPORTED_JWT(403, "J002", "지원하지 않는 JWT token"),
    SIGNATURE_INVALID_JWT(403, "J003", "유효하지 않은 token Signature"),
    JWT_NOT_FOUND(403, "J004", "token을 찾을 수 없습니다"),
    AUTHENTICATION_FAILED(403, "J005", "인증 실패"),
    INVALID_ACCESS_TOKEN(400, "J006", "로그아웃된 토큰입니다"),

    // Auth
    LOGIN_INPUT_INVALID(400, "A001", "유효하지 않은 로그인 입력입니다"),
    PASSWORD_INPUT_INVALID(400, "A002", "유효하지 않은 비밀번호입니다"),

    // Member
    EMAIL_DUPLICATION(400, "M001", "이미 사용되는 이메일입니다"),
    NICKNAME_MISSING(400, "M002", "닉네임이 입력되지 않았습니다"),
    NICKNAME_DUPLICATION(400, "M003", "이미 사용되는 닉네임입니다"),

    // Posts
    IMAGE_URL_INPUT_INVALID(400, "P001", "이미지 url이 유효하지 않습니다"),
    IMAGE_INPUT_INVALID(400, "P002", "이미지 파일 에러"),
    CREDENTIAL_ERROR(500, "P003", "이미지 서버 인증 에러"),
    VISION_API_ERROR(500, "P004", "Vision api 에러 : 백엔드에 문의"),

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