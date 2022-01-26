package com.springboot.domain.common.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum SuccessCode {
//    Auth
    LOGIN_SUCCESS("login success", 200),

    ;

    private final String message;
    private final int status;
}
