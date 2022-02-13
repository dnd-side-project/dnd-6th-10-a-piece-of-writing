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
    LOGIN_SUCCESS("login success", "SA001", 200),
    LOGOUT_SUCCESS("logout success", "SA002", 200),
    REISSUE_SUCCESS("reissue access token success", "SA003", 200),
    EMAIL_DUPLICATION_CHECK_SUCCESS("email is available", "SA004", 200),
    SIGN_SUCCESS("sign-in success", "SA005", 200),
    WITHDRAWAL_SUCCESS("withdrawal success", "SA006", 200),

//    Member
    MOD_NICKNAME_SUCCESS("modify nickname success", "SM001", 200),

//    Posts
    EXTRACT_SUCCESS("Extract words success", "PM001", 200),
    SAVE_POSTS_SUCCESS("Save Posts success","PM002",200),
    DELETE_POSTS_SUCCESS("Delete Posts success","PM003",200),
    SELECT_ALL_POSTS_SUCCESS("Select All Posts success","PM004",200)
    ;

    private final String message;
    private final String code;
    private final int status;
}
