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
    MOD_PROFILE_SUCCESS("프로필 변경 성공", "SM003", 200),
    GET_PROFILE_SUCCESS("멤버 프로필 조회 성공", "SM004", 200),
    GET_FOLLOW_LIST_SUCCESS("팔로우 리스트 조회 성공", "SM005", 200),
    GET_FOLLOWER_LIST_SUCCESS("팔로워 리스트 조회 성공", "SM006", 200),

    //  Posts
    EXTRACT_SUCCESS("텍스트 추출 성공", "PM001", 200),
    SAVE_POSTS_SUCCESS("게시물 저장 성공", "PM002", 200),
    DELETE_POSTS_SUCCESS("게시물 삭제 성공", "PM003", 200),
    SELECT_ALL_POSTS_SUCCESS("모든 게시물 조회", "PM004", 200),
    SELECT_POSTS_SEARCH_SUCCESS("검색된 게시물 조회", "PM005", 200),
    SELECT_POSTS_SUCCESS("게시물 조회", "PM006", 200),

    //  Reply
    SAVE_REPLY_SUCCESS("댓글 생성 성공","RM001",200),
    DELETE_REPLY_SUCCESS("댓글 삭제 성공","RM002",200),
    MODIFY_REPLY_SUCCESS("댓글 수정 성공","RM003",200),
    SELECT_REPLY_SUCCESS("댓글 모두 조회 성공","RM004",200),
    SELECT_FIRST_REPLY_SUCCESS("댓글 초기 3개 조회 성공","PM005",200),

    //    Relation
    FOLLOW_SUCCESS("팔로우 성공", "SR005", 200),
    ;

    private final String message;
    private final String code;
    private final int status;
}
