package com.springboot.domain.common.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum SuccessCode {
//    Auth
    LOGIN_SUCCESS("로그인 성공", "SA001", 200),
    LOGOUT_SUCCESS("로그아웃 성공", "SA002", 200),
    REISSUE_SUCCESS("access 토큰 재발급 성공", "SA003", 200),
    EMAIL_DUPLICATION_CHECK_SUCCESS("이메일이 사용 가능합니다", "SA004", 200),
    SIGN_SUCCESS("회원가입 성공", "SA005", 200),
    WITHDRAWAL_SUCCESS("회원탈퇴 성공", "SA006", 200),

//    Member
    NICKNAME_DUPLICATION_CHECK_SUCCESS("닉네임이 사용 가능합니다", "SM001", 200),
    MOD_NICKNAME_SUCCESS("닉네임 설정 성공", "SM002", 200),

//    Posts
    EXTRACT_SUCCESS("텍스트 추출 성공", "PM001", 200),
    SAVE_POSTS_SUCCESS("게시물 저장 성공","PM002",200),
    DELETE_POSTS_SUCCESS("게시물 삭제 성공","PM003",200),
    SELECT_ALL_POSTS_SUCCESS("모든 게시물 조회","PM004",200),
    SELECT_POSTS_SEARCH_SUCCESS("검색된 게시물 조회","PM005",200)
    ;

    private final String message;
    private final String code;
    private final int status;
}
